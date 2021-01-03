import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '@bod/shared/models';
import { CategoriesFacade, patchCategory } from '@bod/training/domain';

@Component({
  templateUrl: './category.page.html',
  styleUrls: ['./category.page.scss'],
})
export class CategoryPage {
  constructor(public categoryState: CategoriesFacade, private router: Router) {}

  onSave(category: Category) {
    this.categoryState.dispatch(patchCategory({ category }));
    this.router.navigate(['/categories']);
  }
}
