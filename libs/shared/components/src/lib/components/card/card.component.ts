import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
  Directive,
} from '@angular/core';

@Component({
  selector: 'bod-card, [bod-card]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent implements OnInit {
  @HostBinding('class') class = 'bod-card';
  constructor() {}

  ngOnInit(): void {}
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'bod-card-header, [bod-card-header]',
})
export class CardHeader {
  @HostBinding('class') class = 'bod-card-header';
}

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'bod-card-content, [bod-card-content]',
})
export class CardContent {
  @HostBinding('class') class = 'bod-card-content';
}
