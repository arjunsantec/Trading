import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewProductsComponent } from './modules/view-products/view-products.component';
import { PriceSettingComponent } from './modules/price-setting/price-setting.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'grn-details', pathMatch: 'full'
  },
  {
    path: 'viewProducts', component: ViewProductsComponent
  },
  {
    path: 'priceSetting', component: PriceSettingComponent
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FinanceRoutingModule { }
