import { Component, OnInit} from '@angular/core';
import { AuthFacade } from '@bod/training/domain';

@Component({
  selector: 'training-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
    


    constructor(private authFacade: AuthFacade) {
    }


    ngOnInit() {
    }

}

