import { Component, OnInit } from '@angular/core';
import {
  SessionItemFormData,
  SessionItemsFacade,
  SessionItemsActions,
  ExercisesActions,
  ExercisesFacade,
} from '@bod/coaching/domain';
import { SessionItem } from '@bod/shared/models';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  templateUrl: './session-item.page.html',
  styleUrls: ['./session-item.page.scss'],
})
export class SessionItemPage implements OnInit {
  data$: Observable<SessionItemFormData>;
  sessionItem$: Observable<SessionItem>;

  constructor(
    private sessionItemsState: SessionItemsFacade,
    private exerciseState: ExercisesFacade
  ) {
    this.data$ = combineLatest([
      this.sessionItemsState.selectedSessionItemsWithExercise$,
      this.exerciseState.allExercises$,
    ]).pipe(
      map(([sessionItem, exercises]) => ({
        sessionItem,
        exercises: exercises.sort((a, b) => a.name.localeCompare(b.name)),
      }))
    );
  }

  onSave(sessionItem: SessionItem) {
    this.sessionItemsState.dispatch(
      SessionItemsActions.updateSessionItemFromCreateProgramSessionItemPage({
        sessionItem,
      })
    );
  }

  ngOnInit() {
    this.exerciseState.dispatch(
      ExercisesActions.loadExercisesFromSessionItemPage()
    );
  }
}
