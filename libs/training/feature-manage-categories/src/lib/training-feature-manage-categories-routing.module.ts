import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryLoadedGuard } from './guards/category-loaded.guard';
import { CategoriesPage } from './pages/categories/categories.page';
import { CategoryCreatePage } from './pages/category-create/category-create.page';
import { CategoryPage } from './pages/category/category.page';

const routes: Routes = [
  { path: 'categories', component: CategoriesPage },
  { path: 'categories/create', component: CategoryCreatePage },
  {
    path: 'categories/:categoryId',
    component: CategoryPage,
    canActivate: [CategoryLoadedGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainingFeatureManageCategoriessRoutingModule {}
