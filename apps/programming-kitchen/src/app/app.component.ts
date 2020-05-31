import { Component } from '@angular/core';
import { Exercise } from '@bod/models';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'bod-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  sourceList: Exercise[] = [{
    name: 'MAPPU',
  },
  {
    name: 'HSPU'
  }];
  dayOneList: Exercise[] = [];
  dayTwoList: Exercise[] = [];
  dayThreeList: Exercise[] = [];
  dayFourList: Exercise[] = [];

  drop(event: CdkDragDrop<Exercise[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex)
    } else {
      transferArrayItem(event.previousContainer.data, event.container.data, event.previousIndex, event.currentIndex);
    }
  }
}
