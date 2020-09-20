import { Component } from '@angular/core';
import { version } from '../../../../../package.json';

@Component({
  selector: 'bod-root',
  templateUrl: './app.page.html',
  styleUrls: ['./app.page.scss'],
})
export class AppPage {
 version: string = version;
}
