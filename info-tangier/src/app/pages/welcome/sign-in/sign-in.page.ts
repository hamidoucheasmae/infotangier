import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/pages/welcome/providers/helper.service';
import { LOGIN } from './../constants/formValidationMessage';
@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.page.html',
  styleUrls: ['./sign-in.page.scss'],
})
export class SignInPage implements OnInit {

  loginForm: FormGroup;
  email: FormControl;
  password: FormControl;
  formError: any = {
    email: '',
    password: ''
  };
  validationMessage: any = LOGIN; 


  constructor(private helperService:  HelperService) { }
 
  

  ngOnInit() {
    this.createFormControl();
    this.createForm();
    
  }

 
 createFormControl (){
 this.email = new FormControl('', [
  Validators.required,
  Validators.email
]);

this.password = new FormControl('', [
  Validators.required,
  Validators.minLength(8)
]);
 }

 createForm (){
  this.loginForm = new FormGroup ({
  email: this.email,
  password: this.password
  });

  this.loginForm.valueChanges.subscribe( data => this.onFormValueChanged(data));
}


onFormValueChanged(data){
this.formError = this.helperService.prepareValidationMessage(this.loginForm, this.validationMessage, this.formError);
// console.log('===formError', this.formError);
}
}


// form: FormGroup;

// constructor() { 
//   this.initForm();
// }

// ngOnInit() {
// }

// initForm() {
//   this.form = new FormGroup({
//     email: new FormControl(null, {validators: [Validators.required, Validators.email]}),
//     password: new FormControl(null, {validators: [Validators.required, Validators.minLength(8)]}),
//   });
// }

// onSubmit() {
//   if(!this.form.valid) {
//     this.form.markAllAsTouched();
//     return;
//   }
//   console.log(this.form.value);
// }
