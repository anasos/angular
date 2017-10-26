import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { tokenNotExpired } from 'angular2-jwt';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}

  canActivate() {
    debugger;
    // Check to see if a user has a valid JWT
    if (this.authService.isLoggedIn()) {
      // If they do, return true and allow the user to load the home component
      return true;
    }

    // If not, they redirect them to the login page
    this.router.navigate(['/login']);
    return false;
  }
}