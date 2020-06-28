import { Component, OnInit } from '@angular/core';
import { mockSession, Session } from '@bod/models';

@Component({
  selector: 'bod-input-page',
  templateUrl: './input-page.component.html',
  styleUrls: ['./input-page.component.scss']
})
export class InputPageComponent implements OnInit {
  session: Session = mockSession;
  currentItemIndex =  0;

  constructor() { }

  ngOnInit(): void {
  }

  arrayOfCount(n: number): any[] {
    return Array(n);
  }
  
  onGo(direction: string) {
    const max = this.session.items.length - 1;
    const canGoNext = this.currentItemIndex < max;
    const canGoPrevious = this.currentItemIndex > 0;

    if (direction === 'next' && canGoNext) {
      this.currentItemIndex++;
    } else if (direction === 'previous' && canGoPrevious) {
      this.currentItemIndex--;
    }
  }
}
