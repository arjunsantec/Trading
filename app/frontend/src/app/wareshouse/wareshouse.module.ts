import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';

import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { DynamicFormGeneratorModule } from '../dynamic-form-generator/dynamic-form-generator.module';
import { MaterialLibModuleModule } from '../material-lib-module/material-lib-module.module';
import { StorageZoneCreationComponent } from './modules/storage-zone-creation/storage-zone-creation.component';
import { WarehouseCreationComponent } from './modules/warehouse-creation/warehouse-creation.component';
import { WareshouseRoutingModule } from './wareshouse-routing.module';
import { ZoneLevelCreationComponent } from './modules/zone-level-creation/zone-level-creation.component';
import { ShelfCreationComponent } from './modules/shelf-creation/shelf-creation.component';
import { AcceptanceOfGoodsComponent } from './modules/acceptance-of-goods/acceptance-of-goods.component';
import { RackToRackComponent } from './modules/rack-to-rack/rack-to-rack.component';
import { ZontToZoneComponent } from './modules/zont-to-zone/zont-to-zone.component';
import { DynamicPrintReceiptGeneratorModule } from '../dynamic-print-receipt-generator/dynamic-print-receipt-generator.module';
import { PalletCreationComponent } from './modules/pallet-creation/pallet-creation.component';
import { RefrigerationComponent } from './modules/refrigeration/refrigeration.component';
import { StorageTypeCreationComponent } from './modules/storage-type-creation/storage-type-creation.component';


@NgModule({
  declarations: [
    WarehouseCreationComponent,
    StorageZoneCreationComponent,
    ZoneLevelCreationComponent,
    ShelfCreationComponent,
    AcceptanceOfGoodsComponent,
    RackToRackComponent,
    ZontToZoneComponent,
    PalletCreationComponent,
    RefrigerationComponent,
    StorageTypeCreationComponent,

  ],
  imports: [
    CommonModule,
    WareshouseRoutingModule,
    FlexLayoutModule,
    DynamicFormGeneratorModule,
    MaterialLibModuleModule,
    TranslateModule,
    DynamicPrintReceiptGeneratorModule
  ],
  providers: [ConfirmationService, DatePipe],
})
export class WareshouseModule {}
