import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReportListComponent } from './modules/report-list/report-list.component';
import { ReportViewerComponent } from './modules/report-viewer/report-viewer.component';

const routes: Routes = [
  {
    path: 'list', component: ReportListComponent
  },
  {
    path: 'viewer', component: ReportViewerComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportEngineRoutingModule { }
