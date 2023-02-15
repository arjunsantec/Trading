import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeMainPageComponent } from './components/home-main-page/home-main-page.component';
import { HomeRoutingModule } from './home-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MaterialLibModuleModule } from '../material-lib-module/material-lib-module.module';
import { ProjectDashboardComponent } from './components/project-dashboard/project-dashboard.component';
import { WarehouseDashboardComponent } from './components/warehouse-dashboard/warehouse-dashboard.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [
    HomeMainPageComponent,
    ProjectDashboardComponent,
    WarehouseDashboardComponent,
    NotificationsComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FlexLayoutModule,
    MaterialLibModuleModule,
    TranslateModule,
  ]
})
export class HomeModule { }
