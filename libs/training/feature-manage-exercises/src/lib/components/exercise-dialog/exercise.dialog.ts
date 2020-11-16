import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ExerciseV2 } from '@bod/shared/models';

@Component({
  templateUrl: './exercise.dialog.html',
  styleUrls: ['./exercise.dialog.scss'],
})
export class ExerciseDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<ExerciseDialog>,
    @Inject(MAT_DIALOG_DATA) public exercise: ExerciseV2
  ) {}

  ngOnInit(): void {}

  onSave(data) {
    this.dialogRef.close(data);
  }

  onCancel() {
    this.dialogRef.close();
  }
}
