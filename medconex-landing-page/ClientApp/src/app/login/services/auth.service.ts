import { throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from './../../../environments/environment';
import { UserService } from 'kinvey-angular-sdk';
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { KinveyRoleMember } from '../models/KinveyRoleMember';

@Injectable()
export class AuthService {
  constructor(private _userService: UserService, private _http: HttpClient) {

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

  getAdminUsers() {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Basic ' + btoa(`${environment.kinveyAppKey}:${environment.kinveyMasterSecret}`)
      })
    };

    return this._http.get<KinveyRoleMember[]>(environment.api.kinveyAdminMembersApi, httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      ).toPromise();
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // return an observable with a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  };
}
