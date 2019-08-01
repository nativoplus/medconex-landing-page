import { Component, OnInit } from "@angular/core";
import { MedicationModel, GetMedicationsResponse } from "../models/GetMedicationsResponse";
import { DataStateChangeEvent } from "@progress/kendo-angular-grid";
import { SortDescriptor, State, AggregateDescriptor, GroupDescriptor, DataResult, process } from "@progress/kendo-data-query";
import { AnalyticsService } from "../services/analytics.service";
import Swal from "sweetalert2";

@Component({
  selector: 'medications-grid',
  templateUrl: './medications-grid.component.html'
})
export class MedicationsGridComponent implements OnInit {
  public medications: MedicationModel[] = [];

  public sort: SortDescriptor[] = [{
    field: 'userFullName',
    dir: 'asc'
  }];

  public gridView: DataResult;
  public aggregates: AggregateDescriptor[] = [{ field: 'userFullName', aggregate: 'count' }];
  public groups: GroupDescriptor[] = [{ field: 'medicationName', aggregates: this.aggregates }];

  public state: State = {
    skip: 0,
    take: 5,
    sort: this.sort,
    group: this.groups
  };

  constructor(private _analyticsService: AnalyticsService) {

  }

  ngOnInit() {
    this.getMedications();
  }

  loadMedications() {
    this.gridView = process(this.medications, this.state);
  }

  dataStateChange(state: DataStateChangeEvent): void {
    if (state && state.group) {
      state.group.map(group => group.aggregates = this.aggregates);
    }
    this.state = state;
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
