import { AfterViewInit, Component, ViewChild } from '@angular/core';

import { ICellRendererAngularComp } from '@ag-grid-community/angular';
import { FormControl } from '@angular/forms';
import { Intensity } from '@bod/shared/models';

@Component({
  selector: 'training-select-renderer',
  template: `
    <mat-form-field>
      <mat-select [formControl]="select" #selectEl>
        <mat-option
          *ngFor="let intensity of intensities"
          [value]="intensity.id"
        >
          {{ intensity.name }}
        </mat-option>
      </mat-select>
    </mat-form-field>
  `,
})
export class SelectEditor implements ICellRendererAngularComp, AfterViewInit {
  intensities: Intensity[];
  @ViewChild('selectEl') selectEl;
  select = new FormControl();
  params: any;

  agInit(params: any): void {
    this.params = params;
    this.intensities = params.data.exercise.intensities;
    this.select.setValue(this.intensities[0].id);
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.selectEl.focus();
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

  isPopup() {
    return true;
  }

  getValue() {
    return this.select.value;
  }
}
