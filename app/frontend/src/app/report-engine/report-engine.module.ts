import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ReportEngineRoutingModule } from './report-engine-routing.module';
import { ReportViewerComponent } from './modules/report-viewer/report-viewer.component';
import { ReportListComponent } from './modules/report-list/report-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DynamicFormGeneratorModule } from '../dynamic-form-generator/dynamic-form-generator.module';
import { MaterialLibModuleModule } from '../material-lib-module/material-lib-module.module';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';


@NgModule({
  declarations: [
    ReportViewerComponent,
    ReportListComponent
  ],
  imports: [
    CommonModule,
    ReportEngineRoutingModule,
    FlexLayoutModule,
    DynamicFormGeneratorModule,
    MaterialLibModuleModule,
    TranslateModule,
    FormsModule,
  ],
  providers: [ConfirmationService, DatePipe]
})
export class ReportEngineModule { }
