import { Component, OnInit } from '@angular/core';
import { loadV2Programs, V2ProgramsFacade } from '@bod/training/domain';
import { Program, ProgramV2 } from '@bod/shared/models';
import { Observable } from 'rxjs';

@Component({
  templateUrl: './programs.page.html',
  styleUrls: ['./programs.page.scss'],
})
export class ProgramsPage implements OnInit {
  programs$: Observable<ProgramV2[]>;
  loaded$: Observable<boolean>;
  constructor(private programsState: V2ProgramsFacade) {
    this.programs$ = this.programsState.allV2Programs$;
    this.loaded$ = this.programsState.loaded$;
  }

  ngOnInit(): void {
    this.programsState.dispatch(loadV2Programs());
  }
}
