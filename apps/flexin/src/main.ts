import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '@bod/shared/environments';
import { KeyCode, missing } from '@bod/shared/utils';
import { SelectCellEditor } from 'ag-grid-community';
import { AppModule } from './app/app.module';

SelectCellEditor.prototype.init = function (params): void {
  this.focusAfterAttached = params.cellStartedEdit;

  if (missing(params.data.exercise.intensities)) {
    console.warn('ag-Grid: no values found for select cellEditor');
    return;
  }

  this.startedByEnter = params.keyPress === KeyCode.ENTER;

  let hasValue = false;

  params.data.exercise.intensities.forEach((intensity: any) => {
    const option: any = { value: intensity.id };

    const valueFormatted = intensity.name;

    const valueFormattedExits =
      valueFormatted !== null && valueFormatted !== undefined;
    option.text = valueFormattedExits ? valueFormatted : intensity.id;

    this.eSelect.addOption(option);
    hasValue = hasValue || params.value === intensity.id;
  });

  if (hasValue) {
    this.eSelect.setValue(params.value, true);
  } else if (params.values.length) {
    this.eSelect.setValue(params.values[0], true);
  }

  // we don't want to add this if full row editing, otherwise selecting will stop the
  // full row editing.
  if (!this.gridOptionsWrapper.isFullRowEdit()) {
    this.eSelect.onValueChange(() => params.stopEditing());
  }
};

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
