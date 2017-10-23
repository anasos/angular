import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers} from '@angular/http';

import { AuthService } from '../../auth.service';

let headers = new Headers({ 'Content-Type': 'application/json' });
let options = new RequestOptions({ headers: headers });

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styles: [ './login.css' ]
})
export class Login {
  constructor(public router: Router, public http: Http, private auth: AuthService) {
  }

  login(event, username, password) {
    event.preventDefault();
    let body = JSON.stringify({ username, password });
    debugger;
    this.http.post('http://localhost:8080/login', body, { headers: headers})
      .subscribe(
        response => {
          localStorage.setItem('id_token', response.json().id_token);
          this.router.navigate(['home']);
        },
        error => {
          alert(error.text());
          console.log(error.text());
        }
      );
  }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}
