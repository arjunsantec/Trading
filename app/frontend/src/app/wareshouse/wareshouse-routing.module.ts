import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StorageZoneCreationComponent } from './modules/storage-zone-creation/storage-zone-creation.component';
import { WarehouseCreationComponent } from './modules/warehouse-creation/warehouse-creation.component';

import { ZoneLevelCreationComponent } from './modules/zone-level-creation/zone-level-creation.component';

import { ShelfCreationComponent } from './modules/shelf-creation/shelf-creation.component';

import { AcceptanceOfGoodsComponent } from './modules/acceptance-of-goods/acceptance-of-goods.component';

import { RackToRackComponent } from './modules/rack-to-rack/rack-to-rack.component';
import { ZontToZoneComponent } from './modules/zont-to-zone/zont-to-zone.component';
import { PalletCreationComponent } from './modules/pallet-creation/pallet-creation.component';
import { RefrigerationComponent } from './modules/refrigeration/refrigeration.component';
import { StorageTypeCreationComponent } from './modules/storage-type-creation/storage-type-creation.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'warehouse',
    pathMatch: 'full',
  },
  {
    path: 'wareHouseCreation',
    component: WarehouseCreationComponent,
  },
  {
    path: 'StorageZone',
    component: StorageZoneCreationComponent,
  },

  {

    path: 'zoneLevelCreation',
    component: ZoneLevelCreationComponent,

  },

  {
    path: 'ShelfCreation',
    component: ShelfCreationComponent,
  },
  {

    path: 'GoodsAcceptance',
    component: AcceptanceOfGoodsComponent,
    },
{
    path: 'RackToRackTransfer',
    component: RackToRackComponent,
  },
  {
    path: 'ZoneToZoneTransfer',
    component: ZontToZoneComponent,
  },
  {
    path: 'PalletCreation', component: PalletCreationComponent,
  },
  {
    path: 'Refrigeration', component: RefrigerationComponent,
  },
  {
    path: 'StorageType', component: StorageTypeCreationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WareshouseRoutingModule {}
