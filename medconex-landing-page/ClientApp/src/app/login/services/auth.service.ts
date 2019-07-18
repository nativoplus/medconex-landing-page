import { UserService } from 'kinvey-angular-sdk';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  constructor(private _userService: UserService) {

  }

  getActiveUser() {
    return this._userService.getActiveUser();
  }

  login(email: string, password: string) {
    return this._userService.login(email, password);
  }

  logout() {
    return this._userService.logout();
  }
}
