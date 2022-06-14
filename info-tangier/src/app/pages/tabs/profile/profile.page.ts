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


  constructor(private firebaseAuthService:FirebaseAuthService, private widgetUtilService: WidgetUtilService, 
    private router: Router) { }

  ngOnInit() {
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
