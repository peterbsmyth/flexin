import { Component, OnInit } from '@angular/core';
import { V2ProgramsFacade } from '@bod/training/domain';

@Component({
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
export class ProgramCreatePage implements OnInit {
  constructor(private programsState: V2ProgramsFacade) {}

  ngOnInit(): void {
    // this.programsState.dispatch(
    //   ProgramsActions.loadProgramsFromCreateFeatureCreatePage()
    // );
  }
}
