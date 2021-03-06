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
import { AnalyticsService } from './components/services/analytics.service';

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
      appKey: environment.kinveyAppKey,
      appSecret: environment.kinveyAppSecret
    })
  ],
  providers: [
    AuthGuard,
    AuthService,
    AnalyticsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
