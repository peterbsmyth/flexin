import { SelectCellEditor } from '@ag-grid-enterprise/all-modules';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { environment } from '@bod/shared/environments';
import { Intensity } from '@bod/shared/models';
import { KeyCode, missing } from '@bod/shared/utils';
import * as Sentry from '@sentry/angular';
import { AppModule } from './app/app.module';

Sentry.init({
  dsn:
    'https://a692572efe53447c848ec17a43dd8ddd@o499269.ingest.sentry.io/5577591',
  autoSessionTracking: true,
  release: environment.version,
});

SelectCellEditor.prototype.init = function (params): void {
  this.focusAfterAttached = params.cellStartedEdit;

  if (missing(params.data.exercise.intensities)) {
    console.warn('ag-Grid: no values found for select cellEditor');
    return;
  }

  this.startedByEnter = params.keyPress === KeyCode.ENTER;

  let hasValue = false;

  params.data.exercise.intensities.forEach((intensity: Intensity) => {
    const option: {
      value: number;
      text?: number | string;
    } = {
      value: intensity.id,
    };

    const valueFormatted = intensity.name.toLowerCase();

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
