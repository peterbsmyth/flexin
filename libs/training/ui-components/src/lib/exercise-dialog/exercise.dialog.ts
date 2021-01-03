import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Exercise } from '@bod/shared/models';

@Component({
  templateUrl: './exercise.dialog.html',
  styleUrls: ['./exercise.dialog.scss'],
})
export class ExerciseDialog {
  constructor(
    public dialogRef: MatDialogRef<ExerciseDialog>,
    @Inject(MAT_DIALOG_DATA) public exercise: Exercise
  ) {}

  onSave(data) {
    this.dialogRef.close(data);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
