import { Component, OnInit } from "@angular/core";
import { GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";
import { SortDescriptor, orderBy } from "@progress/kendo-data-query";
import Swal from "sweetalert2";
import { ActiveUserModel, GetActiveUsersResponse } from "../models/GetActiveUsersResponse";
import { AnalyticsService } from "../services/analytics.service";

@Component({
  selector: 'active-users-grid',
  templateUrl: './active-users-grid.component.html'
})
export class ActiveUsersGridComponent implements OnInit {
  public activeUsers: ActiveUserModel[] = [];

  public gridData: GridDataResult;
  public pageSize: number = 5;
  public skip: number = 0;

  public sort: SortDescriptor[] = [{
    field: 'username',
    dir: 'asc'
  }];

  constructor(private _analyticsService: AnalyticsService) {

  }

  ngOnInit() {
    this.getActiveUsers();
  }

  loadActiveUsers() {
    this.gridData = {
      data: orderBy(this.activeUsers.slice(this.skip, this.skip + this.pageSize), this.sort),
      total: this.activeUsers.length
    };
  }

  pageChange({ skip, take }: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.loadActiveUsers();
  }

  sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadActiveUsers();
  }

  getActiveUsers() {
    this._analyticsService.getActiveUsers().then((response: GetActiveUsersResponse) => {
      if (response.activeUsers) {
        this.activeUsers = response.activeUsers;
        this.loadActiveUsers();
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
}
