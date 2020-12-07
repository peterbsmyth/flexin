import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { BodComponentsModule } from '@bod/shared/components';
import { TrainingDomainModule } from '@bod/training/domain';
import { TrainingUiComponentsModule } from '@bod/training/ui-components';
import { AgGridModule } from 'ag-grid-angular';
import { CategoryFormComponent } from './components/category-form/category-form.component';
import { CategoryGridComponent } from './components/category-grid/category-grid.component';
import { CategoriesPage } from './pages/categories/categories.page';
import { CategoryCreatePage } from './pages/category-create/category-create.page';
import { CategoryPage } from './pages/category/category.page';
import { TrainingFeatureManageCategoriessRoutingModule } from './training-feature-manage-categories-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TrainingDomainModule,
    BodComponentsModule,
    TrainingUiComponentsModule,
    TrainingFeatureManageCategoriessRoutingModule,
    AgGridModule.withComponents([]),
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
  ],
  declarations: [
    CategoriesPage,
    CategoryGridComponent,
    CategoryCreatePage,
    CategoryPage,
    CategoryFormComponent,
  ],
  exports: [],
})
export class TrainingFeatureManageCategoriesModule {}
