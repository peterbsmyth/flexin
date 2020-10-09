import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { tap, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'training-maximum-attempt-form',
  templateUrl: './maximum-attempt-form.component.html',
  styleUrls: ['./maximum-attempt-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaximumAttemptFormComponent implements OnInit {
  myForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.myForm = this.fb.group({
      exerciseId: new FormControl('', [Validators.min(1), Validators.max(999)]),
      exerciseName: new FormControl('', [Validators.required]),
      numberOfReps: new FormControl('', [
        Validators.min(1),
        Validators.max(999),
      ]),
      bestAttempt: new FormControl(false),
    });

    this.myForm.valueChanges
      .pipe(
        debounceTime(3000),
        tap((data) => console.log(data))
      )
      .subscribe();
  }

  onClick(form: FormGroup) {
    console.log(form.value);
  }
}
