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
import { ProgramBoardData, BoardCardData } from '@bod/coaching/domain';
import { OnChange } from '@bod/shared/utils';

@Component({
  selector: 'coaching-program-board',
  templateUrl: './program-board.component.html',
  styleUrls: ['./program-board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProgramBoardComponent implements OnInit {
  @Input() displaySource = true;
  @OnChange<ProgramBoardData>(function (data) {
    this.buildBoard(data);
  })
  @Input()
  data: ProgramBoardData;
  @Output() update: EventEmitter<any> = new EventEmitter();
  public pullList: BoardCardData[] = [];
  public pushList: BoardCardData[] = [];
  public otherList: BoardCardData[] = [];

  public dayOneList: BoardCardData[] = [];
  public dayTwoList: BoardCardData[] = [];
  public dayThreeList: BoardCardData[] = [];
  public dayFourList: BoardCardData[] = [];

  constructor() {}

  ngOnInit(): void {}

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

    this.update.emit([
      [...this.dayOneList],
      [...this.dayTwoList],
      [...this.dayThreeList],
      [...this.dayFourList],
    ]);
  }

  uniquePredicate = (item: CdkDrag<BoardCardData>, list: CdkDropList) => {
    const arrayName = `${list.id}List`;
    const array: BoardCardData[] = this[arrayName];
    const arrayIncludesExercise = array.find(
      (e) => e.exercise.id === item.data.exercise.id
    );

    if (arrayIncludesExercise) {
      return false;
    } else {
      return true;
    }
  };

  onRemove(datum, list: string) {
    remove(this[list], { exercise: { id: datum.exercise.id } });

    this.update.emit([
      [...this.dayOneList],
      [...this.dayTwoList],
      [...this.dayThreeList],
      [...this.dayFourList],
    ]);
  }

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

      const session1 = data.sessions.find((session) => session.order === 1);
      const session2 = data.sessions.find((session) => session.order === 2);
      const session3 = data.sessions.find((session) => session.order === 3);
      const session4 = data.sessions.find((session) => session.order === 4);
      this.dayOneList = allBoardCardData.filter(
        (datum) => datum.sessionItem.sessionId === session1.id
      );
      this.dayTwoList = allBoardCardData.filter(
        (datum) => datum.sessionItem.sessionId === session2.id
      );
      this.dayThreeList = allBoardCardData.filter(
        (datum) => datum.sessionItem.sessionId === session3.id
      );
      this.dayFourList = allBoardCardData.filter(
        (datum) => datum.sessionItem.sessionId === session4.id
      );
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
      this.dayOneList = [...data.draft[0]];
      this.dayTwoList = [...data.draft[1]];
      this.dayThreeList = [...data.draft[2]];
      this.dayFourList = [...data.draft[3]];
    }
  }
}
