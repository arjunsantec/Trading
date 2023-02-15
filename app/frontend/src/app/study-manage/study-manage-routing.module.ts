import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReturnStudyMaterialComponent } from './modules/return-study-material/return-study-material.component';
import { DistructStudyMaterialComponent } from './modules/distruct-study-material/distruct-study-material.component';
import { DeliveryStudyMaterialComponent } from './modules/delivery-study-material/delivery-study-material.component';
import { DeliverySiteToPatientComponent } from './modules/delivery-site-to-patient/delivery-site-to-patient.component';
import { NurseToPatientComponent } from './modules/nurse-to-patient/nurse-to-patient.component';
import { SiteToSiteComponent } from './modules/site-to-site/site-to-site.component';
import { ExportedStudyMaterialComponent } from './modules/exported-study-material/exported-study-material.component';
import { ExpireDateChangeComponent } from './modules/expire-date-change/expire-date-change.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'study-material', pathMatch: 'full'
  },
  {
    path: 'studyMaterialDelivery', component: DeliveryStudyMaterialComponent
  },
  {
    path: 'studyMaterialReturn', component: ReturnStudyMaterialComponent
  },
  {
    path: 'studyMaterialDistruct', component: DistructStudyMaterialComponent
  },
  {
    path: 'siteToPatientDelivery', component: DeliverySiteToPatientComponent
  },
  {
    path: 'nurseToPatient', component: NurseToPatientComponent
  },
  {
    path: 'siteToSite', component: SiteToSiteComponent
  },
  {
    path: 'studyMaterialExported', component: ExportedStudyMaterialComponent
  },
  {
    path: 'expireDateChange', component: ExpireDateChangeComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudyManageRoutingModule { }
