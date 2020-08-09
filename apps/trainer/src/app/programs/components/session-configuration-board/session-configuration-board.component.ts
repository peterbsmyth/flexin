import { Component, OnInit } from '@angular/core';
import { SessionService, WeekService } from '@bod/data';
import { SessionItem, mockSessionItems } from '@bod/models';
import { Router } from '@angular/router';

@Component({
  selector: 'bod-session-configuration-board',
  templateUrl: './session-configuration-board.component.html',
  styleUrls: ['./session-configuration-board.component.scss']
})
export class SessionConfigurationBoardComponent implements OnInit {
  private _items: SessionItem[];
  incompleteSessionItems: SessionItem[];

  constructor(
    private sessionService: SessionService,
    private router: Router,
    private weekService: WeekService
  ) {
    this._items = mockSessionItems;
    this.incompleteSessionItems = mockSessionItems;
  }

  ngOnInit(): void {
  }

  onUpdate(item: SessionItem) {
    this._items.forEach((existingItem, i) => {
      if (item.id === existingItem.id) {
        this._items[i] = {
          ...item
        };
      }
    });
  }

  onClickNext() {
    const allSessionItems = this.sessionService.finalizeItems(this._items);

    // put them into sessions
    const sessionOne = this.sessionService.createSession('day one', allSessionItems[0], 1);
    const sessionTwo = this.sessionService.createSession('day two', allSessionItems[1], 2);
    const sessionThree = this.sessionService.createSession('day three', allSessionItems[2], 3);
    const sessionFour = this.sessionService.createSession('day four', allSessionItems[3], 4);
    const sessions = [sessionOne, sessionTwo, sessionThree, sessionFour];
    this.weekService.createWeek(1, sessions);
    this.router.navigateByUrl('/programs/create/3');
  }
}
