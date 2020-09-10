import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  SessionItem,
  SessionItemStatistic,
  SetStatistic,
  Exercise,
} from '@bod/shared/models';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { SessionItemCardData, SessionItemCardOutput } from '@bod/training/domain';

@Component({
  selector: 'bod-session-item-card',
  templateUrl: './session-item-card.component.html',
  styleUrls: ['./session-item-card.component.scss'],
})
export class SessionItemCardComponent implements OnInit {
  private _data: SessionItemCardData;
  @Input()
  get data(): SessionItemCardData {
    return this._data;
  }
  set data(data: SessionItemCardData) {
    this._data = data;
    this.form = this.buildForm(data);
  }
  @Output() save: EventEmitter<SessionItemCardOutput> = new EventEmitter();
  form: FormGroup = this.fb.group({});

  get sets() {
    return <FormArray>this.form.get('sets');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  /**
   * arrayOfCount is used to turn the amount of sets into an array
   * @param n length of the Array
   */
  arrayOfCount(n: number): any[] {
    return Array(n).fill(null);
  }

  /**
   * onChangeCount
   * @param action either '+' or '-' for add or subtract
   * @param control name of a formcontrol
   * @param index if there is an index, the control references a property on 'sets' if not it represents a property on 'form'
   */
  onChangeCount(action: string, control: string, index?: number) {
    const formControl: FormControl = Number.isInteger(index)
      ? <FormControl>this.sets.controls[index].get(control)
      : <FormControl>this.form.get(control);
    const { value } = formControl;

    if (action === '-') {
      formControl.setValue(value - 1);
    } else if (action === '+') {
      formControl.setValue(value + 1);
    }
  }

  /**
   * buildForm
   * Each time the session item changes the form needs to be reset according to the dictates of the session item
   * and related statistics
   * @param data { SessionItemCardData };
   */
  buildForm(data: SessionItemCardData): FormGroup {
    const rpe = data.sessionItemStatistic && data.sessionItemStatistic.rpe;
    const notes = data.sessionItemStatistic && data.sessionItemStatistic.notes;
    const sets = this.fb.array([]);
    this.arrayOfCount(data.sessionItem.sets).forEach((s, i) => {
      const hasSetStatistic = !!data.setStatistics[i];
      const setReps = hasSetStatistic && data.setStatistics[i].reps;
      const setWeight = hasSetStatistic && data.setStatistics[i].weight;
      const control = this.fb.group({
        set: i + 1,
        reps: this.fb.control(setReps ? setReps : null),
        weight: this.fb.control(setWeight ? setWeight : null),
      });
      sets.push(control);
    });
    return this.fb.group({
      sets,
      rpe: this.fb.control(rpe ? rpe : null),
      notes: this.fb.control(notes ? notes : ''),
    });
  }

  onSave(value: {
    rpe: number;
    notes: string;
    sets: {
      id?: number;
      set: number;
      reps: number;
      weight: number;
    }[];
  }) {
    const output: SessionItemCardOutput = {
      sessionItemStatistic: {
        id: this.data.sessionItemStatistic.id,
        rpe: value.rpe,
        notes: value.notes
      },
      setStatistics: value.sets.map((s, i) => ({
        id: this.data.setStatistics[i] && this.data.setStatistics[i].id,
        ...s,
      })).filter(s => s.reps)
    };
    this.save.emit(output);
  }
}
