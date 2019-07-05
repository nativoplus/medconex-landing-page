import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  http: HttpClient;
  contactUsApi = environment.api.contactUsApi;
  SWidgetToken = environment.SGWidgetDataTokenForSubscription;

  constructor(http: HttpClient) {
    this.http = http;
  }

  contactUs() {
    this.http.get<any[]>( this.contactUsApi).subscribe(result => {
      console.log(result);
    }, error => console.error(error));
  }

  ngOnInit() {

  }

}
