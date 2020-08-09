import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExerciseService } from '@bod/data';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'bod-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit {
  form: FormGroup = this.fb.group({
    name: '',
    pull: false,
    push: false
  });

  constructor(
    private fb: FormBuilder,
    private exerciseService: ExerciseService,
    // public dialogRef: MatDialogRef<ExerciseFormComponent>,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this.exerciseService.save(form);
    // this.dialogRef.close();
  }

}
