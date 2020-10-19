import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ProgramsFacade,
  ProgramsActions,
  ProgramStatisticsActions,
} from '@bod/training/domain';

@Component({
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss'],
})
export class ProgramPage implements OnInit {
  constructor(
    public programsState: ProgramsFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['programId'];
    this.programsState.dispatch(
      ProgramsActions.loadProgramFromInputFeatureProgramPage({
        id,
      })
    );

    this.programsState.dispatch(
      ProgramStatisticsActions.loadProgramStatisticByProgram({
        id,
      })
    );
  }
}
