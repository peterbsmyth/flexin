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
import { remove, cloneDeep } from 'lodash-es';
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
  @OnChange<BoardCardData[][]>(function (board) {
    if (board) {
      this.setBoard(board);
    }
  })
  @Input()
  data: BoardCardData[][] = [[]];
  @Output() update: EventEmitter<BoardCardData[][]> = new EventEmitter();
  public allCategories = ['pull', 'push', 'other'];
  public categoriesLists: BoardCardData[][] = new Array(
    this.allCategories.length
  ).fill([]);
  public board: BoardCardData[][] = [[]];

  setBoard(board: BoardCardData[][]): void {
    const clone = cloneDeep(board);
    this.board = clone;
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
   * onRemove
   * removes a card from the board
   * @param i index of the column in the board
   * @param j index of the card in the column
   */
  onRemove(i: number, j: number) {
    const column = this.board[i];
    remove(column, (card, index) => index === j);

    if (isBoardEmpty(this.board)) {
      const board = [...Array(this.board.length)].map(() => []);
      this.setBoard(board);
    }

    this.update.emit(this.board);
  }

  buildSource(data: BoardCardData[]) {
    this.allCategories.forEach((category, i) => {
      this.categoriesLists[i] = data
        .filter((item) => item.category === category)
        .sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  /**
   * connectedTo
   * @param index the index of the column which is being evaluated. if none, returns all connections
   * @returns the connections to this drop list.
   */
  connectedTo(index?: number): string[] {
    const allDayIndexStrings = [...Array(this.board.length)].map((item, i) =>
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
