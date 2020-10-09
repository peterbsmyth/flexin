import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'training-maximum-attempt-card',
  templateUrl: './maximum-attempt-card.component.html',
  styleUrls: ['./maximum-attempt-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MaximumAttemptCardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
