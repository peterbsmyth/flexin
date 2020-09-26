import { Component, OnInit } from '@angular/core';
import { ProgramsFacade, ProgramsActions } from '@bod/training/domain';


@Component({
  selector: 'bod-programs',
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss']
})
export class ProgramsPage implements OnInit {
  constructor(
    public programsState: ProgramsFacade
  ) {
  }
  
  ngOnInit() {
    this.programsState.dispatch(ProgramsActions.loadPrograms());
  }
}
