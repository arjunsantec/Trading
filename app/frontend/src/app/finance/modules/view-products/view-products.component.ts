import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProductTagging } from 'src/app/shared/models/inventory.model';
import { productMaster } from 'src/app/shared/models/product.model';
import { ProductMasterService } from 'src/app/master/modules/product-master-main-page/services/product-master.service';
import * as moment from 'moment';
import * as xlsx from 'xlsx';
import { ProductTaggingService } from 'src/app/inventory/modules/product-tagging/services/product-tagging.service';
import { ProjectService } from 'src/app/project/modules/project-main-page/services/project.service';
import { ProjectCreation } from 'src/app/shared/models/project.model';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-view-products',
  templateUrl: './view-products.component.html',
  styleUrls: ['./view-products.component.scss']
})
export class ViewProductsComponent implements OnInit {

  productTagging: ProductTagging | any = {};
  productTaggingtList: ProductTagging[] = new Array<ProductTagging>();
  showProductTaggingModifier: boolean = false;
  formFields: any = [];
  columns: any = [];
  projectList: ProjectCreation[] = new Array<ProjectCreation>();
  page_count:any =0;
  page=1
  project_id: number;
  to_date: string;
  f_date: string;
  Excelfile: string;
  tag_id: any;

  constructor(private _sharedService: SharedService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService,
    private _productTaggingService: ProductTaggingService,
    private _projectService: ProjectService,
    private routes: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.setViewProductsFields();
    this.setProductTaggingTable();
    this.getProjectList();
    
  }
  productName:string;
  wareHouseName:string;
  zoneName:string;
  rackName:string;
  levelName:string;
  shelfName:string;
  projectName:string;
 

  setProductTaggingTable() {
    this.columns = [
      { field: 'project__project_name', label: 'project_TC' },
      { field: 'load_date', label: 'loadDate_TC' },
      { field: 'unload_date', label: 'unloadDate_TC' },
      { field: 'price', label:'price_TC'},
      { field: 'product__product_name', label: 'product_TC' },
      { field: 'ware_house__warehouse_name', label: 'ware_house_TC' },
      { field: 'zone__zone_name', label: 'zone_TC' },
      { field: 'rack__rack_name', label: 'rack_TC' },
      { field: 'level__level_name', label: 'zoneLevelCreation_TC' },
      { field: 'shelf__shelf_name', label: 'shelf_TC' },
      { field: 'batch_no', label: 'batchNo_TC' },
      
      // { field: 'expiry', label: 'expiry_TC' },
      // { field: 'recevied_qty', label: 'recevied_qty_TC' },
      
      
      // {field: 'isApproved', label: 'isApproved_TC'},
      // { field: 'grn_details', label: 'grnDetails_TC' },
    ];
  }

  globalSearch(event: any, dt: any) {
    console.log("check event",dt)
    console.log("check value",event.target.value)
    return dt.filterGlobal(event.target._value, 'contains');
  }

  export(dt: any) {
    console.log("check dt",dt)
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', {
      entity: this.translate.instant('projectLoading_TC'),
    });
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {
      entity: this.translate.instant('projectLoading_TC'),
    });
  } 

  getFields() {
    return this.formFields;
  }

  clearProductTagging() {
    this.productTagging = {};
    this.setViewProductsFields();
  }

  setViewProductsFields() {
    this.formFields = [
      {
        
            type: 'dropdown',
            name: 'project',
            label: this.translate.instant('project_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('project_TC'),
            }),
            value: this.productTagging.project,
            // validation: {
            //   required: true,
            // },
            options: this.projectList,
            optionLabel: "projectName",
            optionValue: "id",


            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('productName_TC') }),
            // }
          },
          {
            type: 'date',
            name: 'load_date',
            label: this.translate.instant('fromdate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('fromdate_TC'),
            }),
            value: this.productTagging.load_date,
            readonly: false,
            // validation: {
            //   required: true,
            //   minlength: 1,
            // },
            // errorText: {
            //   required: this.translate.instant('formRequiredError_SC', {
            //     label: this.translate.instant('date_tc'),
            //   }),
            //   minlength: this.translate.instant('formMinLengthError_SC', {
            //     label: this.translate.instant('date_tc'),
            //     char: this.translate.instant('one_number'),
            //   }),
            // },
          },
          {
            type: 'date',
            name: 'unload_date',
            label: this.translate.instant('todate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('todate_TC'),
            }),
            value: this.productTagging.unload_date,
            readonly: false,
            // validation: {
            //   required: true,
            //   minlength: 1,
            // },
            // errorText: {
            //   required: this.translate.instant('formRequiredError_SC', {
            //     label: this.translate.instant('date_tc'),
            //   }),
            //   minlength: this.translate.instant('formMinLengthError_SC', {
            //     label: this.translate.instant('date_tc'),
            //     char: this.translate.instant('one_number'),
            //   }),
            // },
          },
        
      
      
    ]
}
getProjectList() {
  this._projectService.getProjectList().subscribe((response) => {
    console.log('project list', response);
    if (response?.results) {
      this.projectList = response?.results;
      console.log('project list', this.projectList);
      this.setViewProductsFields();
    }
  })
}

