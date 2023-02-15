import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MaterialReceiptService } from 'src/app/inventory/modules/material-receipt-main-page/services/material-receipt.service';
import { MaterialReceipt } from 'src/app/shared/models/inventory.model';
import { HomeService } from '../../home.service';

@Component({
  selector: 'app-project-dashboard',
  templateUrl: './project-dashboard.component.html',
  styleUrls: ['./project-dashboard.component.scss']
})
export class ProjectDashboardComponent implements OnInit {

  materialReceiptList: MaterialReceipt[] = new Array<MaterialReceipt>();
  
  projectCount: number = 0;

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
    private _materialReceiptService: MaterialReceiptService,) { }

  ngOnInit(): void {
    this.getProjectCount();
    this.getMaterialReceiptList();
  }

  getProjectCount() {
    this._homeService.getProjectCount().subscribe(
      (response) => {
        // console.log("Project Count", response);
        if (response) {
          this.projectCount = response;
          // console.log("Project Count",this.projectCount)
        }
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

}
