import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { SessionItem } from '@bod/models';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { tap, takeUntil, distinctUntilChanged } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'bod-session-item',
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.scss']
})
export class SessionItemComponent implements OnInit, OnDestroy {
  public leftRight: boolean;
  private _item: SessionItem;
  @Input()
  get item(): SessionItem {
    return this._item;
  };
  set item(item) {
    this._item = item;
    this.form.get('reps').setValue(item.reps);
    this.form.get('AMRAP').setValue(item.AMRAP);
    this.form.get('sets').setValue(item.sets);
    this.form.get('leftRight').setValue(item.leftRight);
    this.form.get('weight').setValue(item.weight);
    this.form.get('intensity').setValue(item.intensity);
    this.form.get('tempo').setValue(item.tempo);
    this.leftRight = item.exercise.leftRight;
  }

  private _editable = true;
  @Input()
  get editable() {
    return this._editable;
  }
  set editable(editable) {
    if (!editable) {
      this.disableInputs();
    } else {
      this.enableInputs();
    }
  }

  @Output() update: EventEmitter<SessionItem> = new EventEmitter();
  unsubscribe$: Subject<any> = new Subject();
  form: FormGroup = this.fb.group({
    reps: 0,
    AMRAP: false,
    sets: 0,
    weight: '',
    intensity: new FormControl(''),
    tempo: '',
    leftRight: false
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

  disableInputs() {
    this.form.disable();
  }

  enableInputs() {
    this.form.enable();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
