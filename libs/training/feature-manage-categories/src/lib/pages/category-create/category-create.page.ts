import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesFacade, saveCategory } from '@bod/training/domain';

@Component({
  templateUrl: './category-create.page.html',
  styleUrls: ['./category-create.page.scss'],
})
export class CategoryCreatePage implements OnInit {
  constructor(
    private categoriesState: CategoriesFacade,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSave(category) {
    this.categoriesState.dispatch(saveCategory({ category }));
    this.router.navigate(['/categories']);
  }
}
