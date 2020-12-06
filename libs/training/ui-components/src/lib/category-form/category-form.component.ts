import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, Exercise } from '@bod/shared/models';

@Component({
  selector: 'components-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormComponent implements OnInit {
  addCategory = false;
  @Input()
  exercise: Exercise;
  @Output() save: EventEmitter<{
    exercise: Exercise;
    category: Category;
  }> = new EventEmitter();
  @Output() delete: EventEmitter<{
    exercise: Exercise;
    categoryId: number;
  }> = new EventEmitter();
  categoryForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {}

  onSave(form) {
    this.save.emit({
      exercise: this.exercise,
      category: form.value,
    });
    this.toggleCategory();
  }

  onDeleteCategory(id) {
    this.delete.emit({
      exercise: this.exercise,
      categoryId: id,
    });
  }

  toggleCategory() {
    this.addCategory = !this.addCategory;

    this.categoryForm.get('name').setValue('');
  }
}
