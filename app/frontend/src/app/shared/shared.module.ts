import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TopbarComponent } from './components/topbar/topbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DynamicFormGeneratorModule } from '../dynamic-form-generator/dynamic-form-generator.module';
import { MaterialLibModuleModule } from '../material-lib-module/material-lib-module.module';
import { MenuListComponent } from './components/menu-list/menu-list.component';
import { PasswordResetComponent } from './components/password-reset/password-reset.component';
import { FooterComponent } from './components/footer/footer.component';
import { FormPlaygroundComponent } from './components/form-playground/form-playground.component';
import { TranslateModule } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import { SelectCompanyComponent } from './components/select-company/select-company.component';



@NgModule({
  declarations: [
    TopbarComponent,
    LoginComponent,
    RegisterComponent,
    MenuListComponent,
    PasswordResetComponent,
    FooterComponent,
    FormPlaygroundComponent,
    SelectCompanyComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    FlexLayoutModule,
    DynamicFormGeneratorModule,
    MaterialLibModuleModule,
    TranslateModule
  ],
  exports: [
    TopbarComponent,
    LoginComponent,
    RegisterComponent,
    FooterComponent
  ],
  providers: [MessageService]
})
export class SharedModule { }
