import {
  Component,
  OnInit,
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
import { ProgramBoardData, BoardCardData } from '@bod/training/domain';
import { OnChange } from '@bod/shared/utils';

@Component({
  selector: 'training-program-board',
  templateUrl: './program-board.component.html',
  styleUrls: ['./program-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramBoardComponent {
  @OnChange<ProgramBoardData>(function (data) {
    this.buildBoard(data);
  })
  @Input()
  data: ProgramBoardData;
  @Input() displaySource = true;
  @Output() update: EventEmitter<any> = new EventEmitter();
  public pullList: BoardCardData[] = [];
  public pushList: BoardCardData[] = [];
  public otherList: BoardCardData[] = [];
  public allDayNumbers = [1, 2, 3, 4];
  public daysLists: BoardCardData[][] = [];

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
    } else if (
      event.previousContainer.id === 'pushes' ||
      event.previousContainer.id === 'pulls' ||
      event.previousContainer.id === 'other'
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

    this.update.emit(this.daysLists);
  }

  /**
   * uniquePredicate
   * enforces that only one exercise-of-a-kind may be in a day list
   * @param drag a drag event that has card data
   * @param list the list the card is being dropped to
   */
  uniquePredicate = (drag: CdkDrag<BoardCardData>, list: CdkDropList) => {
    const array = this.daysLists[+list.id - 1];
    const arrayIncludesExercise = array.find(
      (e) => e.exercise.id === drag.data.exercise.id
    );

    return !arrayIncludesExercise;
  };

  /**
   * onRemove
   * removes a card from the board
   * @param card the card being removed
   * @param dayNumber the day number that it's being removed from
   */
  onRemove(card, dayNumber: number) {
    remove(this.daysLists[dayNumber - 1], {
      exercise: { id: card.exercise.id },
    });

    this.update.emit(this.daysLists);
  }

  /**
   * buildBoard
   * @param data all of the days of workouts
   */
  buildBoard(data: ProgramBoardData) {
    const hasData = data?.sessionItems && data?.exercises.length;

    if (hasData && !this.displaySource) {
      const allBoardCardData = data.sessionItems.map((sessionItem) => {
        return {
          sessionItem: {
            ...sessionItem,
          },
          exercise: data.exercises.find(
            (exercise) => sessionItem.exerciseId === exercise.id
          ),
        };
      });

      this.allDayNumbers.forEach((dayNumber) => {
        const day = data.sessions.find(
          (session) => session.order === dayNumber
        );
        this.daysLists[dayNumber - 1] = allBoardCardData.filter(
          (datum) => datum.sessionItem.sessionId === day.id
        );
      });
    }

    if (hasData && this.displaySource) {
      this.pullList = data.exercises
        .filter((e) => e.pull)
        .map((exercise) => ({ sessionItem: null, exercise }))
        .sort((a, b) => a.exercise.name.localeCompare(b.exercise.name));
      this.pushList = data.exercises
        .filter((e) => e.push)
        .map((exercise) => ({ sessionItem: null, exercise }))
        .sort((a, b) => a.exercise.name.localeCompare(b.exercise.name));
      this.otherList = data.exercises
        .filter((e) => !e.push && !e.pull)
        .map((exercise) => ({ sessionItem: null, exercise }))
        .sort((a, b) => a.exercise.name.localeCompare(b.exercise.name));
    }

    if (hasData && data.draft) {
      this.daysLists = new Array(data.draft.length).fill(null);
      data.draft.forEach((list, i) => {
        this.daysLists[i] = [...list];
      });
    }
  }

  /**
   * connectedTo
   * @param dayNumber the number day which is being evaluated. if none, returns all connections
   * @returns the connections to this drop list.
   */
  connectedTo(dayNumber?: number): string[] {
    const allDayNumberStrings = this.allDayNumbers.map((currentDayNumber) =>
      currentDayNumber.toString()
    );
    if (!dayNumber) {
      return allDayNumberStrings;
    } else {
      return allDayNumberStrings.filter(
        (currentDayNumber) => +currentDayNumber !== dayNumber
      );
    }
  }
}
