import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { DynamicFormGeneratorModule } from './dynamic-form-generator/dynamic-form-generator.module';
import { MaterialLibModuleModule } from './material-lib-module/material-lib-module.module';
import { SharedModule } from './shared/shared.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HomeModule } from './home/home.module';
import { WareshouseModule } from './wareshouse/wareshouse.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { JwtInterceptor } from './shared/common/jwt.interceptor';
import { ConfirmationService } from 'primeng/api';
import { DynamicPrintReceiptGeneratorModule } from './dynamic-print-receipt-generator/dynamic-print-receipt-generator.module';
import { NgxPrintModule } from 'ngx-print';
// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    MaterialLibModuleModule,
    FlexLayoutModule,
    CoreModule,
    SharedModule,
    DynamicFormGeneratorModule,
    DynamicPrintReceiptGeneratorModule,
    NgxPrintModule,
    HomeModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
