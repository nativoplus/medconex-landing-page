import { NgModule } from '@angular/core';

import { LoginPageComponent } from './login-page/login-page.component';

import { LoginRoutingModule } from './login-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    LoginRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule
  ],
  declarations: [
    LoginPageComponent,
    UnauthorizedComponent
  ],
  providers: [
    AuthService
  ]
})
export class LoginModule { }
