import { Component, OnInit } from '@angular/core';
import { Week } from '@bod/shared/models';
import { Observable } from 'rxjs';
import { WeeksFacade } from '@bod/training/domain';

@Component({
  selector: 'bod-week',
  templateUrl: './week.page.html',
  styleUrls: ['./week.page.scss']
})
export class WeekPage implements OnInit {
  week$: Observable<Week>;
  constructor(
    private weeksState: WeeksFacade,
  ) {
    this.week$ = this.weeksState.selectedWeeks$;
  }

  ngOnInit(): void {
  }
}
