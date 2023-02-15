import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ProductTaggingService } from 'src/app/inventory/modules/product-tagging/services/product-tagging.service';
import { ProductMasterService } from 'src/app/master/modules/product-master-main-page/services/product-master.service';
import { ProductTagging } from 'src/app/shared/models/inventory.model';
import { productMaster } from 'src/app/shared/models/product.model';
import { ZoneCreation, zoneTozoneTransfer, zone_to_zone_list } from 'src/app/shared/models/wareshouse.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StorageZoneCreationServiceService } from '../storage-zone-creation/services/storage-zone-creation-service.service';
import { ZoneToZoneService } from './services/zone-to-zone.service';
import { WareshouseCreationService } from '../warehouse-creation/services/wareshouse-creation.service';
import { WareHouseCreation } from 'src/app/shared/models/wareshouse.model';
import * as moment from 'moment';
// import { StorageZoneCreationServiceService } from '../storage-zone-creation/services/storage-zone-creation-service.service';


@Component({
  selector: 'app-zont-to-zone',
  templateUrl: './zont-to-zone.component.html',
  styleUrls: ['./zont-to-zone.component.scss']
})
export class ZontToZoneComponent implements OnInit {

  columns: any = [];
  formFields: any = [];
  zoneToZoneTransfer: zoneTozoneTransfer | any = {};
  zoneToZoneTransferList: zoneTozoneTransfer[] = new Array<zoneTozoneTransfer>();
  zoneToZoneTransferItems: zone_to_zone_list[] = new Array<zone_to_zone_list>();
  showzoneToZoneTransferModifier: boolean = false;
  selectedzoneToZoneTransferItem: zoneTozoneTransfer[] = new Array<zoneTozoneTransfer>();

  showZoneToZonePrintModifier: boolean = false;
  printFields: any = [];
  zoneToZoneObject = {};
  w_id:any;
  z_id:any;

  filteredProductList: any = [];
  wareHouseList: WareHouseCreation[] = new Array<WareHouseCreation>();
  productTagging: ProductTagging | any = {};
  productMasterList: productMaster[] = new Array<productMaster>();
  productTaggingtList: ProductTagging[] = new Array<ProductTagging>();
  storageZoneCreationList: ZoneCreation[] = new Array<ZoneCreation>();
  batch_list: any =[];
  list: any=[];
  approved:boolean = false;

  constructor(public translate: TranslateService,
    private _sharedService: SharedService,
    private _zoneTransferService: ZoneToZoneService,
    private confirmationService: ConfirmationService,
    private _productMasterService: ProductMasterService,
    private _productTaggingService: ProductTaggingService,
    private _zoneService: StorageZoneCreationServiceService,
    private _wareHouseService: WareshouseCreationService,
    ) { }

  ngOnInit(): void {
    this.setZoneToZoneTransferTable();
    this.setZoneToZoneTransferFields();
    this.getZoneTransferList();
    this.getProductList(0);
    // this.getProductMasterList();
    // this.getStorageZoneCreationList();
    this.getWareHouseCreationList();
  }

