import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Session, SessionItem } from '@bod/models';

@Component({
  selector: 'bod-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit, OnChanges {
  @Input() session: Session;
  @Output() update: EventEmitter<Session> = new EventEmitter();
  private _session: Session;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.session.currentValue) {
      const session = changes.session.currentValue;
      this._session = {
        ...session,
        items: [...session.items]
      };
    }
  }

  onUpdate(item: SessionItem) {
    this._session.items.forEach((existingItem, i) => {
      if (item.id === existingItem.id) {
        this._session.items[i] = {
          ...item
        };
      }
    });
    this.update.emit(this._session);
  }
}