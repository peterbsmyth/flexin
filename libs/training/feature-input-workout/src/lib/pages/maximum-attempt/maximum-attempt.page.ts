import { Component, OnInit } from '@angular/core';
import { MaxAttemptItem } from '@bod/shared/models';

@Component({
  templateUrl: './maximum-attempt.page.html',
  styleUrls: ['./maximum-attempt.page.scss'],
})
export class MaximumAttemptPage implements OnInit {
  maximumAttempt: MaxAttemptItem = {
    id: 1,
    exercise: 1,
    bestAttempt: true,
    reps: 8,
    weight: 35,
    intensity: 'full',
  };

  constructor() {}

  ngOnInit(): void {}
}
