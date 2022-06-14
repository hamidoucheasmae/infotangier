import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { FirebaseAuthService } from './pages/welcome/providers/firebase-auth.service';
import { WidgetUtilService } from './pages/welcome/providers/widget-util.service';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  isLoggedIn: boolean = false;

  constructor(
    private platform: Platform, 
    private firebaseAuthService: FirebaseAuthService,
    private router: Router,
    private widgetUtilService: WidgetUtilService
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    
    });
    this.getAuthState();
  }




    
  getAuthState() {
    this.widgetUtilService.presentLoading();
    this.firebaseAuthService.getAuthState().subscribe(user => {
      console.log('user auth state===', user ? user.toJSON() : null);
      if (user) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
      this.handleNavigation();
      this.widgetUtilService.dismissLoader();

    // }, (error) => {
    //   this.widgetUtilService.dismissLoader();
    //   this.widgetUtilService.presentToast(error.message);
    });
  }

  handleNavigation() {
      if (this.isLoggedIn) {
    console.log('route==', this.router.url.split('/')[1]);
 const currentUrl = this.router.url.split('/')[1];
 if (currentUrl === 'welcome/login' || currentUrl === 'welcome/signup') {
  this.router.navigate(['/tabs/home']);
 }
      } else {
        this.router.navigate(['welcome/login'])
      }
    }

}


