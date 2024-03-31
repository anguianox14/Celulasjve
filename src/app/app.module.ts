import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Firebase
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';

import { AngularFireAnalyticsModule } from '@angular/fire/analytics';

import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';

//Material
import {MatSnackBarModule} from '@angular/material/snack-bar';

//**
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
//**  */
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
//Idioma
import localEs from '@angular/common/locales/es-MX'
import { registerLocaleData } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';

registerLocaleData( localEs );

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    //firebase
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAnalyticsModule,
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence(),
    AngularFireStorageModule,
    AngularFireAuthModule,
    //*
    MatSnackBarModule,
    //
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    BrowserAnimationsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'es-MX' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
