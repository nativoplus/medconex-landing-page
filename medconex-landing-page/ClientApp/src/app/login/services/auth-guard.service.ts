import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _authService: AuthService) {

  }
  canActivate() {
    var user = this._authService.getActiveUser();

    if (user) {
      if (!user.isActive() || !user.isEmailVerified()) {
        this._router.navigate(["/unauthorized"]);
      }

      return true;
    } else {
      this._router.navigate(["/login"]);

      return false;
    }
  }
}
