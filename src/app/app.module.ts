import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import ru from '@angular/common/locales/ru';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE, MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AngularSplitModule } from 'angular-split';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { UsersModule } from 'src/app/modules/users/users.module';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { HeaderComponent } from './root-components/header/header.component';

registerLocaleData(ru);

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    AppRoutingModule,
    HttpClientModule,
    MatMenuModule,
    UsersModule,
    RouterModule,
    AngularSplitModule.forRoot(),
  ],

  declarations: [
    AppComponent,
    HeaderComponent,
  ],

  providers: [
    {
      provide: API_URL_GATEWAY,
      useValue: environment.gateway,
    },
    {
      provide: LOCALE_ID,
      useValue: 'ru-RU',
    },
    {
      provide: MAT_DATE_LOCALE,
      useValue: 'ru-RU',
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}
