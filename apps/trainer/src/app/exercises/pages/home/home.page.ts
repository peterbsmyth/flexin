import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromExercises from '../../+state/exercises.reducer';
import { loadExercises } from '../../+state/exercises.actions';
import { Subject, Observable } from 'rxjs';
import { Exercise } from '@bod/shared/models';
import { getAllExercises, getExercisesLoaded } from '../../+state/exercises.selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  exercises$: Observable<Exercise[]>;
  loaded$: Observable<boolean>;
  constructor(
    private store$: Store<fromExercises.State & fromExercises.ExercisesPartialState>,
  ) {
    this.store$.dispatch(loadExercises());
    this.exercises$ = this.store$
      .pipe(
        takeUntil(this.unsubscribe$),
        select(getAllExercises)
      );
    this.loaded$ = this.store$.pipe(
      takeUntil(this.unsubscribe$),
      select(getExercisesLoaded)
    );
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
