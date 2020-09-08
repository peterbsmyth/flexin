import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '@bod/shared/models';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem, CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
import { tap, withLatestFrom, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import Fuse from 'fuse.js';
import { ExerciseService, SessionService, WeekService } from '@bod/data';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { remove } from 'lodash-es';

@Component({
  selector: 'bod-program-board',
  templateUrl: './program-board.component.html',
  styleUrls: ['./program-board.component.scss']
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
  
  dayOneList: Exercise[] = [{"id":1,"name":"Handstand push-up negative","intensities":["bodyweight"],"push":true},{"id":2,"name":"Handstand to planche negative with hold","intensities":["tuck","advanced tuck","single-leg","closed straddle","open straddle","full"],"push":true},{"id":3,"name":"Band planche","intensities":["tuck","advanced tuck","single-leg","closed straddle","open straddle","full"],"push":true},{"id":4,"name":"Weighted dips","intensities":[],"push":true}];
  dayTwoList: Exercise[] = [{"id":1,"name":"Handstand push-up negative","intensities":["bodyweight"],"push":true},{"id":5,"name":"OAC negatives","intensities":[],"pull":true},{"id":6,"name":"Front lever raises top half","intensities":["tuck","advanced tuck","single-leg","closed straddle","open straddle","full"],"pull":true},{"id":7,"name":"Weighted Chin-ups","intensities":[],"pull":true},{"id":8,"name":"Front lever holds with band","intensities":["tuck","advanced tuck","single-leg","closed straddle","open straddle","full"],"pull":true}];
  dayThreeList: Exercise[] = [{"id":2,"name":"Handstand to planche negative with hold","intensities":["tuck","advanced tuck","single-leg","closed straddle","open straddle","full"],"push":true},{"id":9,"name":"MAPPU","intensities":["tuck => straddle","tuck => full","straddle => full"],"push":true},{"id":10,"name":"Pseudo planche push-ups with lift","intensities":["straddle","full"],"push":true},{"id":3,"name":"Band planche","intensities":["tuck","advanced tuck","single-leg","closed straddle","open straddle","full"],"push":true},{"id":4,"name":"Weighted dips","intensities":[],"push":true}];
  dayFourList: Exercise[] = [{"id":1,"name":"Handstand push-up negative","intensities":["bodyweight"],"push":true},{"id":5,"name":"OAC negatives","intensities":[],"pull":true},{"id":6,"name":"Front lever raises top half","intensities":["tuck","advanced tuck","single-leg","closed straddle","open straddle","full"],"pull":true},{"id":11,"name":"L-sit chin-ups","intensities":[],"pull":true},{"id":12,"name":"Archer rows","intensities":[],"pull":true, "leftRight": true}];

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
    /**
     * session-item flow
     */
    this.sessionService.configureExercises([this.dayOneList, this.dayTwoList, this.dayThreeList, this.dayFourList]);
    this.router.navigateByUrl('/programs/create/2');

    /**
     * session-item flow
     */
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
    // this.weekService.createWeek(1, sessions);
    // this.router.navigateByUrl('/programs/create/3');
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

  onClose(exericse, list: string) {
    remove(this[list], { id: exericse.id });
  }

  uniquePredicate = (item: CdkDrag<Exercise>, list: CdkDropList) => {
    const arrayName = `${list.id}List`;
    const array: Exercise[] = this[arrayName];
    const arrayIncludesExercise = array.find(e => e.id === item.data.id);

    if (arrayIncludesExercise) {
      return false
    } else {
      return true;
    }
  }
}
