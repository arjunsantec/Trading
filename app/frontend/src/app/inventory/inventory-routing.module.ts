import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GrnDetailsMainPageComponent } from './modules/grn-details-main-page/grn-details-main-page.component';
import { MaterialReceiptMainPageComponent } from './modules/material-receipt-main-page/material-receipt-main-page.component';
import { ProductTaggingComponent } from './modules/product-tagging/product-tagging.component';

const routes: Routes = [
  {
    path: '', redirectTo: 'grn-details', pathMatch: 'full'
  },
  {
    path: 'grnDetails', component: GrnDetailsMainPageComponent
  },
  {
    path: 'materialReceipt', component: MaterialReceiptMainPageComponent
  },
  {
    path: 'productTagging', component: ProductTaggingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InventoryRoutingModule { }