  setZoneToZoneTransferTable() {
    this.columns = [
      { field: 'document', label: 'document_TC' },
      // { field: 'transferDate', label: 'transferdate_TC' },
      { field: 'wareHouseName', label: 'wareHouseName_TC' },
      { field: 'fromZoneName', label: 'fromZone_TC' },
      { field: 'toZoneName', label: 'toZone_TC' },
      // { field: 'project', label: 'project_TC' },
    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('zoneToZone_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('zoneToZone_TC') })
  }


  setZoneToZoneTransferFields() {
    this.formFields = [
      {
        type: 'text',
        name: 'document',
        label: this.translate.instant('document_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('document_TC') }),
        value: this.zoneToZoneTransfer.document,
        // validation: {
        //   required: true,
        //   maxlength: 50,
        // },
        // errorText: {
        //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('document_TC') }),
        //   maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('document_TC'), char: this.translate.instant('fifty_number') }),
        // }
      },
      {
        type: 'date',
        name: 'transferDate',
        label: this.translate.instant('transfer_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('transfer_TC') }),
        value: this.zoneToZoneTransfer.transferDate,
        // validation: {
        //   required: true,
        //   maxlength: 50,
        // },
        // errorText: {
        //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('document_TC') }),
        //   maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('document_TC'), char: this.translate.instant('fifty_number') }),
        // }
      },
      {
        type: 'text',
        name: 'invoice',
        label: this.translate.instant('Invoice_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('Invoice_TC') }),
        value: this.zoneToZoneTransfer.invoice,
        // validation: {
        //   required: true,
        //   maxlength: 50,
        // },
        // errorText: {
        //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('document_TC') }),
        //   maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('document_TC'), char: this.translate.instant('fifty_number') }),
        // }
      },
      {
        type: 'dropdown',
        name: 'wareHouse',
        label: this.translate.instant('ware_house_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', {
          label: this.translate.instant('ware_house_TC'),
        }),
        value: this.zoneToZoneTransfer.wareHouse,
        validation: {
          required: true,
        },
        options: this.wareHouseList,
        optionLabel: "wareHouseName",
        optionValue: "id",
        onValueChange: this.onChangeWareHouseValue.bind(this),
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('ware_house_TC') }),
        }
      },
      {
        type: 'dropdown',
        name: 'fromZone',
        label: this.translate.instant('fromZone_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', {
          label: this.translate.instant('fromZone_TC'),
        }),
        value: this.zoneToZoneTransfer.fromZone,
        validation: {
          required: true,
        },
        options: this.storageZoneCreationList,
        optionLabel: "zoneName",
        optionValue: "id",
        onValueChange: this.onChangeFromZoneValue.bind(this),
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('fromZone_TC') }),
        }
      },
      {
        type: 'dropdown',
        name: 'toZone',
        label: this.translate.instant('toZone_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', {
          label: this.translate.instant('toZone_TC'),
        }),
        value: this.zoneToZoneTransfer.toZone,
        validation: {
          required: true,
        },
        options: this.storageZoneCreationList,
        optionLabel: "zoneName",
        optionValue: "id",
        // onValueChange: this.onChangeMaterialReceiptValue.bind(this),
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('fromZone_TC') }),
        }
      },

      {
        type: 'table',
        name: 'zone_to_zone_list',
        label: this.translate.instant('zoneToZoneList_TC'),
        formInitialise: { product: '', batchNumber: '', kitNumber: '', serialNumber: '',trc_number:'',trc_date:'',expiry_date:'',manufacturer:'',min_temp:'',max_temp:'', received_qty: '', available_qty: '' },
        columnSchema: ['product_TC', 'batchNumber_TC', 'kitNumber_TC',  'serialNumber_TC', 'trc_no_TC','trc_date_TC','expiry_TC','manufacture_TC','minTemp_TC','maxTemp_TC', 'recevied_qty_TC', 'available_qty_TC', ],
        formSchema: [
          {
            type: 'dropdown',
            name: 'product',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('productName_TC') }),
            options: this.filteredProductList,
            optionLabel: "product_id__product_name",
            optionValue: "product_id",
            onValueChange: this.onChangeProductValue.bind(this),
          },
          {
            type: 'dropdown',
            name: 'batchNumber',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('batchNumber_TC') }),
            options: this.filteredProductList,
            optionLabel: "batch_no",
            optionValue: "batch_no",
            onValueChange: this.onChangeBatchValue.bind(this),
          },
          {
            name: 'kitNumber',
            type: 'input',
          },
          
          {
            name: 'serialNumber',
            type: 'input'
          },
          {
            name: 'trc_number',
            type: 'input'
          },
          {
            name: 'trc_date',
            type: 'date'
          },
          {
            name: 'expiry_date',
            type: 'date'
          },
          {
            name: 'manufacturer',
            type: 'input'
          },
          {
            name: 'min_temp',
            type: 'input'
          },
          {
            name: 'max_temp',
            type: 'input'
          },
          {
            name: 'received_qty',
            type: 'input'
          },
          {
            name: 'available_qty',
            type: 'input'
          },
          // {
          //   name: 'fromZone',
          //   type: 'input'
          // },
          // {
          //   type: 'dropdown',
          //   name: 'toZone',
          //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('storageZone_TC') }),
          //   options:  this.storageZoneCreationList,
          //   optionLabel: "zoneName",
          //   optionValue: "id",
          // },
        ],
        onCancelForm: this.resetRow.bind(this),
        dataKey: 'id',
        dataSource: this.zoneToZoneTransfer?.zone_to_zone_list ? this.zoneToZoneTransferItems : [],

      },
    ]
  }

  getFields() {
    return this.formFields;
  }

  resetRow(prevValue: any, tableValue: any) {
    return prevValue;
  }

  getWareHouseCreationList() {
    this._wareHouseService.getWareHouseCreationList().subscribe(
      (response) => {
        // console.log("warehouse list", this.goodsAcceptanceCreationFields);
        if (response?.results) {
          this.wareHouseList = response?.results;
          console.log("warehouse list",this.wareHouseList)
          this.setZoneToZoneTransferFields();
          // this.formFields[2].options = this.wareHouseList;
        }
      }
    )
  }

  onChangeWareHouseValue(prevValue: any, value: any, formValue: any) {
    const formValueUpdated: any = {};
    // console.log('field', this.zoneToZoneTransfer)
    // console.log("prev value",prevValue)
    // console.log("check value",value)
    // console.log("form value",formValue)

    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    console.log("form value",formValue)
    
    // Get Storage Zone creation list here
    this._zoneService.getStorageZoneCreationByWareHouse(formValue.wareHouse).subscribe(
      (response) =>{
        console.log("response",response)
        this.storageZoneCreationList = response?.results;
          console.log("storage Zone list", this.storageZoneCreationList);
          this.formFields[4].options = this.storageZoneCreationList;
          this.formFields[5].options = this.storageZoneCreationList;
          // this.setZoneToZoneTransferFields();
      }
    )
  
  }getproducts

  onChangeFromZoneValue(prevValue: any, value: any, formValue: any) {

    const formValueUpdated: any = {};
    console.log("form value",formValue);
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    this.w_id = formValue.wareHouse;
    this.z_id = formValue.fromZone;
    this._zoneTransferService.getproducts(formValue.fromZone,formValue.wareHouse).subscribe(
      (response) =>{
        console.log("check response of products",response)
        this.filteredProductList = response;
        this.formFields[6].formSchema[0].options=this.filteredProductList;

      }
    )


  }

  getProductList(wareHouse) {
    if(wareHouse >0){
      this._zoneTransferService.getallproducts(wareHouse).subscribe(
        (response) =>{
          console.log("check response of products",response)
          this.filteredProductList = response;
          this.formFields[6].formSchema[0].options=this.filteredProductList;
  
        }
      )
    }
    
  }

  // getProductList() {
  //   this._productservice.getProductMasterList().subscribe(
  //     (response) => {
  //       console.log("check Product list", response);
  //       if (response?.results) {
  //         this.filteredProductList = response?.results;
  //         console.log("product list", this.productList)

  //       }

  //     }
  //   )
  // }

  onChangeProductValue(value: any, tableValue: any) {
    console.log("check value",value);
    console.log("check table value",tableValue)
    const tableValueUpdated: any = {};
    if (tableValue) {
      Object.assign(tableValueUpdated, tableValue);
    }
    console.log("z",this.z_id)
    console.log("w",this.w_id)
    console.log("p",value)
    this._zoneTransferService.getBatchList(this.z_id,this.w_id,value).subscribe(
      (response)=>{
          console.log("check received batch details",response);
          this.batch_list = response;
          this.formFields[6].formSchema[1].options=this.batch_list;
      }
    )
    
    return tableValueUpdated;
  }

  

  onChangeBatchValue(value: any, tableValue: any){
    // console.log("table value",tableValue)
    const tableValueUpdated: any = {};
    
    if (tableValue) {
      Object.assign(tableValueUpdated, tableValue);
    }
    // console.log("check value",value)
    let l:any =[];
    if(value){

      tableValueUpdated.kitNumber = this.batch_list.filter(e => e.batch_no === value)[0]?.kit_no;
      tableValueUpdated.serialNumber = this.batch_list.filter(e => e.batch_no === value)[0]?.serial_number;
      tableValueUpdated.trc_number = this.batch_list.filter(e => e.batch_no === value)[0]?.trc_no;
      tableValueUpdated.trc_date = moment(this.batch_list.filter(e => e.batch_no === value)[0]?.trc_date).format("YYYY-MM-DD");
      tableValueUpdated.expiry_date = moment(this.batch_list.filter(e => e.batch_no === value)[0]?.expiry).format("YYYY-MM-DD");
      tableValueUpdated.manufacturer = this.batch_list.filter(e => e.batch_no === value)[0]?.manufacture;
      tableValueUpdated.min_temp = this.batch_list.filter(e => e.batch_no === value)[0]?.min_temp;
      tableValueUpdated.max_temp = this.batch_list.filter(e => e.batch_no === value)[0]?.max_temp;
      tableValueUpdated.received_qty = this.batch_list.filter(e => e.batch_no === value)[0]?.recevied_qty;
      tableValueUpdated.available_qty = this.batch_list.filter(e => e.batch_no === value)[0]?.available_qty;
      
    }
   
    return tableValueUpdated;
   
  }

  


    
    // getStorageZoneCreationList() {
    //   this._zoneService.getStorageZoneCreationList().subscribe(
    //     (response) => {
    //       console.log(response);
    //       if (response?.results) {
    //         this.storageZoneCreationList = response?.results;
    //         console.log("storage list", this.storageZoneCreationList)
    //         this.formFields[2].formSchema[6].options=    this.storageZoneCreationList
    //       }
    //     }
    //   )
    // }

  // Get Storage Zone transfer list here
  getZoneTransferList() {
    this._zoneTransferService.getZoneToZoneTransferList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.zoneToZoneTransferList = response?.results;
        }
      }
    )
  }


  //  to edit the added data
  editZoneTransfer(zoneTransfer: zoneTozoneTransfer) {
    this.approved = true;
    this.zoneToZoneTransferItems = zoneTransfer.zone_to_zone_list;
    console.log("data",this.zoneToZoneTransferItems)
    this.zoneToZoneTransfer = { ...zoneTransfer };
    console.log("data1",this.zoneToZoneTransfer)
    this.onChangeWareHouseValue(0, 0, zoneTransfer);
    this.onChangeFromZoneValue(0, 0, zoneTransfer);
    this.getProductList(zoneTransfer.wareHouse);
    this.setZoneToZoneTransferFields();
    this.showzoneToZoneTransferModifier = true;

  }


  deleteZoneTransfer(event: Event, zoneTransfer: zoneTozoneTransfer) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', { entity: zoneTransfer?.document }),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._zoneTransferService.removeZoneToZoneTransfer(zoneTransfer?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', { entity: zoneTransfer?.document })
            );
            this.getZoneTransferList();
          }
        )
      }
    });
  }

  //to save 
  saveZoneTransfer(zoneToZoneTransfer: zoneTozoneTransfer) {

    if (this.zoneToZoneTransfer?.id) {
      zoneToZoneTransfer.id = this.zoneToZoneTransfer?.id;
      this.clearZoneTransfer();
    }
    zoneToZoneTransfer.transferDate = moment(zoneToZoneTransfer?.transferDate).format("YYYY-MM-DD");
    this._zoneTransferService.zoneToZoneTransferModifier(zoneToZoneTransfer).subscribe(
      (response) => {
        console.log(response);
        if (Object.keys(response).length != 0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', { entity: zoneToZoneTransfer?.document })
          );
          this.showzoneToZoneTransferModifier = false;
          this.getZoneTransferList();
        }
      }
    )
  }

  clearZoneTransfer() {
    this.zoneToZoneTransfer = {};
    this.setZoneToZoneTransferFields();
  }

  generateFields() {
    this.printFields = [
      {
        type: 'header',
        label_1: 'ფორმა 056_სმ-ების გადატანა ზონიდან ზონაში',
        label_2: 'Form 056_Transfer of SMs from Zone to Zone',
      },
      {
        type: 'zonetozone',
        value: this.zoneToZoneObject,
      },
      {
        type: 'footerheader',
        label_1: `ინვოისი / Invoice - ${this.zoneToZoneObject['invoice']}`,
        label_2: 'დამატებითი ინფორმაცია / Additional Information',
      },
      {
        type: 'footerbody',
        label_1: `<div style='margin-bottom: 1px'>
        <p>საწყობი / Warehouse :  ${this.zoneToZoneObject['wareHouseName']} , ხელმოწერა / Signature : ________________________</p>
        <p>გადაადგილების თარიღი / Transfer date: ${moment(this.zoneToZoneObject['transferDate']).format("MM/DD/YYYY")}</p>
        <p>გადამოწმება / Verification :________________________ , ხელმოწერა / Signature : ________________________</p>
        <p style="word-spacing:1px; font-size: medium;">
        სსპ / SOP-04 , ვერსია / Version-02, ფორმა / Form-056
        </p>
        </div>
        <hr>`,
      },
      {
        type: 'footer',
      }
    ]
  }

  getPrintFields() {
    // console.log(this.printFields)
    return this.printFields;
  }

  

  printZoneToZone(zoneToZoneTransfer: zoneTozoneTransfer) {
    this.zoneToZoneObject = zoneToZoneTransfer;
    if(this.zoneToZoneObject['invoice']== null){
      this.zoneToZoneObject['invoice'] ='';
    }
    console.log("check details",this.zoneToZoneObject)
    this.showZoneToZonePrintModifier = true;
    this.generateFields();
  }

    //get product list from product master
    // getProductMasterList() {
    //   this._productMasterService.getProductMasterList().subscribe(
    //     (response) => {
    //       console.log(response);
    //       if (response?.results) {
    //         this.productMasterList = response?.results;
    //         this._productTaggingService.getProductTaggingList().subscribe(
    //           (response) => {
    //             console.log(response);
    //             if (response?.results) {
    //               this.productTaggingtList = response?.results;
    //               console.log("product tagging list",this.productTaggingtList)
    //             }
    //             let sample: productMaster[] = new Array<productMaster>();
    //             this.productTaggingtList.forEach((data) => {
    //               sample = this.productMasterList.filter(e => e.id === data.product)
    //               this.filteredProductList.push(sample[0])
    //               // this.formFields[2].formSchema[0].options = this.filteredProductList
    //             })
    //           }
    //         )
    //       }
    //     }
    //   )
    // }

    
  //to get storage zone list by Warehouse ID and to assign value to child table
  


}
