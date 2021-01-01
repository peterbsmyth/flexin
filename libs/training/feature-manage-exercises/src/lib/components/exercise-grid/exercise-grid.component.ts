import { AllModules } from '@ag-grid-enterprise/all-modules';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from '@bod/shared/models';

@Component({
  selector: 'training-exercise-grid',
  templateUrl: './exercise-grid.component.html',
  styleUrls: ['./exercise-grid.component.scss'],
})
export class ExerciseGridComponent {
  modules = AllModules;
  defaultColDef = {
    editable: false,
    resizable: true,
    onCellClicked: (params) => {
      this.updateExercise.emit(params.data);
    },
    suppressMovable: true,
  };
  columnDefs = [
    {
      field: 'exercise',
      valueGetter(params) {
        return params.data.name;
      },
      flex: 1,
      filter: true,
    },
    { field: 'measuredBy' },
  ];

  @Input()
  exercises: Exercise[];

  @Output()
  updateExercise: EventEmitter<Exercise> = new EventEmitter();
}
