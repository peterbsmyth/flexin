import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'training-checkbox-renderer',
  template: `
    <mat-checkbox
      #checkboxEl
      type="checkbox"
      (click)="checkedHandler(!checkbox.value)"
      [formControl]="checkbox"
    ></mat-checkbox>
  `,
})
export class CheckboxRenderer implements ICellRendererAngularComp {
  checkbox = new FormControl(false);
  @ViewChild('checkboxEl') checkboxEl;
  params;

  agInit(params): void {
    this.params = params;
    this.checkbox.setValue(params.data.amrap);
  }

  checkedHandler(checked) {
    const colId = this.params.column.colId;
    this.params.node.setDataValue(colId, checked);
  }

  refresh() {
    return false;
  }

  getValue() {
    return this.checkbox.value;
  }
}
