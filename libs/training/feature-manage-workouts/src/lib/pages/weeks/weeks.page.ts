import { Component, OnInit } from '@angular/core';
import { ProgramsFacade, WeeksPageActions } from '@bod/training/domain';
import { Observable } from 'rxjs';
import { Week } from '@bod/shared/models';
import { filter, map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  templateUrl: './weeks.page.html',
  styleUrls: ['./weeks.page.scss'],
})
export class WeeksPage implements OnInit {
  weeks$: Observable<Week[]>;
  weeksLoaded$: Observable<boolean>;

  constructor(
    public programsState: ProgramsFacade,
    private route: ActivatedRoute
  ) {
    this.weeks$ = this.programsState.allWeeks$.pipe(filter((w) => !!w));
    this.weeksLoaded$ = this.weeks$.pipe(map((weeks) => weeks.every((s) => s)));
  }

  ngOnInit(): void {
    this.programsState.dispatch(
      WeeksPageActions.loadWeeksByProgram({
        id: this.route.snapshot.params['programId'],
      })
    );
  }
}
