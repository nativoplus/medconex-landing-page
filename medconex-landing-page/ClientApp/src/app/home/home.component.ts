import { environment } from './../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit {
  http: HttpClient;
  contactUsApi = environment.api.contactUsApi;
  SWidgetToken = environment.SGWidgetDataTokenForSubscription;
  contactUsForm: FormGroup;

  constructor(http: HttpClient, private fb: FormBuilder) {
    this.http = http;

  }

  ngOnInit() {

    this.contactUsForm = this.fb.group(
      {
        Email: ['', [
          Validators.required,
          Validators.email] ],
        Name: ['',  Validators.required],
        Message: ['',  Validators.required],
        myRecaptcha: ['',  Validators.required]
    });



  }

  onContactUsFormSubmit() {

    if( !this.contactUsForm.valid && !this.contactUsForm.controls.myRecaptcha.value) {
      return;
    }

    const formValues =  {
      email: this.contactUsForm.value.Email,
      name: this.contactUsForm.value.Name,
      message: this.contactUsForm.value.Message
    };

    const contactUsText = this.produceContactMessage();
    const requestBody = {
      to: [
        environment.contactUs.senderEmail
      ],
      cc: environment.contactUs.ccList ?  environment.contactUs.ccList : [],
      subject: 'User Contact Information',
      html: contactUsText,
      senderEmail: formValues.email,
      senderName: formValues.name,
      text: contactUsText
    };

    this.http.post<any[]>( this.contactUsApi, requestBody).subscribe(result => {
      this.contactUsForm.reset();

      //We display a alert to let the user now what going on
      Swal.fire({
        title: 'Thanks for contacting us',
        html: 'We will get back to you as soon as possible',
        type: 'success',
        timer: 2000,
        onBeforeOpen: () => {
          Swal.showLoading();
        },
      });
    }, error => console.error(error));
  }

  produceContactMessage = (): string => {
   const formValues =  {
     email: this.contactUsForm.value.Email,
     name: this.contactUsForm.value.Name,
     message: this.contactUsForm.value.Message
   };

   return `<table style=" background:#F4F4F4 ; text-align : center">
    <tr>
      <th colspan="2" style="padding:10px;">
        <b>Contact Details</b>
      </th>
    </tr>
    <tr>
      <td style="padding:10px;">
        <b>Name:</b>
      </td>
      <td style="padding:10px;">${formValues.name}</td>
    </tr>
    <tr>
      <td style="padding:10px;">
        <b>E-mail:</b>
      </td>
      <td style="padding:10px;">${formValues.email}</td>
    </tr>
    <tr>
      <td style="padding:10px;">
        <b>Message:</b>
      </td>
      <td style="padding:10px;">${formValues.message}</td>
    </tr>
    <tr>
      <th colspan="2" style="padding:10px;">
        <b>Thank you for contacting us.</b>
      </th>
    </tr>
    <tr>
      <td colspan="2" style="padding:10px;">
        You are very important to us, all information received will always remain confidential.
      </td>
    </tr>
    </table>`;
  }

  onScriptLoad() {
    console.log('Google reCAPTCHA loaded and is ready for use');
  }

  onScriptError() {
    console.log('Something went long when loading the Google reCAPTCHA');
  }

}
