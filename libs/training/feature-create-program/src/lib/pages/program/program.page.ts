import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ExercisesFacade,
  ProgramBoardData,
  ProgramsFacade,
  ProgramsActions,
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
  program$: Observable<any>;
  loaded$: Observable<boolean>;
  data$: Observable<ProgramBoardData>;

  constructor(
    private programsState: ProgramsFacade,
    private exerciseState: ExercisesFacade,
    private route: ActivatedRoute
  ) {
    this.program$ = this.programsState.selectedProgramsWithDescendants$;
    this.loaded$ = this.programsState.loaded$;
    this.data$ = combineLatest([
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
        return {
          sessions,
          sessionItems,
          exercises,
        };
      })
    );
  }

  onSelectWeek(index) {
    this._selectedWeekSubject.next(index);
  }

  onUpdate(lists) {}

  ngOnInit(): void {
    this.programsState.dispatch(
      ProgramsActions.loadDescendantsFromCreateFeatureProgramPage({
        id: this.route.snapshot.params['programId'],
      })
    );
  }
}
