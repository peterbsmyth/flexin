import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'training-checkbox-renderer',
  template: `
    <mat-checkbox
      #checkboxEl
      type="checkbox"
      (click)="checkedHandler($event)"
      [formControl]="checkbox"
    ></mat-checkbox>
  `,
})
export class CheckboxRenderer
  implements ICellRendererAngularComp, AfterViewInit {
  checkbox = new FormControl(false);
  @ViewChild('checkboxEl') checkboxEl;
  params: any;

  agInit(params: any): void {
    this.params = params;
    this.checkbox.setValue(params.data.amrap);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.checkboxEl.focus();
    });
  }

  checkedHandler(event) {
    const checked = event.target.checked;
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
