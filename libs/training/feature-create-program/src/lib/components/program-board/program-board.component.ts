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
import { OnChange } from '@bod/shared/utils';

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
    this.buildBoard(data);
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
  public daysLists: BoardCardData[][] = [...new Array(this.days)].map(() => []);

  /**
   * drop
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
    this.update.emit(this.daysLists);
  }

  /**
   * uniquePredicate
   * enforces that only one exercise-of-a-kind may be in a day list
   * @param drag a drag event that has card data
   * @param list the list the card is being dropped to
   */
  uniquePredicate = (drag: CdkDrag<BoardCardData>, list: CdkDropList) => {
    const array = this.daysLists[+list.id];
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
    remove(this.daysLists[i], (card, index) => index === j);

    this.update.emit(this.daysLists);
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
    this.daysLists = data.map((list) => list.map((obj) => obj));
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
