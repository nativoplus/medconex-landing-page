import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { RecaptchaModule } from 'angular-google-recaptcha';
import { AdminModule } from './admin/admin.module';
import { KinveyModule } from 'kinvey-angular-sdk';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';

import { environment } from 'src/environments/environment';
import { AuthGuard } from './login/services/auth-guard.service';
import { AuthService } from './login/services/auth.service';
import { LoginModule } from './login/login.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AdminModule,
    LoginModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' }
    ]),
    RecaptchaModule.forRoot({
      siteKey: environment.reCaptchaKey
    }),
    KinveyModule.init({
      appKey: 'kid_ryZl8bRDm',
      appSecret: "1c6e98663ec6493ab8cdd06e09b27714"
    })
  ],
  providers: [
    AuthGuard,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
