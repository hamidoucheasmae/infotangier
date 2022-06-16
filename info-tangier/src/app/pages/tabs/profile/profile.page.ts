import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseAuthService } from '../../welcome/providers/firebase-auth.service';
import { WidgetUtilService } from '../../welcome/providers/widget-util.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  profileInfo: any = {};
  profileAvailable: boolean = false;

  constructor(private firebaseAuthService:FirebaseAuthService, private widgetUtilService: WidgetUtilService, 
    private router: Router){ 
      this.getUserProfile();
    }
  

  ngOnInit() {
  }



  getUserProfile() {
    this.profileAvailable = false;
    this.firebaseAuthService.getAuthState().subscribe(user => {
      if (user) {
        this.profileInfo = user.toJSON();
      }
      this.profileAvailable = true;
    }, (error) => {
      this.profileAvailable = true;
      this.widgetUtilService.presentToast(error.message);
    });
  }


  async logout() {
    try {
      await this.firebaseAuthService.logout();
      this.widgetUtilService.presentToast('Logout Success');
      this.router.navigate(['welcome']);
    } catch (error) {
      console.log('Error', error);
      this.widgetUtilService.presentToast(error.message);
    }
  }



}
