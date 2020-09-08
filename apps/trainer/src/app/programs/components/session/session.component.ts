import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { Session, SessionItem } from '@bod/shared/models';

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
        sessionItems: [...session.sessionItems]
      };
    }
  }

  onUpdate(item: SessionItem) {
    this._session.sessionItems.forEach((existingItem, i) => {
      if (item.id === existingItem.id) {
        this._session.sessionItems[i] = {
          ...item
        };
      }
    });
    this.update.emit(this._session);
  }
}
