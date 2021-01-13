import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exercise, Intensity } from '@bod/shared/models';

@Component({
  selector: 'components-intensity-form',
  templateUrl: './intensity-form.component.html',
  styleUrls: ['./intensity-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IntensityFormComponent {
  addIntensity = false;

  @Input()
  exercise: Exercise;
  @Output() save: EventEmitter<{
    exercise: Exercise;
    intensity: Intensity;
  }> = new EventEmitter();
  @Output() delete: EventEmitter<{
    exercise: Exercise;
    intensityId: number;
  }> = new EventEmitter();

  intensityForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    order: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  onSave(form) {
    this.save.emit({
      exercise: this.exercise,
      intensity: form.value,
    });
    this.toggleIntensity();
  }

  onDelete(id) {
    this.delete.emit({
      exercise: this.exercise,
      intensityId: id,
    });
  }

  toggleIntensity() {
    this.addIntensity = !this.addIntensity;

    this.intensityForm.get('name').setValue('');
    this.intensityForm.reset();
  }

  drop(event: CdkDragDrop<Intensity[]>) {
    moveItemInArray(
      this.exercise.intensities,
      event.previousIndex,
      event.currentIndex
    );
  }
}
