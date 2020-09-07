import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProgramsFacade, ProgramsActions } from '@bod/training/domain';

@Component({
  selector: 'bod-program',
  templateUrl: './program.page.html',
  styleUrls: ['./program.page.scss'],
})
export class ProgramPage implements OnInit {
  constructor(
    public programsState: ProgramsFacade,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.programsState.dispatch(
      ProgramsActions.loadProgram({
        id: this.route.snapshot.params['programId'],
      })
    );
  }
}
