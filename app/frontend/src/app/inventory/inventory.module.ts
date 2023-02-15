import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { InventoryRoutingModule } from './inventory-routing.module';
import { GrnDetailsMainPageComponent } from './modules/grn-details-main-page/grn-details-main-page.component';
import { MaterialReceiptMainPageComponent } from './modules/material-receipt-main-page/material-receipt-main-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DynamicFormGeneratorModule } from '../dynamic-form-generator/dynamic-form-generator.module';
import { MaterialLibModuleModule } from '../material-lib-module/material-lib-module.module';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { DynamicPrintReceiptGeneratorModule } from '../dynamic-print-receipt-generator/dynamic-print-receipt-generator.module';
import { ProductTaggingComponent } from './modules/product-tagging/product-tagging.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [  
    GrnDetailsMainPageComponent,
    MaterialReceiptMainPageComponent,
    ProductTaggingComponent
  ],
  imports: [
    CommonModule,
    InventoryRoutingModule,
    FlexLayoutModule,
    DynamicFormGeneratorModule,
    MaterialLibModuleModule,
    TranslateModule,
    DynamicPrintReceiptGeneratorModule,
    FormsModule
  ],
  providers: [ConfirmationService, DatePipe]
})
export class InventoryModule { }
