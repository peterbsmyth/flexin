import { Injectable } from '@angular/core';
import { BehaviorSubject, forkJoin, Observable, of } from 'rxjs';
import { catchError, switchMap, tap, filter } from 'rxjs/operators';
import { ProgramDataService } from '../infrastructure/program.data.service';
import { WeekDataService } from '../infrastructure/week.data.service';
import { SessionDataService } from '../infrastructure/session.data.service';
import { SessionItemDataService } from '../infrastructure/session-item.data.service';
import { BoardCardData, SessionItemData } from '../entities/component.models';
import { DraftProgram } from '../entities/draft.models';
import { uniqBy } from 'lodash-es';
import { StorageMap } from '@ngx-pwa/local-storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Exercise } from '@bod/shared/models';

@Injectable()
export class DraftProgramsDataService {
  private _draftProgramBoardSubject = new BehaviorSubject<BoardCardData[][]>([
    [],
    [],
    [],
    [],
  ]);
  public draftProgramBoard$ = this._draftProgramBoardSubject.asObservable();
  private _draftProgramSubject = new BehaviorSubject<DraftProgram>({
    name: '',
  });
  public draftProgram$ = this._draftProgramSubject.asObservable();
  private _sessionConfigurationSubject = new BehaviorSubject<SessionItemData[]>(
    []
  );
  public draftSessionConfiguration$ = this._sessionConfigurationSubject.asObservable();
  private _lastSessionItemLocalId = 1000;
  private _lastSessionId = 0;
  private _createDictionary = (acc, val) => {
    return {
      ...acc,
      [val.id]: val,
    };
  };
  public popDraftDay() {
    const board = [...this._draftProgramBoardSubject.getValue()].slice(0, -1);
    this.storage.set('boardCardData', board).subscribe();
  }
  public pushDraftDay() {
    const board = [...this._draftProgramBoardSubject.getValue(), []];
    this.storage.set('boardCardData', board).subscribe();
  }
  public resetDraft() {
    const board = [[], [], [], []];
    this.storage.set('boardCardData', board).subscribe();
  }

  addIncompleteSessionItems(
    board: BoardCardData[][],
    exercises: Exercise[],
    weekCount: number
  ): void {
    this.storage.set('boardCardData', board).subscribe();
    const draft: any = {};
    const weeks = [...Array(weekCount)].map((week, i) => ({
      id: i + 1,
      number: i + 1,
    }));
    const sessions = [];
    const sessionItems = [];
    const relevantExercises = [];
    weeks.forEach((week) => {
      board.forEach((column, i) => {
        const session = {
          id: ++this._lastSessionId,
          order: i + 1,
          name: `day ${i + 1}`,
          weekId: week.id,
        };
        sessions.push(session);

        column.forEach((card, j) => {
          const sessionItem = {
            reps: null,
            AMRAP: false,
            sets: null,
            weight: null,
            weightUnit: null,
            intensity: null,
            tempo: null,
            id: ++this._lastSessionItemLocalId,
            exerciseId: card.id,
            sessionId: session.id,
            order: j + 1,
          };

          sessionItems.push(sessionItem);
          relevantExercises.push({
            ...exercises.find((e) => e.id === card.id),
            sessionItemId: sessionItem.id,
          });
        });
      });
    });

    draft.exercises = relevantExercises.reduce(this._createDictionary, {});
    draft.sessions = sessions.reduce(this._createDictionary, {});
    draft.sessionItems = sessionItems.reduce(this._createDictionary, {});
    draft.weeks = weeks.reduce(this._createDictionary, {});
    const sessionItemData: SessionItemData[] = uniqBy(
      relevantExercises,
      'id'
    ).map((exercise) => ({
      sessionItem: draft.sessionItems[exercise.sessionItemId],
      exercise,
    }));
    this.storage.set('sessionItemData', sessionItemData).subscribe();
    this.storage.set('draftProgram', draft).subscribe();
  }

