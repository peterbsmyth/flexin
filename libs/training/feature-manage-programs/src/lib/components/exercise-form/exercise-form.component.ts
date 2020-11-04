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
import { OnChange } from '@bod/shared/utils';

@Component({
  selector: 'training-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseFormComponent implements OnInit {
  @OnChange<Exercise>(function (data) {
    this.buildForm(data);
  })
  @Input()
  data: Exercise;
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

  buildForm(exercise: Exercise): void {
    const intensities = this.fb.array([]);
    exercise.intensities.forEach((intensity) => {
      const control = this.fb.group({
        name: this.fb.control(intensity ? intensity : ''),
      });
      intensities.push(control);
    });
    this.form.setControl('name', this.fb.control(exercise.name));
    this.form.setControl('push', this.fb.control(exercise.push));
    this.form.setControl('pull', this.fb.control(exercise.pull));
    this.form.setControl('leftRight', this.fb.control(exercise.leftRight));
    this.form.setControl('intensities', intensities);
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
