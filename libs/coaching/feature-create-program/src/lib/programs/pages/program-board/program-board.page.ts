import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Exercise } from '@bod/shared/models';
import { remove } from 'lodash-es';
import { Router } from '@angular/router';
import {
  ExercisesFacade,
  ExercisesApiActions,
  ProgramsFacade,
  ProgramsPageActions,
} from '@bod/coaching/domain';
import { Subject } from 'rxjs';
import { tap, takeUntil, withLatestFrom } from 'rxjs/operators';
import Fuse from 'fuse.js';

@Component({
  templateUrl: './program-board.page.html',
  styleUrls: ['./program-board.page.scss'],
})
export class ProgramBoardPage implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();
  search = new FormControl('');

  pullList: Exercise[] = [];
  pushList: Exercise[] = [];

  dayOneList: Exercise[] = [];
  dayTwoList: Exercise[] = [];
  dayThreeList: Exercise[] = [];
  dayFourList: Exercise[] = [];

  constructor(
    private router: Router,
    private exerciseState: ExercisesFacade,
    private programState: ProgramsFacade
  ) {}

  ngOnInit(): void {
    this.exerciseState.dispatch(ExercisesApiActions.loadExercises());
    this.exerciseState.allExercises$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap((list) => {
          this.pullList = list.filter((e) => e.pull);
          this.pushList = list.filter((e) => e.push);
        })
      )
      .subscribe();

    this.search.valueChanges
      .pipe(
        withLatestFrom(this.exerciseState.allExercises$),
        takeUntil(this.unsubscribe$),
        tap(([term, list]) => {
          const pulls = list.filter((e) => e.pull);
          const pushes = list.filter((e) => e.push);
          if (term === '') {
            this.pullList = pulls;
            this.pushList = pushes;
          } else {
            this.pullList = new Fuse(pulls, { keys: ['name'], includeScore: true })
              .search(term)
              .filter(result => result.score < 0.4)
              .map((result) => result.item);
            this.pushList = new Fuse(pushes, { keys: ['name'], includeScore: true })
              .search(term)
              .filter(result => result.score < 0.4)
              .map((result) => result.item);
          }
        })
      )
      .subscribe();
  }

  onClickSave() {
    /**
     * session-item flow
     */
    this.programState.dispatch(
      ProgramsPageActions.addIncompleteSessionItems({
        lists: [
          this.dayOneList,
          this.dayTwoList,
          this.dayThreeList,
          this.dayFourList,
        ],
      })
    );
    this.router.navigateByUrl('/programs/create/2');
  }

  drop(event: CdkDragDrop<Exercise[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (
      event.previousContainer.id === 'pushes' ||
      event.previousContainer.id === 'pulls'
    ) {
      copyArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  uniquePredicate = (item: CdkDrag<Exercise>, list: CdkDropList) => {
    const arrayName = `${list.id}List`;
    const array: Exercise[] = this[arrayName];
    const arrayIncludesExercise = array.find((e) => e.id === item.data.id);

    if (arrayIncludesExercise) {
      return false;
    } else {
      return true;
    }
  };

  onRemove(exercise, list: string) {
    remove(this[list], { id: exercise.id });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
