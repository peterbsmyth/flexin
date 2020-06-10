import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SessionItem } from '@bod/models';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { tap, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'bod-new-session-item',
  templateUrl: './new-session-item.component.html',
  styleUrls: ['./new-session-item.component.scss']
})
export class NewSessionItemComponent implements OnInit {
  @Input() item: SessionItem;
  @Input() editable: boolean = true;
  @Output() update: EventEmitter<SessionItem> = new EventEmitter();
  unsubscribe$: Subject<any> = new Subject();
  form: FormGroup = this.fb.group({
    reps: 0,
    AMRAP: false,
    sets: 0,
    weight: '',
    intensity: new FormControl(''),
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
