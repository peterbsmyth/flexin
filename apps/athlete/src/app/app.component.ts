import { Component } from '@angular/core';
import { version } from '../../package.json';

@Component({
  selector: 'bod-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  version: string = version;
}
