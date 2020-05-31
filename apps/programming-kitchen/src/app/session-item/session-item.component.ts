import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SessionItem } from '@bod/models';
import { FormBuilder, FormGroup } from '@angular/forms';
import { tap, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'bod-session-item',
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.css']
})
export class SessionItemComponent implements OnInit, OnDestroy {
  @Input() item: SessionItem;
  @Output() update: EventEmitter<SessionItem> = new EventEmitter();
  unsubscribe$: Subject<any> = new Subject();
  form: FormGroup = this.fb.group({
    reps: 0,
    AMRAP: false,
    sets: 0,
    weight: '',
    intensity: '',
    tempo: ''
  });

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form.get('AMRAP').valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      tap(amrap => {
        if (amrap) {
          this.form.get('reps').setValue(0);
          this.form.get('reps').disable();
        } else {
          this.form.get('reps').enable();
        }
      })
    ).subscribe();

    this.form.valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      distinctUntilChanged(),
      tap(value => {
        const sessionItem: SessionItem = {
          ...this.item,
          ...value
        };
        this.update.emit(sessionItem);
      })
    ).subscribe();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
