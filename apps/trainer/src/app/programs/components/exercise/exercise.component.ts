import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exercise } from '@bod/shared/models';

@Component({
  selector: 'bod-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {
  @Input() exercise: Exercise;
  @Input() closeable = true;
  @Output() remove: EventEmitter<Exercise> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onRemove() {
    this.remove.emit(this.exercise);
  }

}
