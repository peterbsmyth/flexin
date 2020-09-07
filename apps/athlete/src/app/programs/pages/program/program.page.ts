import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ProgramService } from '@bod/data';
import { Program } from '@bod/shared/domain';
import { takeUntil, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { selectProgram } from '../../+state/programs.actions';
import { getSelected } from '../../+state/programs.selectors';
import { ProgramsPartialState } from '../../+state/programs.reducer';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'bod-program',
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss'],
})
export class ProgramPage implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  program$: Observable<Program>;

  constructor(
    private store: Store<ProgramsPartialState>,
    private route: ActivatedRoute
  ) {
    this.program$ = this.store
      .pipe(
        takeUntil(this.unsubscribe$),
        select(getSelected)
      );
  }

  ngOnInit(): void {
    this.store.dispatch(selectProgram({ id: this.route.snapshot.params['programId'] }));
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
