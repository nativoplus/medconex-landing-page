import { Component, OnInit } from "@angular/core";
import { MedicationModel, GetMedicationsResponse } from "../models/GetMedicationsResponse";
import { GridDataResult, PageChangeEvent } from "@progress/kendo-angular-grid";
import { SortDescriptor, orderBy } from "@progress/kendo-data-query";
import { AnalyticsService } from "../services/analytics.service";
import Swal from "sweetalert2";

@Component({
  selector: 'medications-grid',
  templateUrl: './medications-grid.component.html'
})
export class MedicationsGridComponent implements OnInit {
  public medications: MedicationModel[] = [];

  public gridData: GridDataResult;
  public pageSize: number = 5;
  public skip: number = 0;

  public sort: SortDescriptor[] = [{
    field: 'medicationName',
    dir: 'asc'
  }];

  constructor(private _analyticsService: AnalyticsService) {

  }

  ngOnInit() {
    this.getMedications();
  }

  loadMedications() {
    this.gridData = {
      data: orderBy(this.medications.slice(this.skip, this.skip + this.pageSize), this.sort),
      total: this.medications.length
    };
  }

  pageChange({ skip, take }: PageChangeEvent): void {
    this.skip = skip;
    this.pageSize = take;
    this.loadMedications();
  }

  sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadMedications();
  }

  getMedications() {
    this._analyticsService.getMedications(0).then((response: GetMedicationsResponse) => {
      if (response.adherenceDetails) {
        this.medications = response.adherenceDetails;
        this.loadMedications();
      }
    }).catch((error) => {
      Swal.fire({
        title: 'Oops!',
        html: 'An error ocurred while fetching the medications. Please try again or report this issue to the MedConex team via email',
        type: 'error',
        showConfirmButton: true
      });
    });
  }
}
