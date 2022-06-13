import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
// import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActionSheetController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/providers/firebase-auth.service';
import { HelperService } from 'src/app/providers/helper.service';
import { WidgetUtilService } from 'src/app/providers/widget-util.service';
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
  showSignupSpinner:boolean =false;
  router: any;


  constructor(
    private helperService:  HelperService, private firebaseAuthService:FirebaseAuthService ,private widgetUtilService: WidgetUtilService
   ) { }

  ngOnInit() {
    this.createFormControl();
    this.createForm();
    
  }

  async signup(){
    try {
      this.showSignupSpinner = true;
  const result = await this.firebaseAuthService.registerWithEmailPassword(this.email.value , this.password.value);
  console.log('result',result);
  this.showSignupSpinner = false;
  this.widgetUtilService.presentToast('Sign up siccees ! verificatioin email sendd');
  this.signupForm.reset();
  this.router.navigate(['./home']);
    } catch (error){
      this.showSignupSpinner = false;
      this.widgetUtilService.presentToast(error.message);
    }
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
 