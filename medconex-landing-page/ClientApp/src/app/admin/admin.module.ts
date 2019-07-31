import { NgModule } from '@angular/core';

import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

import { AdminRoutingModule } from './admin-routing.module';
import { CommonModule } from '@angular/common';
import { GridModule } from '@progress/kendo-angular-grid';
import { ActiveUsersGridComponent } from '../components/activeUsersGrid/active-users-grid.component';
import { MedicationsGridComponent } from '../components/medicationsGrid/medications-grid.component';

@NgModule({
  imports: [
    AdminRoutingModule,
    CommonModule,
    GridModule
  ],
  declarations: [
    AdminDashboardComponent,
    ActiveUsersGridComponent,
    MedicationsGridComponent
  ]
})
export class AdminModule { }
