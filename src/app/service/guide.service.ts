import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Player } from '../model/player';
import { AuthService } from '../auth.service';

import { Guide } from '../model/guide'

import 'rxjs/add/operator/toPromise';

@Injectable()
export class GuideService {

  	constructor(private http: Http, private authenticationService: AuthService) { }

	private headers = new Headers({
	 'Content-Type': 'application/json',
	 'Authorization': this.authenticationService.getToken()
	 });

	private options = new RequestOptions({
		headers: this.headers
	})

	private heroesUrl = "/api/all";  // URL to web api

	getPlayers(): Promise<Player[]> {
		return this.http.get(this.heroesUrl, {headers: this.headers})
	.toPromise()
	  .then(response => response.json() as Player[])
	  .catch(this.handleError);
	}

	create(guide: Guide): Promise<Guide> {

		let createUrl = "/api/guide/create";
	    // return this.http.post(this.createGuideUrl, guide, options)
	    //     .map(response => { response.json() as Guide })
	    //     .catch(this.handleError);

	   	return this.http.post(createUrl, guide, this.options)
		.toPromise()
		  .then(response => response.json())
		  .catch(this.handleError);
	}

	getCurrentGuide(): Guide {
		var guide_json = JSON.parse(localStorage.getItem('current_guide'));
		var guide = guide_json as Guide;
		return guide;
	}

	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
	}

}