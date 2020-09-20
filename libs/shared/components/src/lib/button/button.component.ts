import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bod-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() icon = false;
  @Input() disabled = false;
  constructor() { }

  ngOnInit(): void {
  }

}
