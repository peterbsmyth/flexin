import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Session, SessionItem } from '@bod/models';

@Component({
  selector: 'bod-new-session',
  templateUrl: './new-session.component.html',
  styleUrls: ['./new-session.component.scss']
})
export class NewSessionComponent implements OnInit {
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
