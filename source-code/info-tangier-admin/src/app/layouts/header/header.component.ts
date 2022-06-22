import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userEmail!: string
  isLoggeIn$ !: Observable<boolean>

  constructor(private authservice : AuthService) { }

  ngOnInit(): void {

    this.userEmail = JSON.parse (localStorage.getItem('user') || '{}').email;

    this.isLoggeIn$ = this.authservice.isLoggedIn();
    
  }

  logOut(){
    this.authservice.logOut();
  }

  
}