  createProgram(data: SessionItemData[], name: string): Observable<any> {
    const oldDraft = this._draftProgramSubject.getValue();
    /**
     * Get the ids from the draft session items dictionary
     */
    const newSessionItems = Object.keys(oldDraft.sessionItems)
      /**
       * map the keys to the session items to create an array of all session items
       */
      .map((id) => oldDraft.sessionItems[id])
      /**
       * for all of the session tiems, find in the data the updates to the session item by matching
       * the exerciseId. Update the old session item with the new data and use the old session item id
       */
      .map((oldSessionItem) => ({
        ...data.find(
          ({ sessionItem }) =>
            sessionItem.exerciseId === oldSessionItem.exerciseId
        ).sessionItem,
        id: oldSessionItem.id,
        sessionId: oldSessionItem.sessionId,
        order: oldSessionItem.order,
      }))
      /**
       * reduce the array to a dictionary again
       */
      .reduce(this._createDictionary, {});

    const draft = {
      ...oldDraft,
      sessionItems: newSessionItems,
    };

    const draftWeeks = Object.keys(draft.weeks).map((id) => draft.weeks[id]);
    const draftSessions = Object.keys(draft.sessions).map(
      (id) => draft.sessions[id]
    );
    const draftSessionItems = Object.keys(draft.sessionItems).map(
      (id) => draft.sessionItems[id]
    );

    return this.programService.saveOne({ name }).pipe(
      switchMap((program) => {
        /**
         * post the weeks without the temporary id and replacing
         * the tempoary programId with the real programId
         */
        return forkJoin(
          draftWeeks.map((week) =>
            this.weekService.saveOne({
              id: undefined,
              number: week.number,
              programId: program.id,
              weekStatisticId: undefined,
            })
          )
        );
      }),
      switchMap((weeks) => {
        /**
         * create an array of weeks that keeps a reference to the
         * temporary id
         */
        const newWeeks = draftWeeks.map((draftWeek) => ({
          ...weeks.find((week) => week.number === draftWeek.number),
          temporaryId: draftWeek.id,
        }));

        /**
         * update the draft sessions with the current weekId
         */
        const tempSessions = draftSessions.map((session) => ({
          ...session,
          weekId: newWeeks.find((week) => week.temporaryId === session.weekId)
            .id,
        }));

        /**
         * update the draft state
         */
        draft.sessions = tempSessions.reduce(this._createDictionary, {});

        const sessions = tempSessions.map((session) =>
          this.sessionService.saveOne({
            ...session,
            id: undefined,
          })
        );

        draft.weeks = newWeeks.reduce(this._createDictionary, {});

        return forkJoin(sessions);
      }),
      switchMap((sessions) => {
        const newSessions = Object.keys(draft.sessions)
          .map((id) => draft.sessions[id])
          .map((draftSession) => ({
            ...sessions.find(
              (session) =>
                session.weekId === draftSession.weekId &&
                session.order === draftSession.order
            ),
            temporaryId: draftSession.id,
          }));
        const sessionItems = draftSessionItems.map((sessionItem) =>
          this.sessionItemService.saveOne({
            ...sessionItem,
            id: undefined,
            sessionId: newSessions.find(
              (session) => session.temporaryId === sessionItem.sessionId
            ).id,
            weightUnit: 'lbs',
          })
        );
        return forkJoin(sessionItems);
      }),
      switchMap(() => this.storage.clear()),
      catchError(() => {
        this.snackbar.open(
          'could not create program. fix errors and try again.',
          '',
          { duration: 5000 }
        );
        return of();
      })
    );
  }

  constructor(
    private programService: ProgramDataService,
    private weekService: WeekDataService,
    private sessionService: SessionDataService,
    private sessionItemService: SessionItemDataService,
    private storage: StorageMap,
    private snackbar: MatSnackBar
  ) {
    this.storage
      .watch('sessionItemData')
      .pipe(
        tap((data: SessionItemData[]) => {
          this._sessionConfigurationSubject.next(data);
        })
      )
      .subscribe();

    this.storage
      .watch('draftProgram')
      .pipe(
        tap((data: DraftProgram) => {
          this._draftProgramSubject.next(data);
        })
      )
      .subscribe();

    this.storage
      .watch('boardCardData')
      .pipe(
        filter((board) => !!board),
        tap((board: BoardCardData[][]) => {
          this._draftProgramBoardSubject.next(board);
        })
      )
      .subscribe();
  }
}
