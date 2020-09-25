import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { SessionItemFormData } from '@bod/coaching/domain';
import { FormArray, FormGroup, FormBuilder } from '@angular/forms';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'coaching-session-item-form',
  templateUrl: './session-item-form.component.html',
  styleUrls: ['./session-item-form.component.scss'],
})
export class SessionItemFormComponent implements OnInit, OnDestroy {
  unsubscribe$: Subject<any> = new Subject();

  private _data: SessionItemFormData;
  @Input()
  get data(): SessionItemFormData {
    return this._data;
  }
  set data(data: SessionItemFormData) {
    this._data = data;
    this.form = this.buildForm(data);
  }
  @Output() save: EventEmitter<SessionItemFormData> = new EventEmitter();
  form: FormGroup = this.fb.group({
    reps: 0,
    AMRAP: false,
    leftRight: false,
    sets: false,
    weight: 0,
    weightUnit: 'lbs',
    intensity: '',
    tempo: '',
    order: null
  });

  get intensities() {
    return <FormArray>this.form.get('intensities');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.form.get('AMRAP').valueChanges.pipe(
      takeUntil(this.unsubscribe$),
      tap(amrap => {
        if (amrap) {
          this.form.get('reps').setValue(0);
          this.form.get('reps').disable();
        } else {
          this.form.get('reps').setValue(this.data.sessionItem.reps);
          this.form.get('reps').enable();
        }
      })
    ).subscribe();
  }

  buildForm(data: SessionItemFormData) {
    return this.fb.group({
      reps: this.fb.control(data.sessionItem.reps),
      AMRAP: this.fb.control(data.sessionItem.AMRAP),
      leftRight: this.fb.control(false),
      sets: this.fb.control(data.sessionItem.sets),
      weight: this.fb.control(data.sessionItem.weight),
      weightUnit: 'lbs',
      intensity: this.fb.control(data.sessionItem.intensity),
      tempo: this.fb.control(data.sessionItem.tempo),
    });
  }

  addIntensity() {
    this.intensities.push(
      this.fb.group({
        name: this.fb.control(''),
      })
    );
  }

  onRemoveIntensity(index: number) {
    this.intensities.removeAt(index);
  }

  onSubmit(form) {
    this.save.emit({
      ...form,
      id: this.data.sessionItem.id,
      order: this.data.sessionItem.order
    });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
