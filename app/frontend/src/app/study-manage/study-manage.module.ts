import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { DynamicFormGeneratorModule } from '../dynamic-form-generator/dynamic-form-generator.module';
import { MaterialLibModuleModule } from '../material-lib-module/material-lib-module.module';

import { StudyManageRoutingModule } from './study-manage-routing.module';
import { ReturnStudyMaterialComponent } from './modules/return-study-material/return-study-material.component';
import { DynamicPrintReceiptGeneratorModule } from '../dynamic-print-receipt-generator/dynamic-print-receipt-generator.module';
import { DistructStudyMaterialComponent } from './modules/distruct-study-material/distruct-study-material.component';
import { DeliveryStudyMaterialComponent } from './modules/delivery-study-material/delivery-study-material.component';
import { DeliverySiteToPatientComponent } from './modules/delivery-site-to-patient/delivery-site-to-patient.component';
import { NurseToPatientComponent } from './modules/nurse-to-patient/nurse-to-patient.component';
import { SiteToSiteComponent } from './modules/site-to-site/site-to-site.component';
import { ExportedStudyMaterialComponent } from './modules/exported-study-material/exported-study-material.component';
import { ExpireDateChangeComponent } from './modules/expire-date-change/expire-date-change.component';

@NgModule({
  declarations: [
    ReturnStudyMaterialComponent,
    DistructStudyMaterialComponent,
    DeliveryStudyMaterialComponent,
    DeliverySiteToPatientComponent,
    NurseToPatientComponent,
    SiteToSiteComponent,
    ExportedStudyMaterialComponent,
    ExpireDateChangeComponent
  ],
  imports: [
    CommonModule,
    StudyManageRoutingModule,
    FlexLayoutModule,
    DynamicFormGeneratorModule,
    MaterialLibModuleModule,
    TranslateModule,
    DynamicPrintReceiptGeneratorModule
  ],
  providers: [ConfirmationService, DatePipe],
})
export class StudyManageModule { }
