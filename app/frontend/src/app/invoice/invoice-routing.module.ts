import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceMainPageComponent } from './modules/invoice-main-page/invoice-main-page.component';

const routes: Routes = [
  {
    path: 'invoice', component: InvoiceMainPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
