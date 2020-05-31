import { Component, OnInit } from '@angular/core';
import { Exercise } from '@bod/models';
import { CdkDragDrop, moveItemInArray, transferArrayItem, copyArrayItem } from '@angular/cdk/drag-drop';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'bod-program-board',
  templateUrl: './program-board.component.html',
  styleUrls: ['./program-board.component.css']
})
export class ProgramBoardComponent {
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
    this.pullList = this.sourceList.filter(e => e.pull);
    this.pushList = this.sourceList.filter(e => e.push);
  }
}
