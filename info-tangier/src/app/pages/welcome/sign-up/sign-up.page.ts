import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { HelperService } from 'src/app/providers/helper.service';
import { SIGNUP } from '../constants/formValidationMessage';
// import { File } from '@ionic-native/file/ngx';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {
  signupForm: FormGroup;
  email: FormControl;
  password: FormControl;
  formError: any = {
    email: '',
    password: ''
  };
  validationMessage: any = SIGNUP; 


  constructor(
    private helperService:  HelperService,
   ) { }

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
     this.signupForm = new FormGroup ({
     email: this.email,
     password: this.password
     });
   
     this.signupForm.valueChanges.subscribe( data => this.onFormValueChanged(data));
   }
   
   
   onFormValueChanged(data){
   this.formError = this.helperService.prepareValidationMessage(this.signupForm, this.validationMessage, this.formError);
   // console.log('===formError', this.formError);
   }
 

}
 