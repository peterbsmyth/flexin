import { Component, OnInit } from '@angular/core';
import { ProgramService } from '@bod/services';
import { Program } from '@bod/models';
import { Subject, Observable } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { Store, select } from '@ngrx/store';
import { ProgramsActions, ProgramsFeature, ProgramsSelectors } from '@bod/state';

@Component({
  selector: 'bod-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss']
})
export class ProgramsPage implements OnInit {
  unsubscribe$: Subject<any> = new Subject();
  programs$: Observable<Program[]>;
  constructor(
    private store: Store<ProgramsFeature.ProgramsPartialState>,
  ) {
    this.store.dispatch(ProgramsActions.loadPrograms());
  }

  ngOnInit(): void {
    this.programs$ = this.store
      .pipe(
        takeUntil(this.unsubscribe$),
        select(ProgramsSelectors.getAllPrograms)
      );
  }

}
