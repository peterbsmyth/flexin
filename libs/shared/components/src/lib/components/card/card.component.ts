import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'bod-card, [bod-card]',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CardComponent {
  @HostBinding('class') class = 'bod-card';
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'bod-card-header, [bod-card-header]',
})
export class CardHeaderDirective {
  @HostBinding('class') class = 'bod-card-header';
}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'bod-card-content, [bod-card-content]',
})
export class CardContentDirective {
  @HostBinding('class') class = 'bod-card-content';
}
