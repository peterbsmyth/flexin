import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromPrograms from '../../+state/programs.reducer';
import { loadPrograms } from '../../+state/programs.actions';

@Component({
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class CreatePage implements OnInit {

  constructor(
    private store$: Store<fromPrograms.State>
  ) { }

  ngOnInit(): void {
    this.store$.dispatch(loadPrograms());
  }

}
