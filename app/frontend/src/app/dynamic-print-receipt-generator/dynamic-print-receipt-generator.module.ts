import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReceiptFieldBuilderComponent } from './components/receipt-field-builder/receipt-field-builder.component';
import { ReceiptBuilderComponent } from './components/receipt-builder/receipt-builder.component';
import { ReceiptOfGoodsComponent } from './print-components/receipt-of-goods/receipt-of-goods.component';
import { AcceptanceOfGoodsComponent } from './print-components/acceptance-of-goods/acceptance-of-goods.component';
import { HeaderComponent } from './print-components/header/header.component';
import { FooterComponent } from './print-components/footer/footer.component';
import { NgxPrintModule } from 'ngx-print';

import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialLibModuleModule } from '../material-lib-module/material-lib-module.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FooterHeaderComponent } from './print-components/footer-header/footer-header.component';
import { FooterBodyComponent } from './print-components/footer-body/footer-body.component';
import { RackToRackPrintComponent } from './print-components/rack-to-rack-print/rack-to-rack-print.component';
import { ZoneToZonePrintComponent } from './print-components/zone-to-zone-print/zone-to-zone-print.component';
import { StudyMateriaslReturnComponent } from './print-components/study-materiasl-return/study-materiasl-return.component';
import { InventoryReportComponent } from './print-components/inventory-report/inventory-report.component';
import { DistructStudyMaterialPrintComponent } from './print-components/distruct-study-material-print/distruct-study-material-print.component';
import { DeliveryStudyMaterialPrintComponent } from './print-components/delivery-study-material-print/delivery-study-material-print.component';
import { DeliverySiteToPatientPrintComponent } from './print-components/delivery-site-to-patient-print/delivery-site-to-patient-print.component';
import { NurseToPatientPrintComponent } from './print-components/nurse-to-patient-print/nurse-to-patient-print.component';
import { SiteToSitePrintComponent } from './print-components/site-to-site-print/site-to-site-print.component';
import { ExportedStudyMaterialPrintComponent } from './print-components/exported-study-material-print/exported-study-material-print.component';
import { ExpireDateChangePrintComponent } from './print-components/expire-date-change-print/expire-date-change-print.component';
import { InvoicePrintComponent } from './print-components/invoice-print/invoice-print.component';

@NgModule({
  declarations: [
    ReceiptFieldBuilderComponent,
    ReceiptBuilderComponent,
    ReceiptOfGoodsComponent,
    AcceptanceOfGoodsComponent,
    HeaderComponent,
    FooterComponent,
    FooterHeaderComponent,
    FooterBodyComponent,
    RackToRackPrintComponent,
    ZoneToZonePrintComponent,
    StudyMateriaslReturnComponent,
    InventoryReportComponent,
    DistructStudyMaterialPrintComponent,
    DeliveryStudyMaterialPrintComponent,
    DeliverySiteToPatientPrintComponent,
    NurseToPatientPrintComponent,
    SiteToSitePrintComponent,
    ExportedStudyMaterialPrintComponent,
    ExpireDateChangePrintComponent,
    InvoicePrintComponent,
 
  ],
  imports: [
    CommonModule,
    NgxPrintModule,
    TranslateModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialLibModuleModule
  ],
  exports: [
    ReceiptBuilderComponent
  ]
})
export class DynamicPrintReceiptGeneratorModule { }
