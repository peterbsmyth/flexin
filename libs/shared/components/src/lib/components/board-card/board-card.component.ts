import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { BoardCardData } from '@bod/shared/models';

@Component({
  selector: 'bod-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss']
})
export class BoardCardComponent implements OnInit {
  @Input() data: BoardCardData;
  @Input() closeable = true;
  @Input() compact = false;
  @Output() remove: EventEmitter<BoardCardData> = new EventEmitter();
  constructor(
    private router: Router
  ) { }

  ngOnInit(): void {}

  onRemove() {
    this.remove.emit(this.data);
  }
}
