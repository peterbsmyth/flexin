import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'training-board-card',
  templateUrl: './board-card.component.html',
  styleUrls: ['./board-card.component.scss'],
})
export class BoardCardComponent {
  @Input()
  name: string;
  @Input() closeable = true;
  @Output() remove: EventEmitter<any> = new EventEmitter();

  onRemove() {
    this.remove.emit();
  }
}
