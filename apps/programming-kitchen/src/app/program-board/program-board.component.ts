import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '@bod/models';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { tap, withLatestFrom, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import Fuse from 'fuse.js';
import { ExerciseService } from '../exercise.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SessionService } from '../session.service';
import { WeekService } from '../week.service';

@Component({
  selector: 'bod-program-board',
  templateUrl: './program-board.component.html',
  styleUrls: ['./program-board.component.css']
})
export class ProgramBoardComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  search = new FormControl('');
  sourceList = [{
    name: 'MAPPU',
    push: true,
  },
  {
    name: 'HSPU',
    push: true,
  },
  {
    name: 'OAC',
    pull: true
  }];

  pullList: Exercise[] = [];
  pushList: Exercise[] = [];
  
  dayOneList: Exercise[] = [];
  dayTwoList: Exercise[] = [];
  dayThreeList: Exercise[] = [];
  dayFourList: Exercise[] = [];

  constructor(
    private exerciseService: ExerciseService,
    private sessionService: SessionService,
    private router: Router,
    private weekService: WeekService
  ) {}

  drop(event: CdkDragDrop<Exercise[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else if (event.previousContainer.id === 'pushes' || event.previousContainer.id === 'pulls') {
      copyArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }

  onClickSave() {
    // create SessionItems from Lists
    const sessionItemsOne = this.sessionService.createItemsFromExericses(this.dayOneList);
    const sessionItemsTwo = this.sessionService.createItemsFromExericses(this.dayTwoList);
    const sessionItemsThree = this.sessionService.createItemsFromExericses(this.dayThreeList);
    const sessionItemsFour = this.sessionService.createItemsFromExericses(this.dayFourList);

    // put them into sessions
    const sessionOne = this.sessionService.createSession('day one', sessionItemsOne, 1);
    const sessionTwo = this.sessionService.createSession('day two', sessionItemsTwo, 2);
    const sessionThree = this.sessionService.createSession('day three', sessionItemsThree, 3);
    const sessionFour = this.sessionService.createSession('day four', sessionItemsFour, 4);
    const sessions = [sessionOne, sessionTwo, sessionThree, sessionFour];

    // create a week
    this.weekService.createWeek(1, sessions);
    this.router.navigateByUrl('/session');
  }

  ngOnInit() {
    this.exerciseService.sourceList$.pipe(
      takeUntil(this.unsubscribe$),
      tap(list => {
        this.pullList = list.filter(e => e.pull);
        this.pushList = list.filter(e => e.push);
      })
    )
    .subscribe();
    this.search.valueChanges.pipe(
      withLatestFrom(this.exerciseService.sourceList$),
      takeUntil(this.unsubscribe$),
      tap(([term, list]) => {
        if (term === '') {
          this.pullList = list.filter(e => e.pull);
          this.pushList = list.filter(e => e.push);
        } else {
          this.pullList = new Fuse(this.pullList, { keys: ['name'] }).search(term).map(result => result.item);
          this.pushList = new Fuse(this.pushList, { keys: ['name'] }).search(term).map(result => result.item);
        }
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
