import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exercise } from '@bod/shared/models';
import { OnChange } from '@bod/shared/utils';

@Component({
  selector: 'components-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseFormComponent {
  @OnChange<Exercise>(function (exercise) {
    this.buildForm(exercise);
  })
  @Input()
  exercise: Exercise;
  @Output() save: EventEmitter<Exercise> = new EventEmitter();
  exerciseForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    leftRight: false,
    measuredBy: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  buildForm(exercise: Exercise): void {
    this.exerciseForm.setControl('name', this.fb.control(exercise.name));
    this.exerciseForm.setControl(
      'leftRight',
      this.fb.control(exercise.leftRight)
    );
    this.exerciseForm.setControl(
      'measuredBy',
      this.fb.control(exercise.measuredBy)
    );
  }

  onSave(form) {
    this.save.emit({
      ...form.value,
      id: this.exercise ? this.exercise.id : undefined,
    });
  }
}
