import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesFacade, loadCategories } from '@bod/training/domain';

@Component({
  templateUrl: './categories.page.html',
  styleUrls: ['./categories.page.scss'],
})
export class CategoriesPage implements OnInit {
  constructor(
    public categoriesState: CategoriesFacade,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoriesState.dispatch(loadCategories());
  }

  onUpdate(category) {
    this.router.navigate(['/categories', category.id]);
  }
}
