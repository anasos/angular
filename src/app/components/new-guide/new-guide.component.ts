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
  selector: 'new-guide',
  templateUrl: './new-guide.html',
  styles: [ './new-guide.css' ]
})

export class newGuideComponent {

	constructor(private http:Http, private router: Router,private authenticationService:AuthService, 
		private guideService: GuideService) { 
    }

	guideForm = new FormGroup({
       name: new FormControl('', Validators.required)
   	});

	createGuideUrl = "http://localhost:8080/api/guide/create" ;

	onGuideFormSubmit() {
	  if (this.guideForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
	  let name = this.guideForm.get('name').value.trim();
	    //Handle create article
	  let guide = new Guide(null, name);	  
	  this.createGuide(guide);
	};

	createGuide(guide: Guide): void {
		this.guideService.create(guide)
		.then(guide => {
			localStorage.setItem('current_guide', JSON.stringify(guide))
			this.router.navigate(["/guide-profile"]);
		});
	};

	private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    };

}