import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { fetch } from '@nrwl/angular';
import { ProgramsPageActions } from './actions';
import { ProgramDataService } from '../../infrastructure/program.data.service';
import { map, tap, switchMap } from 'rxjs/operators';
import { DraftProgramsDataService } from '../../infrastructure/draft-programs.data.service';
import { Router } from '@angular/router';
import { WeekDataService } from '../../infrastructure/week.data.service';
import { PartialState } from '../root.reducer';
import { Store } from '@ngrx/store';
import { WeeksPageActions } from '../weeks/actions';
import { SessionDataService } from '../../infrastructure/session.data.service';
import { forkJoin } from 'rxjs';
import { flatten, uniqBy } from 'lodash-es';
import { SessionItemDataService } from '../../infrastructure/session-item.data.service';
import { SessionsPageActions } from '../sessions/actions';
import { SessionItemsPageActions } from '../session-items/actions';
import { Exercise, Session, SessionItem } from '@bod/shared/models';
import { ExerciseDataService } from '../../infrastructure/exercise.data.service';
import { ExercisesApiActions } from '../exercises/actions';

@Injectable()
export class ProgramsEffects {
  loadPrograms$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramsPageActions.loadPrograms),
      fetch({
        // provides an action
        run: () => {
          return this.programService
            .getAll()
            .pipe(
              map((programs) =>
                ProgramsPageActions.loadProgramsSuccess({ programs })
              )
            );
        },
        onError: (action, error: any) => {
          // dispatch an undo action to undo the changes in the client state
          return null;
        },
      })
    )
  );

  loadProgram$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramsPageActions.loadProgram),
      fetch({
        // provides an action
        run: ({ id }) => {
          return this.programService
            .getOne(id)
            .pipe(
              map((program) =>
                ProgramsPageActions.loadProgramSuccess({ program })
              )
            );
        },
        onError: (action, error: any) => {
          // dispatch an undo action to undo the changes in the client state
          return null;
        },
      })
    )
  );

  addIncompleteSessionItems$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProgramsPageActions.addIncompleteSessionItems),
        tap(({ lists }) => {
          this.draftProgramService.addIncompleteSessionItems(lists);
        })
      ),
    { dispatch: false }
  );

  everythingExceptCreateProgram$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProgramsPageActions.everythingExceptCreateProgram),
        tap(({ data }) => {
          return this.draftProgramService.everythingExceptCreateProgram(data);
        })
      ),
    { dispatch: false }
  );

  createProgram$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(ProgramsPageActions.createProgram),
        fetch({
          // provides an action
          run: ({ name }) => {
            return this.draftProgramService
              .createProgram(name)
              .pipe(tap(() => this.router.navigateByUrl('/programs')));
          },
          onError: (action, error: any) => {
            // dispatch an undo action to undo the changes in the client state
            return null;
          },
        })
      ),
    { dispatch: false }
  );

  loadDescendants$ = createEffect(() =>
    this.actions$.pipe(
      ofType(ProgramsPageActions.loadDescendants),
      fetch({
        // provides an action
        run: ({ id }) => {
          return this.weekService.getAllByProgram(id).pipe(
            switchMap((weeks) => {
              this.store.dispatch(
                WeeksPageActions.loadWeeksByProgramSuccess({ weeks })
              );
              return forkJoin(
                weeks.map((week) => this.sessionsService.getAllByWeek(week.id))
              );
            }),
            switchMap((sessionLists) => {
              sessionLists.forEach((sessions) => {
                this.store.dispatch(
                  SessionsPageActions.loadSessionsByWeekSuccess({ sessions })
                );
              });

              const flatSessions: Session[] = flatten(sessionLists);

              return forkJoin(
                flatSessions.map((session) =>
                  this.sessionItemsService.getAllBySession(session.id)
                )
              );
            }),
            switchMap((sessionItemsLists) => {
              sessionItemsLists.forEach((sessionItems) =>
                this.store.dispatch(
                  SessionItemsPageActions.loadSessionItemsBySessionSuccess({
                    sessionItems,
                  })
                )
              );
              const flatSessionItems: SessionItem[] = flatten(
                sessionItemsLists
              );
              const uniqueExerciseIds: number[] = uniqBy(
                flatSessionItems,
                'exerciseId'
              ).map((sessionItem) => sessionItem.exerciseId);
              return forkJoin(
                uniqueExerciseIds.map((exerciseId) =>
                  this.exercisesService.getOne(exerciseId)
                )
              );
            }),
            map((exercises) => {
              exercises.forEach((exercise) =>
                this.store.dispatch(
                  ExercisesApiActions.loadExerciseSuccess({ exercise })
                )
              );
              return ProgramsPageActions.loadDescendantsSuccess();
            })
          );
        },
        onError: (action, error: any) => {
          // dispatch an undo action to undo the changes in the client state
          return null;
        },
      })
    )
  );

  constructor(
    private actions$: Actions,
    private store: Store<PartialState>,
    private programService: ProgramDataService,
    private draftProgramService: DraftProgramsDataService,
    private weekService: WeekDataService,
    private sessionsService: SessionDataService,
    private sessionItemsService: SessionItemDataService,
    private exercisesService: ExerciseDataService,
    private router: Router
  ) {}
}
