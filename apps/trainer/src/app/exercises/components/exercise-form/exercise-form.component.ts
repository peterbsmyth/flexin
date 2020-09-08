import { Component, OnInit, Inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Exercise } from '@bod/shared/models';

@Component({
  selector: 'bod-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss']
})
export class ExerciseFormComponent implements OnInit {
  @Output() save: EventEmitter<Exercise> = new EventEmitter();
  form: FormGroup = this.fb.group({
    name: '',
    pull: false,
    push: false
  });

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this.save.emit(form);
  }
}
