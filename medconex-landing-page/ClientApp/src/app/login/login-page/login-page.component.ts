import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { User } from 'kinvey-js-sdk';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html'
})
export class LoginPageComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private _fb: FormBuilder, private _authService: AuthService, private _router: Router) {

  }

  ngOnInit() {
    this.loginForm = this._fb.group(
      {
        Email: [
          '',
          [Validators.required, Validators.email]
        ],
        Password: ['', Validators.required]
      });
  }

  onLoginFormSubmit() {
    if (!this.loginForm.valid) {
      return;
    } else {
      const formValues = {
        email: this.loginForm.value.Email,
        password: this.loginForm.value.Password
      };

      this._authService.login(formValues.email, formValues.password).then((user: User) => {
        this.loginForm.reset();

        if (user) {
          Swal.fire({
            title: 'Success!',
            html: 'Login was successful',
            type: 'success',
            timer: 2000,
            onBeforeOpen: () => {
              Swal.showLoading();
            }
          }).then(() => {
            this._router.navigate(["/admin-dashboard"]);
          });
        } else {
          Swal.fire({
            title: 'Oops!',
            html: 'An error ocurred during the login process. Please try again or report this issue to the MedConex team via email.',
            type: 'error',
            showConfirmButton: true
          });
        }
      }).catch(() => {
        Swal.fire({
          title: 'Login failed',
          html: 'Unfortunately we could not find your account. Make sure you are using the correct email and password.',
          type: 'error',
          showConfirmButton: true
        });
      });
    }
  }
}
