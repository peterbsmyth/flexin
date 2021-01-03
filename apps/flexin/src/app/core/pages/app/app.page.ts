import { Component } from '@angular/core';
import { environment } from '@bod/shared/environments';

@Component({
  selector: 'bod-root',
  templateUrl: './app.page.html',
  styleUrls: ['./app.page.scss'],
})
export class AppPage {
  version: string = environment.version;
}
