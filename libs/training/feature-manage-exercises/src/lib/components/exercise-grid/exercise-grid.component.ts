import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Exercise } from '@bod/shared/models';

@Component({
  selector: 'training-exercise-grid',
  templateUrl: './exercise-grid.component.html',
  styleUrls: ['./exercise-grid.component.scss'],
})
export class ExerciseGridComponent {
  defaultColDef = {
    editable: false,
    resizable: true,
    onCellClicked: (params) => {
      this.updateExercise.emit(params.data);
    },
  };
  columnDefs = [
    {
      field: 'exercise',
      valueGetter(params) {
        return params.data.name;
      },
      flex: 1,
    },
    { field: 'measuredBy' },
  ];

  @Input()
  exercises: Exercise[];

  @Output()
  updateExercise: EventEmitter<Exercise> = new EventEmitter();
}
