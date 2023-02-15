import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './shared/common/auth.gaurd';
import { FormPlaygroundComponent } from './shared/components/form-playground/form-playground.component';
import { LoginComponent } from './shared/components/login/login.component';
import { PasswordResetComponent } from './shared/components/password-reset/password-reset.component';
import { RegisterComponent } from './shared/components/register/register.component';
import { SelectCompanyComponent } from './shared/components/select-company/select-company.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]
  },
  {
    path: 'company', loadChildren: () => import('./company/company.module').then(m => m.CompanyModule),
  },
  {
    path: 'master', loadChildren: () => import('./master/master.module').then(m => m.MasterModule), canActivate: [AuthGuard]
  },
  {
    path: 'inventory', loadChildren: () => import('./inventory/inventory.module').then(m => m.InventoryModule), canActivate: [AuthGuard]
  },
  {
    path: 'wareshouse', loadChildren: () => import('./wareshouse/wareshouse.module').then(m => m.WareshouseModule),
  },
  {
    path: 'finance', loadChildren: () => import('./finance/finance.module').then(m => m.FinanceModule),
  },
  {
    path: 'studymanage', loadChildren: () => import('./study-manage/study-manage.module').then(m => m.StudyManageModule),
  },
  {
    path: 'inward', loadChildren: () => import('./project/project.module').then(m => m.ProjectModule), canActivate: [AuthGuard]
  },
  {
    path: 'report', loadChildren: () => import('./report-engine/report-engine.module').then(m => m.ReportEngineModule), canActivate: [AuthGuard]
  },
  {
    path: 'invoice', loadChildren: () => import('./invoice/invoice.module').then(m => m.InvoiceModule), canActivate: [AuthGuard]
  },
  { 
    path: 'selectCompany', component: SelectCompanyComponent 
  },
  { 
    path: 'login', component: LoginComponent 
  },
  { 
    path: 'register', component: RegisterComponent 
  },
  { 
    path: 'reset-password', component: PasswordResetComponent, canActivate: [AuthGuard] 
  },
  { 
    path: 'form-route', component: FormPlaygroundComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
