import { registerLocaleData } from '@angular/common';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import ru from '@angular/common/locales/ru';
import { LOCALE_ID, NgModule } from '@angular/core';
import { MAT_DATE_LOCALE, MatButtonModule, MatIconModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { LocalStorageService } from 'angular-2-local-storage';
import { AngularSplitModule } from 'angular-split';
import { API_URL_GATEWAY } from 'src/app/api-service.config';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthInterceptor } from 'src/app/modules/users/interceptors/auth.interceptor';
import { UsersModule } from 'src/app/modules/users/users.module';
import { LoaderWithBackdropModule } from 'src/app/ui/loader-with-backdrop/loader-with-backdrop.module';
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
    LoaderWithBackdropModule,
  ],

  declarations: [
    AppComponent,
    HeaderComponent,
  ],

  providers: [
    { provide: LocalStorageService, useFactory: localStorageConfigFactory },
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
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],

  bootstrap: [AppComponent],
})
export class AppModule {}

export function localStorageConfigFactory(): LocalStorageService {
  return new LocalStorageService({ prefix: 'dc-', storageType: 'localStorage' });
}
