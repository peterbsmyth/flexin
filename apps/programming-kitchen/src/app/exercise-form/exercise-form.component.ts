import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ExerciseService } from '../exercise.service';
import { Router } from '@angular/router';

@Component({
  selector: 'bod-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.css']
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
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form) {
    this.exerciseService.save(form);
    this.router.navigateByUrl('');
  }

}
