import { Component, OnInit, Input, OnChanges, SimpleChanges, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { tap, takeUntil, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SessionItemData } from '@bod/coaching/domain';


@Component({
  selector: 'coaching-session-item',
  templateUrl: './session-item.component.html',
  styleUrls: ['./session-item.component.scss']
})
export class SessionItemComponent implements OnInit, OnDestroy {
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
  public leftRight: boolean;

  private _data: SessionItemData;
  @Input()
  get data(): SessionItemData {
    return this._data;
  }
  set data(data: SessionItemData) {
    this._data = data;
    this.buildForm(data);
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

  @Output() update: EventEmitter<SessionItemData> = new EventEmitter();

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
      debounceTime(300),
      tap(value => {
        const data: SessionItemData = {
          ...this.data,
          sessionItem: {
            ...this.data.sessionItem,
            ...value
          }
        };
        this.update.emit(data);
      })
    ).subscribe();
  }

  buildForm(data) {
    this.form.get('reps').setValue(data.sessionItem.reps);
    this.form.get('AMRAP').setValue(data.sessionItem.AMRAP);
    this.form.get('sets').setValue(data.sessionItem.sets);
    this.form.get('leftRight').setValue(data.sessionItem.leftRight);
    this.form.get('weight').setValue(data.sessionItem.weight);
    this.form.get('intensity').setValue(data.sessionItem.intensity);
    this.form.get('tempo').setValue(data.sessionItem.tempo);
    this.leftRight = data.exercise.leftRight;
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
