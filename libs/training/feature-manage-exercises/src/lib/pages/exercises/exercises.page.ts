import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ExerciseV2 } from '@bod/shared/models';
import { loadV2Exercises, V2ExercisesFacade } from '@bod/training/domain';

@Component({
  templateUrl: './exercises.page.html',
  styleUrls: ['./exercises.page.scss'],
})
export class ExercisesPage implements OnInit {
  exercises$: Observable<ExerciseV2[]>;
  loaded$: Observable<boolean>;
  constructor(public exercisesState: V2ExercisesFacade) {}

  ngOnInit(): void {
    this.exercisesState.dispatch(loadV2Exercises());
  }
}
