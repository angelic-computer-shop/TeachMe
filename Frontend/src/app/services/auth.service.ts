import { Injectable } from '@angular/core';
import { loggedUser } from '../types/LoggedUser';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  accessToken: any;
  user!: loggedUser;
  constructor() {}

  isAuthenticated(): boolean {
    // Retrieve the JSON-formatted string from sessionStorage
    this.accessToken = sessionStorage.getItem('loggedUser');
    

    if (this.accessToken) {
      // If accessToken is not null or undefined, parse it to get the user object
      this.user = JSON.parse(this.accessToken) as loggedUser;
      const accessTokenValue = this.user.token;

      // Check if the user has a valid access token
      return !!accessTokenValue;
    } else {
      // If accessToken is null or undefined, the user is not authenticated
      return false;
    }
  }
}
