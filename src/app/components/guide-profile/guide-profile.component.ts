import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers} from '@angular/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import 'rxjs/Rx';

import { AuthService } from '../../auth.service';
import { GuideService } from '../../service/guide.service'
import { Passage } from '../../model/passage';
import { Guide } from '../../model/guide';


let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
let options = new RequestOptions({ headers: headers });

@Component({
  selector: 'guide-profile',
  templateUrl: './guide-profile.html'
})

export class guideProfileComponent {

	private guide = null;
	
	constructor(private http:Http, private authenticationService:AuthService, 
		private guideService: GuideService) { 
    }

	ngOnInit() {
	    this.guide = this.guideService.getCurrentGuide();
  	}

}