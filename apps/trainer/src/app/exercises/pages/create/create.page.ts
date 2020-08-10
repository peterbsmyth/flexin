import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromExercises from '../../+state/exercises.reducer';
import { saveExercise } from '../../+state/exercises.actions';

@Component({
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss']
})
export class CreatePage implements OnInit {

  constructor(
    private store$: Store<fromExercises.State & fromExercises.ExercisesPartialState>
  ) { }

  ngOnInit(): void {
  }

  onSave(exercise) {
    this.store$.dispatch(saveExercise({ exercise }));
  }
}
