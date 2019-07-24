import { NgModule } from '@angular/core';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    GridModule
  ],
  declarations: [
    AdminDashboardComponent
  ]
})
export class AdminModule { }
