import { Component, OnInit, Input } from '@angular/core';
import { Exercise } from '@bod/models';

@Component({
  selector: 'bod-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.css']
})
export class ExerciseComponent implements OnInit {
  @Input() exercise: Exercise;
  constructor() { }

  ngOnInit(): void {
  }

}
