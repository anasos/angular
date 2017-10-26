import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Player } from './model/player';
import { AuthService } from './auth.service';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlayerService {

  	constructor(private http: Http, private authenticationService: AuthService) { }

	private headers = new Headers({
	 'Content-Type': 'application/json',
	 'Authorization': this.authenticationService.getToken()
	 });

	private heroesUrl = "/api/all";  // URL to web api

	getPlayers(): Promise<Player[]> {
		return this.http.get(this.heroesUrl, {headers: this.headers})
	.toPromise()
	  .then(response => response.json() as Player[])
	  .catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
	}
}