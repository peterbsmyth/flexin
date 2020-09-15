import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SessionItem, mockSessionItems, mockExercises } from '@bod/shared/models';

@Component({
  selector: 'bod-session-configuration-board',
  templateUrl: './session-configuration-board.page.html',
  styleUrls: ['./session-configuration-board.page.scss']
})
export class SessionConfigurationBoardPage implements OnInit {
  private _items: SessionItem[];
  incompleteSessionItems: SessionItem[];
  exercise = mockExercises[0];

  constructor(
    private router: Router
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
    // const allSessionItems = this.sessionService.finalizeItems(this._items);

    // // put them into sessions
    // const sessionOne = this.sessionService.createSession('day one', allSessionItems[0], 1);
    // const sessionTwo = this.sessionService.createSession('day two', allSessionItems[1], 2);
    // const sessionThree = this.sessionService.createSession('day three', allSessionItems[2], 3);
    // const sessionFour = this.sessionService.createSession('day four', allSessionItems[3], 4);
    // const sessions = [sessionOne, sessionTwo, sessionThree, sessionFour];
    // this.weekService.createWeek(1, sessions);
    this.router.navigateByUrl('/programs/create/3');
  }
}
