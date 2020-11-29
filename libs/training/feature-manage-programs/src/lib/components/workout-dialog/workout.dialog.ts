import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { WorkoutFormData } from '@bod/training/domain';

@Component({
  selector: 'training-workout-dialog',
  templateUrl: './workout.dialog.html',
  styleUrls: ['./workout.dialog.scss'],
})
export class WorkoutDialog implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<WorkoutDialog>,
    @Inject(MAT_DIALOG_DATA) public data: WorkoutFormData
  ) {}

  ngOnInit(): void {}

  onSave(data) {
    this.dialogRef.close({ save: data });
  }

  onSavePlus(data) {
    this.dialogRef.close({ savePlus: data });
  }

  onCancel() {
    this.dialogRef.close();
  }
}
