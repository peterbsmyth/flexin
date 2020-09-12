import { Component, OnInit} from '@angular/core';
import { DisplayTopTenFacade } from '@bod/celebrities/domain';

@Component({
  selector: 'celebrities-display-top-ten',
  templateUrl: './display-top-ten.component.html',
  styleUrls: ['./display-top-ten.component.scss']
})
export class DisplayTopTenComponent implements OnInit {
    


    constructor(private displayTopTenFacade: DisplayTopTenFacade) {
    }


    ngOnInit() {
    }

}

