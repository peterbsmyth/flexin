import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BoardCardData } from '@bod/coaching/domain';

@Component({
  selector: 'coaching-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent implements OnInit {
  @Input() data: BoardCardData;
  @Input() closeable = true;
  @Output() remove: EventEmitter<BoardCardData> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {}

  onRemove() {
    this.remove.emit(this.data);
  }

}
