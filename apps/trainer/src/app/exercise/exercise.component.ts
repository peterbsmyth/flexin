import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exercise } from '@bod/models';

@Component({
  selector: 'bod-exercise',
  templateUrl: './exercise.component.html',
  styleUrls: ['./exercise.component.scss']
})
export class ExerciseComponent implements OnInit {
  @Input() exercise: Exercise;
  @Input() closeable: boolean = true;
  @Output() close: EventEmitter<Exercise> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  onClose() {
    this.close.emit(this.exercise);
  }

}
