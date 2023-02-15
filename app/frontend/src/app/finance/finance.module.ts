import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { FinanceRoutingModule } from './finance-routing.module';
import { ViewProductsComponent } from './modules/view-products/view-products.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { DynamicFormGeneratorModule } from '../dynamic-form-generator/dynamic-form-generator.module';
import { MaterialLibModuleModule } from '../material-lib-module/material-lib-module.module';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { DynamicPrintReceiptGeneratorModule } from '../dynamic-print-receipt-generator/dynamic-print-receipt-generator.module';
// import { ProductTaggingComponent } from './modules/product-tagging/product-tagging.component';
import { FormsModule } from '@angular/forms';
import { PriceSettingComponent } from './modules/price-setting/price-setting.component';

import { PaginatorModule } from 'primeng/paginator';



@NgModule({
  declarations: [
    ViewProductsComponent,
    PriceSettingComponent,
  ],
  imports: [
    CommonModule,
    FinanceRoutingModule,
    FlexLayoutModule,
    DynamicFormGeneratorModule,
    MaterialLibModuleModule,
    TranslateModule,
    DynamicPrintReceiptGeneratorModule,
    FormsModule,
    PaginatorModule
  ],
  providers: [ConfirmationService, DatePipe]
})
export class FinanceModule { }
