import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { dbConfig } from './db.config';
import { IonicModule } from '@ionic/angular';
import { HAMMER_GESTURE_CONFIG } from '@angular/platform-browser';
import { CustomHammerConfig } from './hammer.config';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), importProvidersFrom(NgxIndexedDBModule.forRoot(dbConfig) ), { provide: HAMMER_GESTURE_CONFIG, useClass: CustomHammerConfig }],
};
