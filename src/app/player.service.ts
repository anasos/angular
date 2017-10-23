import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Player } from './model/player';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class PlayerService {

  constructor(private http: Http) { }

  private headers = new Headers({'Content-Type': 'application/json'});
	private heroesUrl = "/api/all";  // URL to web api

	getPlayers(): Promise<Player[]> {
		return this.http.get(this.heroesUrl)
    .toPromise()
	  .then(response => response.json() as Player[])
	  .catch(this.handleError);
	}

	private handleError(error: any): Promise<any> {
	  console.error('An error occurred', error); // for demo purposes only
	  return Promise.reject(error.message || error);
	}
}