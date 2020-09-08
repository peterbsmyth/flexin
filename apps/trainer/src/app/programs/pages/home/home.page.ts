import { Component, OnInit } from '@angular/core';
import { ProgramsFacade, ProgramsPageActions } from '@bod/coaching/domain';
import { Program } from '@bod/shared/models';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  programs$: Observable<Program[]>;
  loaded$: Observable<boolean>;
  constructor(
    private programsState: ProgramsFacade
  ) {
    this.programs$ = this.programsState.allPrograms$;
    this.loaded$ = this.programsState.loaded$;
  }

  ngOnInit(): void {
    this.programsState.dispatch(ProgramsPageActions.loadPrograms());
  }
}
