import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Exercise } from '@bod/shared/models';

@Component({
  selector: 'bod-exercise-card',
  templateUrl: './exercise-card.component.html',
  styleUrls: ['./exercise-card.component.scss'],
})
export class ExerciseCardComponent implements OnInit {
  @Input() exercise: Exercise;
  @Input() closeable = true;
  @Output() remove: EventEmitter<Exercise> = new EventEmitter();
  constructor() {}

  ngOnInit(): void {}

  onRemove() {
    this.remove.emit();
  }
}
