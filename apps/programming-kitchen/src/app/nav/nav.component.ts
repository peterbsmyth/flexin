import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ExerciseFormComponent } from '../exercise-form/exercise-form.component';

@Component({
  selector: 'bod-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  onClickAddExercise() {
    this.dialog.open(ExerciseFormComponent);
  }
}
