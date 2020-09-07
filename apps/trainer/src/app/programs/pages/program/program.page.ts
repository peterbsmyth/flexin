import { Component, OnInit, OnDestroy } from '@angular/core';
import * as fromPrograms from '../../+state/programs.reducer';
import { Store, select } from '@ngrx/store';
import { Observable, pipe, Subject } from 'rxjs';
import { Program } from '@bod/shared/domain';
import { getSelected, getProgramsLoaded } from '../../+state/programs.selectors';
import { takeUntil } from 'rxjs/operators';
import { loadProgram } from '../../+state/programs.actions';

@Component({
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss']
})
export class ProgramPage implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  program$: Observable<Program>;
  loaded$: Observable<boolean>;

  constructor(
    private store$: Store<fromPrograms.State & fromPrograms.ProgramsPartialState>
  ) {
    this.store$.dispatch(loadProgram());
    this.program$ = this.store$
      .pipe(
        takeUntil(this.unsubscribe$),
        select(getSelected)
      );
    this.loaded$ = this.store$
      .pipe(
        takeUntil(this.unsubscribe$),
        select(getProgramsLoaded)
      )
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
