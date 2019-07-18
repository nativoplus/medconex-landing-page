import { Component } from '@angular/core';
import { AuthService } from '../../login/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from 'kinvey-js-sdk';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent {
  constructor(private _authService: AuthService, private _router: Router) {

  }

  logOut() {
    this._authService.logout().then((user: User) => {
      if (user) {
        this._router.navigate(["/login"]);
      } else {
        Swal.fire({
          title: 'Oops!',
          html: 'An error ocurred during the logout process. Please try again or report this issue to the MedConex team via email',
          type: 'error',
          showConfirmButton: true
        });
      }
    }).catch((error) => {
      console.log(error);
      Swal.fire({
        title: 'Oops!',
        html: 'An error ocurred during the logout process. Please try again or report this issue to the MedConex team via email',
        type: 'error',
        showConfirmButton: true
      });
    });
  }
}
