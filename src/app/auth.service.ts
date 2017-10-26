import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthService {

  private authUrl = 'http://localhost:8080/auth';
  private headers = new Headers({'Content-Type': 'application/json'});  
  // Set our Auth0 credentials
  // lock = new Auth0Lock(AUTH_CONFIG.CLIENT_ID, AUTH_CONFIG.CLIENT_DOMAIN);

  // auth0 = new auth0.WebAuth({
  //     clientID: 'SaBlRyTa1wAgzTJI9gfAPaIAgtpIXoC8',
  //     domain: 'anas-auth.auth0.com',
  //     responseType: 'token id_token',
  //     audience: 'https://anas-auth.auth0.com/userinfo',
  //     redirectUri: 'http://localhost:4200/callback',      
  //     scope: 'openid'
  //   });

  // constructor(public router: Router) {}

  constructor(private http: Http) {
  }
  // public login(): void {
  //   this.auth0.authorize();
  // }
  
  public login(username: string, password: string): Observable<boolean> {
      return this.http.post(this.authUrl, JSON.stringify({username: username, password: password}), {headers: this.headers})
          .map((response: Response) => {
            debugger;
              // login successful if there's a jwt token in the response
              let token = false;
              if ( response.text() != ""){
                token = response.json() && response.json().token;
              }
              if (token) {
                  // store username and jwt token in local storage to keep user logged in between page refreshes
                  // localStorage.setItem('id_token', JSON.stringify({ username: username, token: token }));
                  localStorage.setItem('id_token', response.json().token);
                  // return true to indicate successful login
                  return true;
              } else {
                  // return false to indicate failed login
                  return false;
              }
          }).catch((error:any) => Observable.throw(error.json().error || 'Server error'));
  }

  getToken(): String {
    var token = localStorage.getItem('id_token');
    // var token = currentUser && currentUser.token;
    return token ? token : "";
  }

  logout(): void {
      // clear token remove user from local storage to log user out
      localStorage.removeItem('currentUser');
  }

  isLoggedIn(): boolean {
    var token: String = this.getToken();
    return token && token.length > 0;
  }
  // constructor(private router: Router) {
  //   // Capture the user credentials when the user has succesfully logged in
  //   this.lock.on('authenticated', (authResult: any) => {
  //     localStorage.setItem('id_token', authResult.idToken);

  //     this.lock.getProfile(authResult.idToken, (error: any, profile: any) => {
  //       if (error) {
  //         console.log(error);
  //       }

  //       localStorage.setItem('profile', JSON.stringify(profile));
  //       this.router.navigateByUrl('/home');
  //     });

  //     this.lock.hide();
  //   });
  // }

  // // Display the lock login box
  // login() {
  //   this.lock.show();
  // }

  // Logout the user
  // logout() {
  //   // To log out, just remove the token and profile
  //   // from local storage
  //   localStorage.removeItem('profile');
  //   localStorage.removeItem('id_token');

  //   // Send the user back to the dashboard after logout
  //   this.router.navigateByUrl('/login');
  // }

  // Check whether the user is logged in or not
  loggedIn() {
    return tokenNotExpired();
  }
}