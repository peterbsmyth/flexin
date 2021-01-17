import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Category, Exercise } from '@bod/shared/models';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'components-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CategoryFormComponent implements OnDestroy {
  unsubscribe = new Subject();
  @Input()
  exercise: Exercise;
  @Input() categories: Category[];
  @Output() save: EventEmitter<Category> = new EventEmitter();
  @Output() delete: EventEmitter<Category> = new EventEmitter();
  categoryForm: FormGroup = this.fb.group({
    id: [null, Validators.required],
  });

  constructor(private fb: FormBuilder) {
    this.categoryForm
      .get('id')
      .valueChanges.pipe(
        takeUntil(this.unsubscribe),
        tap((id) => {
          const category = this.categories.find(
            (category) => category.id === id
          );
          this.save.emit(category);
        })
      )
      .subscribe();
  }

  onDeleteCategory(id) {
    const category = this.categories.find((category) => category.id === id);
    this.delete.emit(category);
  }

  displayWith = (id: number): string => {
    return this.categories.find((category) => category.id === id)?.name ?? '';
  };

  ngOnDestroy() {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
