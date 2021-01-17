import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Category, Exercise } from '@bod/shared/models';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import {MatAutocompleteSelectedEvent, MatAutocomplete} from '@angular/material/autocomplete';
import { Observable } from 'rxjs'; 




@Component({
  selector: 'components-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormComponent {
  addCategory = false;
  @Input()
  exercise: Exercise;
  @Input() categories: Category[];
  @Output() save: EventEmitter<Category> = new EventEmitter();
  @Output() delete: EventEmitter<Category> = new EventEmitter();
  categoryForm: FormGroup = this.fb.group({
    id: [null, Validators.required],
  });
  //chip separators
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('categoryInput') categoryInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;
  constructor(private fb: FormBuilder) {}

  onSave(form) {
    const category = this.categories.find(
      (category) => category.id === form.value.id
    );
    this.save.emit(category);
    this.toggleCategory();
  }

  onDeleteCategory(id) {
    const category = this.categories.find((category) => category.id === id);
    this.delete.emit(category);
  }

  toggleCategory() {
    this.addCategory = !this.addCategory;

    this.categoryForm.get('id').setValue('');
  }

  displayWith = (id: number): string => {
    return this.categories.find((category) => category.id === id)?.name ?? '';
  };

}
