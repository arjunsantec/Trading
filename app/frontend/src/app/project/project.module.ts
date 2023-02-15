import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectMainPageComponent } from './modules/project-main-page/project-main-page.component';
import { ProjectRoutingModule } from './project-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialLibModuleModule } from '../material-lib-module/material-lib-module.module';
import { ConfirmationService } from 'primeng/api';
import { DynamicFormGeneratorModule } from '../dynamic-form-generator/dynamic-form-generator.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProformaKitCreationComponent } from './modules/proforma-kit-creation/proforma-kit-creation.component';
import { CmtrfFormComponent } from './modules/cmtrf-form/cmtrf-form.component';
 import { TableFieldComponent } from '../dynamic-form-generator/fields/table-field/table-field.component';

@NgModule({
  declarations: [
    ProjectMainPageComponent,
    ProformaKitCreationComponent,
    CmtrfFormComponent,
  ],
  imports: [
    CommonModule,
    ProjectRoutingModule,
    FlexLayoutModule,
    MaterialLibModuleModule,
    DynamicFormGeneratorModule,
    TranslateModule
  ],
  providers: [ConfirmationService]
})
export class ProjectModule { }
