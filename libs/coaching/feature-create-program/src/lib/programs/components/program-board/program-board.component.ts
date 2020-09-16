import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { remove } from 'lodash-es';
import { Exercise, Session, SessionItem } from '@bod/shared/models';

export interface ProgramBoardData {
  sessions?: Session[];
  exercises?: Exercise[];
  sessionItems?: SessionItem[];
}

@Component({
  selector: 'coaching-program-board',
  templateUrl: './program-board.component.html',
  styleUrls: ['./program-board.component.scss'],
})
export class ProgramBoardComponent implements OnInit {
  @Input() displaySource = true;
  private _data: ProgramBoardData;
  @Input()
  get data(): ProgramBoardData {
    return this._data;
  }
  set data(data: ProgramBoardData) {
    this._data = data;
    this.buildBoard(data);
  }
  @Output() update: EventEmitter<any> = new EventEmitter();
  public pullList: Exercise[] = [];
  public pushList: Exercise[] = [];

  public dayOneList: Exercise[] = [];
  public dayTwoList: Exercise[] = [];
  public dayThreeList: Exercise[] = [];
  public dayFourList: Exercise[] = [];

  constructor() {}

  ngOnInit(): void {}

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

    this.update.emit([
      [...this.dayOneList],
      [...this.dayTwoList],
      [...this.dayThreeList],
      [...this.dayFourList],
    ]);
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

  buildBoard(data: ProgramBoardData) {
    if (data && data.exercises) {
      this.pullList = data.exercises.filter((e) => e.pull);
      this.pushList = data.exercises.filter((e) => e.push);
    }
  }
}
