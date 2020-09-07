import { Component, OnInit, OnDestroy } from '@angular/core';
import { Program } from '@bod/shared/domain';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { ProgramsPartialState } from '../../+state/programs.reducer';
import { getAllPrograms } from '../../+state/programs.selectors';

@Component({
  selector: 'bod-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss']
})
export class ProgramsPage implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  programs$: Observable<Program[]>;
  constructor(
    private store: Store<ProgramsPartialState>,
  ) {
  }

  ngOnInit(): void {
    this.programs$ = this.store
      .pipe(
        takeUntil(this.unsubscribe$),
        select(getAllPrograms)
      );
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
