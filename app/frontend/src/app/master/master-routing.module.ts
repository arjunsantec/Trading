import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PartyMasterMainPageComponent } from './modules/party-master-main-page/party-master-main-page.component';
import { ProductCategoryMainPageComponent } from './modules/product-category-main-page/product-category-main-page.component';
import { ProductMasterMainPageComponent } from './modules/product-master-main-page/product-master-main-page.component';
import { ProductSubcategoryMainPageComponent } from './modules/product-subcategory-main-page/product-subcategory-main-page.component';
import { UnitMasterMainPageComponent } from './modules/unit-master-main-page/unit-master-main-page.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'product-category', pathMatch: 'full'
  },
  {
    path: 'productCategory', component: ProductCategoryMainPageComponent
  },
  {
    path: 'productSubcategory', component: ProductSubcategoryMainPageComponent
  },
  { 
    path: 'partyMaster', component: PartyMasterMainPageComponent
  },
  { 
    path: 'unitMaster', component: UnitMasterMainPageComponent 
  },
  { 
    path: 'productMaster', component: ProductMasterMainPageComponent 
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MasterRoutingModule { }
