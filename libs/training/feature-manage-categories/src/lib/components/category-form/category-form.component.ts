import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Category } from '@bod/shared/models';
import { OnChange } from '@bod/shared/utils';

@Component({
  selector: 'training-category-form',
  templateUrl: './category-form.component.html',
  styleUrls: ['./category-form.component.scss'],
})
export class CategoryFormComponent implements OnInit {
  @OnChange(function (category) {
    this.buildForm(category);
  })
  @Input()
  category: Category;
  @Output() save: EventEmitter<Category> = new EventEmitter();
  form = this.fb.group({
    name: '',
  });
  constructor(private fb: FormBuilder) {}

  buildForm(category: Category) {
    this.form.get('name').setValue(category.name);
  }

  onSave(form) {
    this.save.emit({ ...form.value, id: this.category?.id });
  }

  ngOnInit(): void {}
}
