import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ExercisesFacade,
  ProgramsFacade,
  ProgramsActions,
  BoardCardData,
  ProgramWithDescendants,
} from '@bod/training/domain';
import { Observable, combineLatest, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss'],
})
export class ProgramPage implements OnInit {
  private _selectedWeekSubject: BehaviorSubject<number> = new BehaviorSubject(
    0
  );
  selectedWeek$: Observable<number> = this._selectedWeekSubject.asObservable();
  program$: Observable<ProgramWithDescendants>;
  loaded$: Observable<boolean>;
  board$: Observable<BoardCardData[][]>;

  constructor(
    private programsState: ProgramsFacade,
    private exerciseState: ExercisesFacade,
    private route: ActivatedRoute
  ) {
    this.loaded$ = this.programsState.loaded$;
    this.program$ = this.programsState.selectedProgramsWithDescendants$;
    this.board$ = combineLatest([
      this.program$,
      this.exerciseState.allExercises$,
      this.selectedWeek$,
    ]).pipe(
      map(([program, exercises, weekIndex]) => {
        const week = program.weeks[weekIndex];
        const sessions = program.sessions.filter(
          (session) => session.weekId === week.id
        );
        const sessionItems = program.sessionItems.filter((sessionItem) =>
          sessions.find((session) => session.id === sessionItem.sessionId)
        );

        const allDays = sessions.map((session) => session.order);
        const sortedDays = [...new Set(allDays)].sort();

        const boardCardData = sortedDays.map((dayNumber) => {
          const currentSession = sessions.find(
            (session) => session.order === dayNumber
          );

          return sessionItems
            .filter(
              (sessionItem) => sessionItem.sessionId === currentSession.id
            )
            .map((sessionItem) => ({
              routerLink: `/coaching/session-items/${sessionItem.id}`,
              name: exercises.find(
                (exercise) => sessionItem.exerciseId === exercise.id
              )?.name,
            }));
        });
        return boardCardData;
      })
    );
  }

  onSelectWeek(index) {
    this._selectedWeekSubject.next(index);
  }

  ngOnInit(): void {
    this.programsState.dispatch(
      ProgramsActions.loadDescendantsFromCreateFeatureProgramPage({
        id: this.route.snapshot.params['programId'],
      })
    );
  }
}
