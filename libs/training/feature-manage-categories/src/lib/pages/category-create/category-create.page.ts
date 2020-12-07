import { Component, OnInit } from '@angular/core';
import { CategoriesFacade, saveCategory } from '@bod/training/domain';

@Component({
  templateUrl: './category-create.page.html',
  styleUrls: ['./category-create.page.scss'],
})
export class CategoryCreatePage implements OnInit {
  constructor(private categoriesState: CategoriesFacade) {}

  ngOnInit(): void {}

  onSave(category) {
    this.categoriesState.dispatch(saveCategory({ category }));
  }
}
