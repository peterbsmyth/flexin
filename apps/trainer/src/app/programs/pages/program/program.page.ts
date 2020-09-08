import { Component, OnInit } from '@angular/core';
import { ProgramsFacade, ProgramsPageActions } from '@bod/coaching/domain';
import { Program } from '@bod/shared/models';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss']
})
export class ProgramPage implements OnInit {
  program$: Observable<Program>;
  loaded$: Observable<boolean>;
  constructor(
    private programsState: ProgramsFacade
  ) {
    this.program$ = this.programsState.selectedPrograms$;
    this.loaded$ = this.programsState.loaded$;
  }

  ngOnInit(): void {
    this.programsState.dispatch(ProgramsPageActions.loadPrograms());
  }
}
