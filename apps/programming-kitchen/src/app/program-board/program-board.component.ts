import { Component, OnInit, OnDestroy } from '@angular/core';
import { Exercise } from '@bod/models';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { tap, withLatestFrom, takeUntil } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import Fuse from 'fuse.js';
import { ExerciseService } from '../exercise.service';
import { Subject } from 'rxjs';

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
    public exerciseService: ExerciseService
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
