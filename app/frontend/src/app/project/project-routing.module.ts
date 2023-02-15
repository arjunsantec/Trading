import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CmtrfFormComponent } from './modules/cmtrf-form/cmtrf-form.component';
import { ProformaKitCreationComponent } from './modules/proforma-kit-creation/proforma-kit-creation.component';
import { ProjectMainPageComponent } from './modules/project-main-page/project-main-page.component';

const routes: Routes = [
  {
    path: 'project', component: ProjectMainPageComponent
  },
  {
    path: 'kitcreation', component: ProformaKitCreationComponent
  },
  {
    path: 'CMTRF', component: CmtrfFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProjectRoutingModule { }
