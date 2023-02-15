import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { WareHouseCreation } from 'src/app/shared/models/wareshouse.model';
import { WareshouseCreationService } from 'src/app/wareshouse/modules/warehouse-creation/services/wareshouse-creation.service';

import { zoneLevelCreation } from 'src/app/shared/models/wareshouse.model';
import { ZoneLevelCreationService } from 'src/app/wareshouse/modules/zone-level-creation/services/zone-level-creation.service';

import { ShelfCreation, shelf_creation_list} from 'src/app/shared/models/wareshouse.model';
import { ShelfCreationService } from 'src/app/wareshouse/modules/shelf-creation/services/shelf-creation.service';
import { HomeService } from '../../home.service';
import { MaterialReceipt } from 'src/app/shared/models/inventory.model';
import { MaterialReceiptService } from 'src/app/inventory/modules/material-receipt-main-page/services/material-receipt.service';

@Component({
  selector: 'app-warehouse-dashboard',
  templateUrl: './warehouse-dashboard.component.html',
  styleUrls: ['./warehouse-dashboard.component.scss']
})
export class WarehouseDashboardComponent implements OnInit {

  materialReceiptList: MaterialReceipt[] = new Array<MaterialReceipt>();

  shelfCount: number = 0;
  wareHouseCount: number = 0;
  rackCount: number = 0;
  closedShelfCount: number = 0;
  occupied: number = 0;

  // products = [
  //   {
  //     invoiceNo:'INV001',
  //     invoiceDate:'2022/01/01',
  //     noOfItems:'10',
  //     status:'PEDNING APPROVAL',
  //   },
  //   {
  //     invoiceNo:'INV001',
  //     invoiceDate:'2022/01/01',
  //     noOfItems:'10',
  //     status:'PEDNING APPROVAL',
  //   },
  // ]

  constructor(public translate: TranslateService,
    private _homeService: HomeService,
    private _materialReceiptService: MaterialReceiptService,
    ) { }

  ngOnInit(): void {
    this.getRackCount();
    this.getShelfCount();
    this.getWarehouseCount();
    this.getClosedShelfCount();
    this.getMaterialReceiptList();
  }

  getWarehouseCount() {
    this._homeService.getWarehouseCount().subscribe(
      (response) => {
        if (response) {
          this.wareHouseCount = response;
          // console.log("wareHouse Count",this.wareHouseCount)
        }
      }
    )
  }

  getShelfCount() {
    this._homeService.getShelfCount().subscribe(
      (response) => {
        // console.log(response);
        // if (response) {
          this.shelfCount = response;
          console.log("shelf Count",this.shelfCount)
        // }
      }
    )
  }

  getRackCount() {
    this._homeService.getRackCount().subscribe(
      (response) => {
        // console.log(response);
        if (response) {
          this.rackCount = response;
          // console.log("rack Count",this.rackCount)
        }
      }
    )
  }

  getClosedShelfCount() {
    this._homeService.getClosedShelfCount().subscribe(
      (response) => {
        // console.log(response);
        // if (response) {
          this.closedShelfCount = response;
          console.log("closed shelf Count",this.closedShelfCount)
        // }
      }
    )
  }

  getMaterialReceiptList() {
    this._materialReceiptService.getMaterialReceiptList().subscribe(
      (response) => {
        // console.log(response);
        if (response?.results) {
          this.materialReceiptList = response?.results;
        }
      });
  }

  getOccupied() {
    // this.occupied = ;
    this.occupied = Number.parseFloat((this.closedShelfCount/this.shelfCount*100 || 0).toFixed(2))
    // console.log('shelf Count, closed shelf Count, occupied', this.shelfCount, this.closedShelfCount, this.occupied);
    return this.occupied
  }

}
