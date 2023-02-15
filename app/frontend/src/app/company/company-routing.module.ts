import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppSettingsMainPageComponent } from './modules/app-settings-main-page/app-settings-main-page.component';
import { CompanyMainPageComponent } from './modules/company-main-page/company-main-page.component';
import { CompanyUserMainPageComponent } from './modules/company-user-main-page/company-user-main-page.component';
import { DepartmentMainPageComponent } from './modules/department-main-page/department-main-page.component';

const routes: Routes = [
  {
    path: '', component: CompanyMainPageComponent
  },
  {
    path: 'companyUser', component: CompanyUserMainPageComponent
  },
  {
    path: 'appSettings', component: AppSettingsMainPageComponent
  },
  {
    path: 'department', component: DepartmentMainPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
