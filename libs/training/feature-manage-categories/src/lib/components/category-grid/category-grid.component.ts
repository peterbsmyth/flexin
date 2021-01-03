import { AllModules } from '@ag-grid-enterprise/all-modules';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '@bod/shared/models';

@Component({
  selector: 'training-category-grid',
  templateUrl: './category-grid.component.html',
  styleUrls: ['./category-grid.component.scss'],
})
export class CategoryGridComponent {
  modules = AllModules;
  @Input() categories: Category[];
  @Output() update: EventEmitter<Category> = new EventEmitter();

  columnDefs = [
    {
      field: 'name',
      onCellClicked: (params) => {
        this.update.emit(params.data);
      },
    },
  ];

  defaultColDef = {
    editable: false,
    flex: 1,
    suppressMovable: true,
  };
}
