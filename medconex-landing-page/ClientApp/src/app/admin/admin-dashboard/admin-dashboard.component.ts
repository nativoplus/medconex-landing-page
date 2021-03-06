import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../login/services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { User } from 'kinvey-js-sdk';
import { ActiveUserModel, GetActiveUsersResponse } from '../../components/models/GetActiveUsersResponse';
import { AnalyticsService } from '../../components/services/analytics.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  public activeUsers: ActiveUserModel[] = [];
  public showGrid: boolean = false;

  constructor(private _authService: AuthService, private _analyticsService: AnalyticsService, private _router: Router) {
  }

  ngOnInit() {
    this.getActiveUsers();
  }

  getActiveUsers() {
    this._analyticsService.getActiveUsers().then((users: GetActiveUsersResponse) => {
      if (users.activeUsers) {
        this.activeUsers = users.activeUsers;
      }
    }).catch((error) => {
      Swal.fire({
        title: 'Oops!',
        html: 'An error ocurred while fetching the active users. Please try again or report this issue to the MedConex team via email',
        type: 'error',
        showConfirmButton: true
      });
    });
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
