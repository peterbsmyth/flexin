import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import * as fromPrograms from '../../+state/programs.reducer';
import { loadPrograms } from '../../+state/programs.actions';
import { Subject, Observable } from 'rxjs';
import { Program } from '@bod/models';
import { getAllPrograms, getProgramsLoaded } from '../../+state/programs.selectors';
import { takeUntil } from 'rxjs/operators';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  programs$: Observable<Program[]>;
  loaded$: Observable<boolean>;
  constructor(
    private store$: Store<fromPrograms.State & fromPrograms.ProgramsPartialState>,
  ) {
    this.store$.dispatch(loadPrograms());
    this.programs$ = this.store$
      .pipe(
        takeUntil(this.unsubscribe$),
        select(getAllPrograms)
      );
    this.loaded$ = this.store$.pipe(
      takeUntil(this.unsubscribe$),
      select(getProgramsLoaded)
    );
  }

  ngOnInit(): void { }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
