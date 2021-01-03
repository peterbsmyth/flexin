import { AllModules } from '@ag-grid-enterprise/all-modules';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Workout } from '@bod/shared/models';
import { BehaviorSubject } from 'rxjs';
import { CheckboxRenderer } from './checkbox-renderer/checkbox.renderer';

@Component({
  selector: 'training-workout-configuration-grid',
  templateUrl: './workout-configuration-grid.component.html',
  styleUrls: ['./workout-configuration-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkoutConfigurationGridComponent {
  modules = AllModules;
  private columnDefsSubject: BehaviorSubject<any[]> = new BehaviorSubject([
    {
      field: 'exercise',
      editable: false,
      flex: 2,
      valueGetter(params) {
        return params.data.exercise.name;
      },
      onCellClicked: (params) => {
        this.updateExercise.emit(params.data);
      },
    },
    { field: 'day', editable: false },
    {
      field: 'order',
      editable: false,
    },
    {
      field: 'setCount',
      editable: true,
    },
    { field: 'reps', headerName: 'Reps / Secs' },
    {
      field: 'amrap',
      headerName: 'AMRAP',
      cellRenderer: 'checkboxRenderer',
      cellEditor: 'checkboxRenderer',
      valueSetter: (params) => {
        const isTrue = params.newValue === 'true' || params.newValue === true;
        const isFalse =
          params.newValue === 'false' || params.newValue === false;
        const isValid = isTrue || isFalse;

        if (isValid) {
          const columnDefs = this.columnDefsSubject.getValue().slice(0);
          const repsColumn = columnDefs[4];
          const amrap = isTrue;
          params.data.amrap = amrap;
          params.data.reps = amrap ? 0 : params.data.reps;
          repsColumn.editable = !amrap;
          this.columnDefsSubject.next(columnDefs);
          return true;
        }

        return false;
      },
    },
    { field: 'weight' },
    {
      field: 'intensityId',
      headerName: 'Intensity',
      flex: 2,
      editable: true,
      valueSetter: (params) => {
        const valueAsNumber = +params.newValue;
        const intensities = params.data.exercise.intensities ?? [];
        const hasIntensity = intensities.some(
          (intensity) => intensity.id === valueAsNumber
        );

        if (hasIntensity) {
          const property = params.colDef.field;
          params.data[property] = valueAsNumber;
          return true;
        }

        this.errorMessage.emit(
          `Could not set intensity for ${params.data.exercise.name}.`
        );
        return false;
      },
      valueGetter(params) {
        const intensityId = params.data.intensityId;
        const intensities = params.data.exercise.intensities ?? [];
        if (intensityId) {
          return intensityId;
        }
        params.data.intensityId = intensities?.[0]?.id;
        return intensities?.[0]?.id;
      },
      valueFormatter(params) {
        const intensityId = params.value;
        const intensities = params.data.exercise.intensities ?? [];
        const displayIntensity = intensities
          .find((i) => i.id === intensityId)
          .name.toLowerCase();
        return displayIntensity;
      },
      cellEditor: 'agSelectCellEditor',
    },
    {
      field: 'tempo',
      valueSetter: (params) => {
        params.data['tempo'] = params.newValue;
        return true;
      },
    },
  ]);
  columnDefs$ = this.columnDefsSubject.asObservable();

  @Input()
  workouts: Workout[];

  @Output()
  update: EventEmitter<Workout> = new EventEmitter();
  @Output()
  updateExercise: EventEmitter<Workout> = new EventEmitter();
  @Output() errorMessage: EventEmitter<string> = new EventEmitter();

  defaultColDef = {
    editable: true,
    flex: 1,
    resizable: true,
    suppressMovable: true,
    valueSetter: function (params) {
      const valueAsNumber = +params.newValue;
      const isInteger = Number.isInteger(valueAsNumber);

      if (isInteger) {
        const property = params.colDef.field;
        params.data[property] = valueAsNumber;
        return true;
      }
      return false;
    },
  };
  frameworkComponents = {
    checkboxRenderer: CheckboxRenderer,
  };

  onCellValueChanged(cell) {
    this.update.emit(cell.data);
  }
}
