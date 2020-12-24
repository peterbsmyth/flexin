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
  private columnDefsSubject: BehaviorSubject<any[]> = new BehaviorSubject([
    {
      field: 'exercise',
      editable: false,
      valueGetter(params) {
        return params.data.exercise.name;
      },
      onCellClicked: (params) => {
        this.updateExercise.emit(params.data);
      },
    },
    { field: 'day', editable: false, width: 80 },
    {
      field: 'order',
      editable: false,
      width: 80,
    },
    {
      field: 'setCount',
      editable: true,
      width: 80,
    },
    { field: 'reps', width: 80 },
    {
      field: 'amrap',
      width: 80,
      cellRenderer: 'checkboxRenderer',
      cellEditor: 'checkboxRenderer',
      valueSetter: (params) => {
        const columnDefs = this.columnDefsSubject.getValue().slice(0);
        const repsColumn = columnDefs[4];
        const amrap = params.newValue;
        params.data.amrap = amrap;
        params.data.reps = amrap ? 0 : params.data.reps;
        repsColumn.editable = !amrap;
        this.columnDefsSubject.next(columnDefs);
        return true;
      },
    },
    { field: 'weight', width: 100 },
    {
      field: 'intensity',
      width: 100,
      editable: true,
      valueSetter: (params) => {
        params.data['intensityId'] = params.newValue;
        return true;
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
        const displayIntensity = intensities.find((i) => i.id === intensityId)
          .name;
        return displayIntensity;
      },
      cellEditor: 'agSelectCellEditor',
    },
    {
      field: 'tempo',
      flex: 1,
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

  defaultColDef = {
    editable: true,
    resizable: true,
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