getProductList(productTagging: ProductTagging) {
  console.log("check list",productTagging)
// this.page=event.first+1;
 
  productTagging.load_date = moment(productTagging?.load_date).format("YYYY-MM-DD");
  productTagging.unload_date = moment(productTagging?.unload_date).format("YYYY-MM-DD");
  this.project_id = productTagging.project;
  this.f_date = productTagging.load_date;
  this.to_date = productTagging.unload_date;
  // productTagging.project = this.project_id;
  this._productTaggingService.getViewProductsList(productTagging.project,productTagging.load_date,productTagging.unload_date,this.page).subscribe(
    (response)=>{
      console.log("check data",response)
      this.productTaggingtList = response.page_data;
      this.page_count = response.count;
      console.log("page cpount",this.page_count)
      this.setProductTaggingTable();
    }
  )
    
}
nextPage(event){
  console.log("check event",event);
  console.log("check project",this.project_id);
  console.log("check f date",this.f_date);
  console.log("check to date",this.to_date);
  this.page = event.first + 1;
  this._productTaggingService.getViewProductsList(this.project_id,this.f_date,this.to_date,this.page).subscribe(
    (response)=>{
      console.log("check data",response)
      this.productTaggingtList = response.page_data;
      this.page_count = response.count;
      console.log("page cpount",this.page_count)
      this.setProductTaggingTable();
    })
// this.page=event.first + 1;
// this.getProductList();
}

exportToexel(): void {
  let element = document.getElementById("excel-table")
  console.log("check element", element)
  const ws: xlsx.WorkSheet = xlsx.utils.table_to_sheet(element, { raw: true });
  console.log("check ws", ws)
  //     var fmt = "0.00";
  // /* change cell format of range B2:D4 */
  // var range = { s: {r:1, c:1}, e: {r:2, c:3} };
  // for(var R = range.s.r; R <= range.e.r; ++R) {
  //   for(var C = range.s.c; C <= range.e.c; ++C) {
  //     var cell = ws[xlsx.utils.encode_cell({r:R,c:C})];
  //     if(!cell || cell.t != 'n') continue; // only format numeric cells
  //     cell.z = fmt;
  //   }
  // }
  //   var wscols = [
  //     // {wch: 6}, // "characters"
  //     {wpx: 200},
  //     {wpx: 200},
  //     // {hidden: true} // hide column
  // ];
  // ws['!cols'].push( {wpx: 200});
  const wb: xlsx.WorkBook = xlsx.utils.book_new();
  console.log("check wb", wb)
  xlsx.utils.book_append_sheet(wb, ws, "Sheet1");
  // xlsx.writeFile(wb, this.Excelfile)
  xlsx.writeFile(wb, this.Excelfile, { bookType: 'xlsx', type: 'buffer' });

}

editProductTagging(productTagging: ProductTagging) {
  console.log("check data",productTagging.id);
  this.routes.navigateByUrl('/inventory/productTagging?tag_id='+productTagging.id);
  this.showProductTaggingModifier = true;
  // console.log("Product tagging", productTagging)
  // this.productTagging = { ...productTagging };
  // if (productTagging.ware_house != null && productTagging.zone != null ){
  // this.onChangeWareHouseValue(1,productTagging.ware_house,1);
  // }

  // if (productTagging.zone != null && productTagging.rack != null ){
  //   this.onChangeStorageZoneValue(1,productTagging.zone,1);
  //   this.getLevelList(productTagging.rack);
  // }
  // console.log("check data", this.productTagging)
  // if (productTagging.rack != null && productTagging.level != null) {
  //   this.getShelfList(productTagging.zone, productTagging.rack, productTagging.level)
  // }
  // if (productTagging.storage_type != null){
  //   this.getSTorageList(productTagging.storage_type);

  // }
  // this.setProductTaggingFields();
  // this.showProductTaggingModifier = true;
}
}
