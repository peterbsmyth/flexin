import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesFacade, saveCategory } from '@bod/training/domain';

@Component({
  templateUrl: './category-create.page.html',
  styleUrls: ['./category-create.page.scss'],
})
export class CategoryCreatePage {
  constructor(
    private categoriesState: CategoriesFacade,
    private router: Router
  ) {}

  onSave(category) {
    this.categoriesState.dispatch(saveCategory({ category }));
    this.router.navigate(['/categories']);
  }
}
