import {
  Component,
  OnInit,
  Inject,
  Output,
  EventEmitter,
  Input,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Exercise } from '@bod/shared/models';

@Component({
  selector: 'coaching-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseFormComponent implements OnInit {
  private _data: Exercise;
  @Input()
  get data(): Exercise {
    return this._data;
  }
  set data(exercise: Exercise) {
    this._data = exercise;
    this.form = this.buildForm(exercise);
  }
  @Output() save: EventEmitter<Exercise> = new EventEmitter();
  form: FormGroup = this.fb.group({
    name: '',
    push: false,
    pull: false,
    leftRight: false,
    intensities: this.fb.array([]),
  });

  get intensities() {
    return <FormArray>this.form.get('intensities');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  buildForm(exercise: Exercise) {
    const intensities = this.fb.array([]);
    exercise.intensities.forEach((intensity) => {
      const control = this.fb.group({
        name: this.fb.control(intensity ? intensity : ''),
      });
      intensities.push(control);
    });
    return this.fb.group({
      name: this.fb.control(exercise.name),
      push: this.fb.control(exercise.push),
      pull: this.fb.control(exercise.pull),
      leftRight: this.fb.control(exercise.leftRight),
      intensities,
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
      intensities: form.intensities.map((i) => i.name),
      id: this.data ? this.data.id : undefined,
    });
  }
}
