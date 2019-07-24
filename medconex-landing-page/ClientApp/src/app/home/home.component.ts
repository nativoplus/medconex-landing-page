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

    if(!this.contactUsForm.valid && !this.contactUsForm.controls.myRecaptcha.value) {
      return;
    } else {

      const formValues =  {
        email: this.contactUsForm.value.Email,
        name: this.contactUsForm.value.Name,
        message: this.contactUsForm.value.Message
      };
      const requestBody = {
        templateId: environment.contactUsSendgridTemplateId,
        emailTemplateData: [
          {
            templateData: {
              name: formValues.name,
              email: formValues.email,
              message: formValues.message
            },
            to: formValues.email,
            cc: environment.contactUs.ccList,
          }
        ],
        senderName: formValues.name,
        subject: 'Contact User Information',
        senderEmail: formValues.email
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
      }, error =>  {
        //We display a alert to let the user now what going on
        Swal.fire({
          title: 'There was an error trying to send your message to our support team',
          html: 'Please try again later or you can contact us via email',
          type: 'error',
          timer: 2000,
          showConfirmButton: true
        });
      });

    }
  }

  onScriptLoad() {
    console.log('Google reCAPTCHA loaded and is ready for use');
  }

  onScriptError() {
    console.log('Something went wrong when loading the Google reCAPTCHA');
  }

}
