import { Component, OnInit } from '@angular/core';
import { ProgramsFacade, ProgramsPageActions } from '@bod/coaching/domain';


@Component({
  template: `
    <router-outlet></router-outlet>
  `,
  styles: [
  ]
})
export class CreatePage implements OnInit {

  constructor(
    private programsState: ProgramsFacade
  ) { }

  ngOnInit(): void {
    this.programsState.dispatch(ProgramsPageActions.loadPrograms());
  }

}
