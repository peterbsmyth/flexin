import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { Exercise } from '@bod/shared/models';
import { OnChange } from '@bod/shared/utils';

@Component({
  selector: 'components-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExerciseFormComponent implements OnInit {
  @OnChange<Exercise>(function (exercise) {
    this.buildForm(exercise);
  })
  @Input()
  exercise: Exercise;
  @Output() save: EventEmitter<Exercise> = new EventEmitter();
  form: FormGroup = this.fb.group({
    name: '',
    push: false,
    pull: false,
    leftRight: false,
    intensities: this.fb.array([]),
    categories: this.fb.array([]),
  });

  get intensities() {
    return <FormArray>this.form.get('intensities');
  }

  get categories() {
    return <FormArray>this.form.get('categories');
  }

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  buildForm(exercise: Exercise): void {
    const intensities = this.fb.array([]);
    const categories = this.fb.array([]);
    exercise.intensities.forEach((intensity) => {
      const control = this.fb.group({
        name: this.fb.control(intensity ? intensity.name : ''),
      });
      intensities.push(control);
    });
    exercise.categories.forEach((category) => {
      const control = this.fb.group({
        name: this.fb.control(category ? category.name : ''),
      });
      categories.push(control);
    });
    this.form.setControl('name', this.fb.control(exercise.name));
    this.form.setControl('leftRight', this.fb.control(exercise.leftRight));
    this.form.setControl('intensities', intensities);
    this.form.setControl('categories', categories);
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

  addCategory() {
    this.categories.push(
      this.fb.group({
        name: this.fb.control(''),
      })
    );
  }

  onRemoveCategory(index: number) {
    this.categories.removeAt(index);
  }

  onSubmit(form) {
    this.save.emit({
      ...form,
      intensities: form.intensities.map((i) => i.name),
      categories: form.categories.map((i) => i.name),
      id: this.exercise ? this.exercise.id : undefined,
    });
  }
}
