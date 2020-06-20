import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session.service';
import { SessionItem } from '@bod/models';
import { Router } from '@angular/router';
import { WeekService } from '../week.service';
import { cloneDeep } from 'lodash';

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
    this._items = [{"exercise":{"id":1,"name":"Handstand push-up negative","intensities":["bodyweight"],"push":true},"reps":1,"AMRAP":false,"sets":5,"weight":null,"intensity":null,"tempo":"5s eccentric, 2s hold","id":1001},{"exercise":{"id":2,"name":"Handstand to planche negative with hold","intensities":["tuck","advanced tuck","single-leg","closed straddle","open straddle","full"],"push":true},"reps":1,"AMRAP":false,"sets":5,"weight":null,"intensity":"closed straddle","tempo":"5 second hold at bottom","id":1002},{"exercise":{"id":3,"name":"Band planche","intensities":["tuck","advanced tuck","single-leg","closed straddle","open straddle","full"],"push":true},"reps":20,"AMRAP":false,"sets":3,"weight":null,"intensity":"full","tempo":null,"id":1003},{"exercise":{"id":4,"name":"Weighted dips","intensities":[],"push":true},"reps":8,"AMRAP":false,"sets":4,"weight":"35","intensity":null,"tempo":"self directed","id":1004},{"exercise":{"id":5,"name":"OAC negatives","intensities":[],"pull":true},"reps":2,"AMRAP":false,"sets":2,"weight":null,"intensity":null,"tempo":"5 second eccentric","id":1005},{"exercise":{"id":6,"name":"Front lever raises top half","intensities":["tuck","advanced tuck","single-leg","closed straddle","open straddle","full"],"pull":true},"reps":3,"AMRAP":false,"sets":4,"weight":null,"intensity":"single-leg","tempo":"self directed","id":1006},{"exercise":{"id":7,"name":"Weighted Chin-ups","intensities":[],"pull":true},"reps":null,"AMRAP":true,"sets":3,"weight":"35","intensity":null,"tempo":"self directed","id":1007},{"exercise":{"id":8,"name":"Front lever holds with band","intensities":["tuck","advanced tuck","single-leg","closed straddle","open straddle","full"],"pull":true},"reps":15,"AMRAP":false,"sets":3,"weight":null,"intensity":"full","tempo":null,"id":1008},{"exercise":{"id":9,"name":"MAPPU","intensities":["tuck => straddle","tuck => full","straddle => full"],"push":true},"reps":2,"AMRAP":false,"sets":3,"weight":null,"intensity":"tuck => straddle","tempo":"5 second hold at bottom","id":1009},{"exercise":{"id":10,"name":"Pseudo planche push-ups with lift","intensities":["straddle","full"],"push":true},"reps":5,"AMRAP":false,"sets":3,"weight":null,"intensity":"full","tempo":"2 second lift","id":1010},{"exercise":{"id":11,"name":"L-sit chin-ups","intensities":[],"pull":true},"reps":null,"AMRAP":true,"sets":3,"weight":null,"intensity":null,"tempo":"self directed","id":1011},{"exercise":{"id":12,"name":"Archer rows", "leftRight": true, "intensities":[],"pull":true},"reps":6,"AMRAP":false,"sets":2,"weight":null,"intensity":null,"tempo":null,"id":1012, "leftRight": true}];
    this.incompleteSessionItems = [{"exercise":{"id":1,"name":"Handstand push-up negative","intensities":["bodyweight"],"push":true},"reps":1,"AMRAP":false,"sets":5,"weight":null,"intensity":null,"tempo":"5s eccentric, 2s hold","id":1001},{"exercise":{"id":2,"name":"Handstand to planche negative with hold","intensities":["tuck","advanced tuck","single-leg","closed straddle","open straddle","full"],"push":true},"reps":1,"AMRAP":false,"sets":5,"weight":null,"intensity":"closed straddle","tempo":"5 second hold at bottom","id":1002},{"exercise":{"id":3,"name":"Band planche","intensities":["tuck","advanced tuck","single-leg","closed straddle","open straddle","full"],"push":true},"reps":20,"AMRAP":false,"sets":3,"weight":null,"intensity":"full","tempo":null,"id":1003},{"exercise":{"id":4,"name":"Weighted dips","intensities":[],"push":true},"reps":8,"AMRAP":false,"sets":4,"weight":"35","intensity":null,"tempo":"self directed","id":1004},{"exercise":{"id":5,"name":"OAC negatives","intensities":[],"pull":true},"reps":2,"AMRAP":false,"sets":2,"weight":null,"intensity":null,"tempo":"5 second eccentric","id":1005},{"exercise":{"id":6,"name":"Front lever raises top half","intensities":["tuck","advanced tuck","single-leg","closed straddle","open straddle","full"],"pull":true},"reps":3,"AMRAP":false,"sets":4,"weight":null,"intensity":"single-leg","tempo":"self directed","id":1006},{"exercise":{"id":7,"name":"Weighted Chin-ups","intensities":[],"pull":true},"reps":null,"AMRAP":true,"sets":3,"weight":"35","intensity":null,"tempo":"self directed","id":1007},{"exercise":{"id":8,"name":"Front lever holds with band","intensities":["tuck","advanced tuck","single-leg","closed straddle","open straddle","full"],"pull":true},"reps":15,"AMRAP":false,"sets":3,"weight":null,"intensity":"full","tempo":null,"id":1008},{"exercise":{"id":9,"name":"MAPPU","intensities":["tuck => straddle","tuck => full","straddle => full"],"push":true},"reps":2,"AMRAP":false,"sets":3,"weight":null,"intensity":"tuck => straddle","tempo":"5 second hold at bottom","id":1009},{"exercise":{"id":10,"name":"Pseudo planche push-ups with lift","intensities":["straddle","full"],"push":true},"reps":5,"AMRAP":false,"sets":3,"weight":null,"intensity":"full","tempo":"2 second lift","id":1010},{"exercise":{"id":11,"name":"L-sit chin-ups","intensities":[],"pull":true},"reps":null,"AMRAP":true,"sets":3,"weight":null,"intensity":null,"tempo":"self directed","id":1011},{"exercise":{"id":12,"name":"Archer rows", "leftRight": true, "intensities":[],"pull":true},"reps":6,"AMRAP":false,"sets":2,"weight":null,"intensity":null,"tempo":null,"id":1012, "leftRight": true}];
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
    this.router.navigateByUrl('/session');
  }
}
