import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCategoryMainPageComponent } from './modules/product-category-main-page/product-category-main-page.component';
import { ProductSubcategoryMainPageComponent } from './modules/product-subcategory-main-page/product-subcategory-main-page.component';
import { MasterRoutingModule } from './master-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DynamicFormGeneratorModule } from '../dynamic-form-generator/dynamic-form-generator.module';
import { MaterialLibModuleModule } from '../material-lib-module/material-lib-module.module';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { PartyMasterMainPageComponent } from './modules/party-master-main-page/party-master-main-page.component';
import { UnitMasterMainPageComponent } from './modules/unit-master-main-page/unit-master-main-page.component';
import { ProductMasterMainPageComponent } from './modules/product-master-main-page/product-master-main-page.component';



@NgModule({
  declarations: [
    ProductCategoryMainPageComponent,
    ProductSubcategoryMainPageComponent,
    PartyMasterMainPageComponent,
    UnitMasterMainPageComponent,
    ProductMasterMainPageComponent
  ],
  imports: [
    CommonModule,
    MasterRoutingModule,
    FlexLayoutModule,
    DynamicFormGeneratorModule,
    MaterialLibModuleModule,
    TranslateModule
  ],
  providers: [ConfirmationService]
})
export class MasterModule { }
