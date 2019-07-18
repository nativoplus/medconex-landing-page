import { environment } from './../../../environments/environment';
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { KinveyRoleMember } from '../models/KinveyRoleMember';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private _router: Router, private _authService: AuthService) {

  }
  async canActivate() {
    var user = this._authService.getActiveUser();

    if (user) {
      await this._authService.getAdminUsers().then((members: KinveyRoleMember[]) => {

        if (!members.some((member) => member.userId === user._id)) {
          this._authService.logout();
          this._router.navigate(["/unauthorized"]);
        }
      }).catch((error) => {
        console.log(error);
        this._router.navigate(["/login"]);
      });

      return true;
    } else {
      this._router.navigate(["/login"]);
      return false;
    }
  }
}
