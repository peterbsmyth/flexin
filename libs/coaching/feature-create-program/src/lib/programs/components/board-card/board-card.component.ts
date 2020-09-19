import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BoardCardData } from '@bod/coaching/domain';

@Component({
  selector: 'coaching-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent implements OnInit {
  @Input() data: BoardCardData;
  @Input() closeable = true;
  @Input() clickable = true;
  @Output() remove: EventEmitter<BoardCardData> = new EventEmitter();
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {}

  onRemove() {
    this.remove.emit(this.data);
  }

  onClick(data: BoardCardData) {
    if (this.clickable) {
      this.router.navigate(['session-items', data.sessionItem.id]);
    }
  }
}
