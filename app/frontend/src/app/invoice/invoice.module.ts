import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceRoutingModule } from './invoice-routing.module';

import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialLibModuleModule } from '../material-lib-module/material-lib-module.module';
import { ConfirmationService } from 'primeng/api';
import { DynamicFormGeneratorModule } from '../dynamic-form-generator/dynamic-form-generator.module';
import { TranslateModule } from '@ngx-translate/core';
import { InvoiceMainPageComponent } from './modules/invoice-main-page/invoice-main-page.component';
import { DynamicPrintReceiptGeneratorModule } from '../dynamic-print-receipt-generator/dynamic-print-receipt-generator.module';

@NgModule({
  declarations: [
    InvoiceMainPageComponent,
  ],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    FlexLayoutModule,
    DynamicFormGeneratorModule,
    MaterialLibModuleModule,
    TranslateModule,
    DynamicPrintReceiptGeneratorModule
  ],
  providers: [ConfirmationService]
})
export class InvoiceModule { }
