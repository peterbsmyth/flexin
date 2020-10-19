import { Component, OnInit } from '@angular/core';
import { ProgramsFacade, ProgramsActions } from '@bod/coaching/domain';
import { Program } from '@bod/shared/models';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
})
export class ProgramsPage implements OnInit {
  programs$: Observable<Program[]>;
  loaded$: Observable<boolean>;
  constructor(private programsState: ProgramsFacade) {
    this.programs$ = this.programsState.allPrograms$;
    this.loaded$ = this.programsState.loaded$;
  }

  ngOnInit(): void {
    this.programsState.dispatch(
      ProgramsActions.loadProgramsFromCreateFeatureProgramsPage()
    );
  }
}
