import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'training-action-bar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActionBarComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
