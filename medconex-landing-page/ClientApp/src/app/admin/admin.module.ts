import { NgModule } from '@angular/core';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { AdminRoutingModule } from './admin-routing.module';

@NgModule({
  imports: [
    AdminRoutingModule
  ],
  declarations: [
    AdminDashboardComponent
  ]
})
export class AdminModule { }
