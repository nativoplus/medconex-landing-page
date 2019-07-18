import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

const adminRoutes: Routes = [
  { path: 'login', component: LoginPageComponent },
  { path: 'unauthorized', component: UnauthorizedComponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LoginRoutingModule { }
