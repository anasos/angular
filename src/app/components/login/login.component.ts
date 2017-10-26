import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Http, RequestOptions, Headers} from '@angular/http';

import { AuthService } from '../../auth.service';

@Component({
  selector: 'login',
  templateUrl: './login.html',
  styles: [ './login.css' ]
})
export class Login {

  error = '';

  constructor(public router: Router, public http: Http, private auth: AuthService) {
  }

  login(event, username, password) {
        this.auth.login(username, password)
            .subscribe(result => {
                if (result === true) {
                    // login successful
                    this.router.navigate(['players']);
                } else {
                    // login failed
                    this.error = 'Username or password is incorrect';
                }
            }, error => {
              this.error = error;
            });
    }

  // login(event, username, password) {

  //   let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
  //   let options = new RequestOptions({ headers: cpHeaders });

  //   event.preventDefault();
  //   let body = JSON.stringify({ username, password });

  //   this.http.post('http://localhost:8080/login', body)
  //     .subscribe(
  //       response => {
  //         console.log('i m here');
  //         localStorage.setItem('id_token', response.json().id_token);
  //         this.router.navigate(['home']);
  //       },
  //       error => {
  //         alert(error.text());
  //         console.log(error.text());
  //       }
  //     );
  // }

  signup(event) {
    event.preventDefault();
    this.router.navigate(['signup']);
  }
}
