import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'coaching-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoardComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
