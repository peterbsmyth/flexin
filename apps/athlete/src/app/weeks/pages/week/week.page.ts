import { Component, OnInit } from '@angular/core';
import { Week, Session } from '@bod/shared/domain';
import { Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';
import { WeeksFacade } from '@bod/training/domain';

@Component({
  selector: 'bod-week',
  templateUrl: './week.page.html',
  styleUrls: ['./week.page.scss']
})
export class WeekPage implements OnInit {
  week$: Observable<Week>;
  sessions$: Observable<Session[]>;
  sessionsLoaded$: Observable<boolean>;

  constructor(
    public weeksState: WeeksFacade
  ) {
    this.week$ = this.weeksState.selectedWeeks$
      .pipe(
        filter(w => !!w)
      );
    this.sessions$ = this.weeksState.allSessions$
      .pipe(
        filter(w => !!w)
      );
    this.sessionsLoaded$ = this.sessions$
      .pipe(
        map((sessions) => sessions.every(s => s))
      );
  }

  ngOnInit(): void {
  }
}
