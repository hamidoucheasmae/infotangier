import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
// // firebase staff
// import { initializeAapp, provideFirebaseApp } from '@angular/fire';
// import { environment } from '../environments/environment';
// import { getAuth, provideAuth } from '@angular/fire/auth';
// import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { environment } from 'src/environments/environment.prod';
import { AngularFirestore } from '@angular/fire/firestore/firestore';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { SignInPage } from './sign-in/sign-in.page';
import { AngularFireAuthModule } from '@angular/fire/auth';

@NgModule({
  declarations: [AppComponent,SignInPage],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    // provideFirebaseApp(()=>initializeAapp(environment.firebase)),
    // provideAuth(() => getAuth()),
    // provideFirestore(() => getFirestore()),
    // provideStorage(() => getStorage()),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    AngularFirestoreModule,
  
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
