import { Component, OnInit } from '@angular/core';
import { ProgramsFacade, ProgramsActions } from '@bod/training/domain';

@Component({
  template: ` <router-outlet></router-outlet> `,
  styles: [],
})
export class ProgramCreatePage implements OnInit {
  constructor(private programsState: ProgramsFacade) {}

  ngOnInit(): void {
    this.programsState.dispatch(
      ProgramsActions.loadProgramsFromCreateFeatureCreatePage()
    );
  }
}
