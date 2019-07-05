import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {

  SWidgetToken = environment.SGWidgetDataTokenForSubscription;

  constructor(
  ) {
 
  }

  ngOnInit() {

  }

}
