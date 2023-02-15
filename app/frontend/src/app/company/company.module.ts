import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyMainPageComponent } from './modules/company-main-page/company-main-page.component';
import { AppSettingsMainPageComponent } from './modules/app-settings-main-page/app-settings-main-page.component';
import { CompanyUserMainPageComponent } from './modules/company-user-main-page/company-user-main-page.component';
import { DepartmentMainPageComponent } from './modules/department-main-page/department-main-page.component';
import { CompanyRoutingModule } from './company-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialLibModuleModule } from '../material-lib-module/material-lib-module.module';
import { ConfirmationService } from 'primeng/api';
import { DynamicFormGeneratorModule } from '../dynamic-form-generator/dynamic-form-generator.module';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    CompanyMainPageComponent,
    AppSettingsMainPageComponent,
    CompanyUserMainPageComponent,
    DepartmentMainPageComponent
  ],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    FlexLayoutModule,
    DynamicFormGeneratorModule,
    MaterialLibModuleModule,
    TranslateModule
  ],
  providers: [ConfirmationService]
})
export class CompanyModule { }
