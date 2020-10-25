import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
} from '@angular/core';
import {
  CdkDrag,
  CdkDropList,
  CdkDragDrop,
  moveItemInArray,
  copyArrayItem,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { remove } from 'lodash-es';
import { BoardCardData } from '@bod/training/domain';
import { OnChange, isBoardEmpty } from '@bod/shared/utils';

@Component({
  selector: 'training-program-board',
  templateUrl: './program-board.component.html',
  styleUrls: ['./program-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramBoardComponent {
  @OnChange<BoardCardData[]>(function (data) {
    if (data) {
      this.buildSource(data);
    }
  })
  @Input()
  sourceColumn: BoardCardData[];
  @OnChange<any>(function (data) {
    if (data) {
      this.buildBoard(data);
    }
  })
  @Input()
  data: any;
  @Input() displaySource = true;
  @Output() update: EventEmitter<BoardCardData[][]> = new EventEmitter();
  public allCategories = ['pull', 'push', 'other'];
  public categoriesLists: BoardCardData[][] = new Array(
    this.allCategories.length
  ).fill([]);
  public days = 4;
  public board: BoardCardData[][];

  setBoard = () => [...new Array(this.days)].map(() => []);

  constructor() {
    this.board = this.setBoard();
  }

  /**
   * drop
   * move an item up and down the source column
   * move from source to board column
   * move from board column to board column
   * @param event a drag drop event
   */
  drop(event: CdkDragDrop<BoardCardData[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else if (this.allCategories.includes(event.previousContainer.id)) {
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
    this.update.emit(this.board);
  }

  /**
   * uniquePredicate
   * enforces that only one exercise-of-a-kind may be in a day list
   * @param drag a drag event that has card data
   * @param list the list the card is being dropped to
   */
  uniquePredicate = (drag: CdkDrag<BoardCardData>, list: CdkDropList) => {
    const array = this.board[+list.id];
    const arrayIncludesExercise = array.find((e) => e.id === drag.data.id);
    return !arrayIncludesExercise;
  };

  /**
   * onRemove
   * removes a dcard from the board
   * @param i index of the dayList
   * @param j index of the card in the dayList
   */
  onRemove(i: number, j: number) {
    remove(this.board[i], (card, index) => index === j);

    this.update.emit(this.board);

    if (isBoardEmpty(this.board)) {
      this.board = this.setBoard();
    }
  }

  buildSource(data: BoardCardData[]) {
    this.allCategories.forEach((category, i) => {
      this.categoriesLists[i] = data
        .filter((item) => item.category === category)
        .sort((a, b) => a.name.localeCompare(b.name));
    });
  }
  /**
   * buildBoard
   * @param data all of the days of workouts
   */
  buildBoard(data: BoardCardData[][]) {
    this.board = data.map((list) => list.map((obj) => obj));
  }

  /**
   * connectedTo
   * @param index the index of the day which is being evaluated. if none, returns all connections
   * @returns the connections to this drop list.
   */
  connectedTo(index?: number): string[] {
    const allDayIndexStrings = [...Array(this.days)].map((item, i) =>
      i.toString()
    );

    if (!index) {
      return allDayIndexStrings;
    } else {
      return allDayIndexStrings.filter(
        (currentDayIndex) => +currentDayIndex !== index
      );
    }
  }
}
