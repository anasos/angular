import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers} from '@angular/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

import 'rxjs/Rx';

import { AuthService } from '../../auth.service';

import { Passage } from '../../model/passage';

let headers = new Headers({'Content-Type':'application/x-www-form-urlencoded'});
let options = new RequestOptions({ headers: headers });

@Component({
  selector: 'new-player',
  templateUrl: './new-player.html',
  styles: [ './new-player.css' ]
})

export class newPlayerComponent {

	constructor(private http:Http) { 
    }

	articleForm = new FormGroup({
       name: new FormControl('', Validators.required),
       number: new FormControl('', Validators.required)	   
   	});

	articleUrl = "http://localhost:8080/api/passage/create";

	onArticleFormSubmit() {
	  if (this.articleForm.invalid) {
	       return; //Validation failed, exit from method.
	  }   
	  //Form is valid, now perform create or update
	  let title = this.articleForm.get('name').value.trim();
          let nu = this.articleForm.get('number').value.trim();	  
	    //Handle create article
	    let article = new Passage(null, title, nu);	  
	    this.createArticle(article)
	      .subscribe(successCode => {
		              console.log(successCode);
			},
		        errorCode => console.log(errorCode));
	 
	}

	createArticle(passage: Passage):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
	    let options = new RequestOptions({ headers: cpHeaders });
	    debugger;
	    return this.http.post(this.articleUrl, passage, options)
	        .map(success => success.status)
	        .catch(this.handleError);
	}

	private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }

}