import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ProductTaggingService } from 'src/app/inventory/modules/product-tagging/services/product-tagging.service';
import { ProductMasterService } from 'src/app/master/modules/product-master-main-page/services/product-master.service';
import { ProjectService } from 'src/app/project/modules/project-main-page/services/project.service';
import { ProductTagging } from 'src/app/shared/models/inventory.model';
import { productMaster } from 'src/app/shared/models/product.model';
import { ProjectCreation } from 'src/app/shared/models/project.model';
import { rackToRackTransfer, rackToRackTransferList, shelf_creation_list, ZoneCreation, zoneLevelCreation, zoneLevels } from 'src/app/shared/models/wareshouse.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ShelfCreationService } from '../shelf-creation/services/shelf-creation.service';
import { StorageZoneCreationServiceService } from '../storage-zone-creation/services/storage-zone-creation-service.service';
import { ZoneLevelCreationService } from '../zone-level-creation/services/zone-level-creation.service';
import { RackToRackService } from './services/rack-to-rack.service';

@Component({
  selector: 'app-rack-to-rack',
  templateUrl: './rack-to-rack.component.html',
  styleUrls: ['./rack-to-rack.component.scss']
})
export class RackToRackComponent implements OnInit {
  columns: any = [];
  formFields: any = [];
  rackToRackTransfer: rackToRackTransfer | any = {};
  rackToRackTransferList: rackToRackTransfer[] = new Array<rackToRackTransfer>();
  rackToRackTransferItems: rackToRackTransferList[] = new Array<rackToRackTransferList>();

  showrackToRackTransferModifier: boolean = false;
  selectedrackToRackTransferItem: rackToRackTransfer[] = new Array<rackToRackTransfer>();
  productTaggingtList: ProductTagging[] = new Array<ProductTagging>();
  productMasterList: productMaster[] = new Array<productMaster>();
  filteredProductList: any = [];

  productTagging: ProductTagging | any = {};
  storageZoneCreationList: ZoneCreation[] = new Array<ZoneCreation>();
  zoneLevelCreationList:zoneLevelCreation[]=new Array<zoneLevelCreation>();
  zone_level_list: zoneLevels[] = new Array<zoneLevels>();
  shelf_creation_list: shelf_creation_list[] = new Array<shelf_creation_list>();
  to_shelf_creation_list:shelf_creation_list[] = new Array<shelf_creation_list>();

  showRackToRackPrintModifier: boolean = false;
  printFields: any = [];
  rackToRackObject = {};
  projectList: ProjectCreation[] = new Array<ProjectCreation>();


  constructor(public translate: TranslateService,
    private _RackToRackService: RackToRackService,
    private _sharedService: SharedService,
    private _rackTransferService: RackToRackService,
    private confirmationService: ConfirmationService,
    private _productTaggingService: ProductTaggingService,
    private _productMasterService: ProductMasterService,
    private _zoneService: StorageZoneCreationServiceService,
    private _zonelevelService: ZoneLevelCreationService,
    private _shelfCreationService: ShelfCreationService,
    private _projectService: ProjectService,) { }

  ngOnInit(): void {
    this.setRackToRackTransferTable();
    this.setRackToRackTransferFields();
    this.getRackTransferList();
    // this.getProductMasterList();
    this.getStorageZoneCreationList();
    this.getProjectList();
  }

  setRackToRackTransferTable() {
    this.columns = [
      { field: 'document', label: 'document_TC' },
      { field: 'projectName', label: 'project_TC' },
    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('rackToRack_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('rackToRack_TC') })
  }


  setRackToRackTransferFields() {
    this.formFields = [
      {
        type: 'text',
        name: 'document',
        label: this.translate.instant('document_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('document_TC') }),
        value: this.rackToRackTransfer.document,
      },
      // {
      //   type: 'text',
      //   name: 'project',
      //   label: this.translate.instant('project_TC'),
      //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('project_TC') }),
      //   value: this.rackToRackTransfer.project,
      // },
      {
        type: 'dropdown',
        name: 'project',
        label: this.translate.instant('project_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', {
          label: this.translate.instant('project_TC'),
        }),
        value: this.rackToRackTransfer.project,
        options: this.projectList,
        optionLabel: "projectName",
        optionValue: "id",
      },
      {
        type: 'table',
        name: 'rack_to_rack_list',
        label: this.translate.instant('rackToRackList_TC'),
        formInitialise: { fromZone: '', fromRack: '',fromRackLevel:'', fromShelf: '', product: '', toRack: '', toShelf: '', quantity: '', kitNumber: '', batchNumber: '', serialNumber: '' },
        columnSchema: ['fromZone_TC', 'fromRack_TC','fromRackLevel_TC', 'fromShelf_TC', 'product_TC', 'toRack_TC', 'toShelf', 'quantity_TC', 'kitNumber_TC', 'batchNumber_TC', 'serialNumber_TC'],
        onCancelForm: this.resetRow.bind(this),
        formSchema: [
          {
            type: 'dropdown',
            name: 'fromZone',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('zone_TC') }),
            options: this.storageZoneCreationList,
            optionLabel: "zoneName",
            optionValue: "id",
            onValueChange: this.onChangeZoneValue.bind(this),
          },
          {
            type: 'dropdown',
            name: 'fromRack',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('rack_TC') }),
            options: this.zoneLevelCreationList,
            optionLabel: "rackName",
            optionValue: "id",
            onValueChange: this.onChangeFromRackValue.bind(this),
          },
          {
            type: 'dropdown',
            name: 'fromRackLevel',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('fromRackLevel_TC') }),
            options: this.zone_level_list,
            optionLabel: "levelName",
            optionValue: "id",
            onValueChange: this.onChangeFromRackValue.bind(this),
          },
          {
            name: 'fromShelf',
            type: 'dropdown',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('shelf_TC') }),
            options: this.shelf_creation_list,
            onValueChange: this.onChangeFromShelfValue.bind(this),
            optionLabel: "shelfName",
            optionValue: "id",
          },
          {
            type: 'dropdown',
            name: 'product',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('productName_TC') }),
            options: this.filteredProductList,
            optionLabel: "productName",
            optionValue: "id",
            onValueChange: this.onChangeProductValue.bind(this),
          },
          {
            type: 'dropdown',
            name: 'toRack',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('rack_TC') }),
            options: this.zoneLevelCreationList,
            optionLabel: "rackName",
            optionValue: "id",
            onValueChange: this.onChangeToRackValue.bind(this),
          },
          {
            name: 'toShelf',
            type: 'dropdown',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('shelf_TC') }),
            options: this.to_shelf_creation_list,
            optionLabel: "shelfName",
            optionValue: "id",
          },
          {
            name: 'quantity',
            type: 'input'
          },
          {
            name: 'kitNumber',
            type: 'input',
          },
          {
            name: 'batchNumber',
            type: 'input',
          },
          {
            name: 'serialNumber',
            type: 'input'
          },
        ],
        dataKey: 'id',
        dataSource: this.rackToRackTransfer?.rack_to_rack_list ? this.rackToRackTransferItems : [],

      },
    ]
  }

  getFields() {
    return this.formFields;
  }

  resetRow(prevValue: any, tableValue: any) {
    return prevValue;
  }

  getProjectList() {
    this._projectService.getProjectList().subscribe((response) => {
      console.log('project list', response);
      if (response?.results) {
        this.projectList = response?.results;
        console.log('project list', this.projectList);
        this.setRackToRackTransferFields();
      }
    })
  }


  getRackTransferList() {
    this._rackTransferService.getRackToRackTransferList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.rackToRackTransferList = response?.results;
        }
      }
    )
  }

  //  to edit the added data
  editRackTransfer(rackTransfer: rackToRackTransfer) {
    this.rackToRackTransferItems = rackTransfer.rack_to_rack_list;
    this.rackToRackTransfer = { ...rackTransfer };
    this.setRackToRackTransferFields();
    this.showrackToRackTransferModifier = true;
  }


  deleteRackTransfer(event: Event, rackTransfer: rackToRackTransfer) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', { entity: rackTransfer?.document }),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._rackTransferService.removeRackToRackTransfer(rackTransfer?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', { entity: rackTransfer?.document })
            );
            this.getRackTransferList();
          }
        )
      }
    });
  }

  //to save 
  saveRackTransfer(rackToRackTransfer: rackToRackTransfer) {

    if (this.rackToRackTransfer?.id) {
      rackToRackTransfer.id = this.rackToRackTransfer?.id;
      // this.clearRackTransfer();
    }
    this._rackTransferService.RackToRackTransferModifier(rackToRackTransfer).subscribe(
      (response) => {
        console.log(response);
        if (Object.keys(response).length != 0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', { entity: rackToRackTransfer?.document })
          );
          this.clearRackTransfer();
          this.showrackToRackTransferModifier = false;
          this.getRackTransferList();
        }
      }
    )
  }

  clearRackTransfer() {
    this.rackToRackTransfer = {};
    this.setRackToRackTransferFields();
  }

  generateFields() {
    this.printFields = [
      {
        type: 'header',
        label_1: 'ფორმა 025_გადატანა ერთი თაროდან მეორე თაროზე',
        label_2: 'Form 025_Transfer from one rack to another rack',
      },
      {
        type: 'racktorack',
        value: this.rackToRackObject,
      },
      {
        type: 'footerheader',
        label_1: 'დოკუმენტი / Document - Doc1234',
        label_2: 'დამატებითი ინფორმაცია / Additional Information',
      },
      {
        type: 'footerbody',
        label_1: `<div style='margin-bottom: 1px'>
        <p>საწყობი / Warehouse :________________________ , ხელმოწერა / Signature : ________________________</p>
        <p>გადაადგილების თარიღი / Moving date: 2021-07-25</p>
        <p>გადამოწმება / Verification :________________________ , ხელმოწერა / Signature : ________________________</p>
        <p style="word-spacing:1px; font-size: medium;">
            სუპი / SOP-04 , ვერსია / Version-02, ფორმა / Form-025
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
    return this.printFields;
  }

  printRackToRack(rackToRackTransfer: rackToRackTransfer) {
    this.rackToRackObject = rackToRackTransfer;
    this.showRackToRackPrintModifier = true;
    this.generateFields();
  }

  // Get Storage Zone creation list here
  getStorageZoneCreationList() {
    this._zoneService.getStorageZoneCreationList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.storageZoneCreationList = response?.results;
          console.log("storage list", this.formFields)
          this.formFields[2].formSchema[0].options = this.storageZoneCreationList
        }
      }
    )
  }

  //get zonelevel list
  getZoneLevelCreationList(storageZoneID) {
    this._zonelevelService.getZoneLevelCreationByStorageZone(storageZoneID).subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.zoneLevelCreationList = response?.results;
          console.log("zonelist", this.zoneLevelCreationList)
          this.formFields[2].formSchema[1].options = this.zoneLevelCreationList
          this.formFields[2].formSchema[5].options = this.zoneLevelCreationList
        }
      }
    )
  }

  getZoneLevelsByID(rackID){
    this._zonelevelService.getZoneLevelCreationById(rackID).subscribe(
      (response) => {
        console.log(response);
        console.log("sujan", response)
        if (response?.results) {
          this.zone_level_list = response?.results.zone_level_list;
          console.log("sujan", this.zone_level_list)
          // this.formFields[2].formSchema[1].options = this.zone_level_list
          this.formFields[2].formSchema[3].options = this.zone_level_list
        }
      }
    )
  }
    //get shelf list 
  getShelfCreationList(zoneLevelID) {
    this._shelfCreationService.getShelfCreationByZoneLevelID(zoneLevelID).subscribe(
      (response) => {
        console.log("shelf creation", response);
        if (response?.results) {
          this.shelf_creation_list = response?.results[0].shelf_creation_list;
          this.formFields[2].formSchema[2].options = this.shelf_creation_list
          console.log("form fields", this.formFields)
        }
      }
    )
  }

  getToShelfCreationList(zoneLevelID){
    this._shelfCreationService.getShelfCreationByZoneLevelID(zoneLevelID).subscribe(
      (response) => {
        console.log("shelf creation", response);
        if (response?.results) {
          this.to_shelf_creation_list = response?.results[0].shelf_creation_list;
          this.formFields[2].formSchema[5].options = this.to_shelf_creation_list
          console.log("form fields", this.formFields)
        }
      }
    )

  }

  //get product list from product master
  getProductTaggingList(productTaggingID) {
    this._productMasterService.getProductMasterList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.productMasterList = response?.results;
          this._productTaggingService.getProductTaggingByShelfId(productTaggingID).subscribe(
            (response) => {
              console.log(response);
              if (response?.results) {
                this.productTaggingtList = response?.results;
              }
              let sample: productMaster[] = new Array<productMaster>();
              this.productTaggingtList.forEach((data) => {
                sample = this.productMasterList.filter(e => e.id === data.product)
                this.filteredProductList.push(sample[0])
                this.formFields[2].formSchema[3].options = this.filteredProductList
              })
            }
          )
        }
      }
    )
  }
  //to get rack levels by storagezone ID
  onChangeZoneValue(value: any, tableValue: any) {
    const tableValueUpdated: any = {};
    console.log("table value updated", tableValue)
    if (tableValue) {
      Object.assign(tableValueUpdated, tableValue);
    }
    const zoneLevelID = value
    this.getZoneLevelCreationList(zoneLevelID)
    return tableValueUpdated;
  }

  onChangeFromRackValue(value: any, tableValue: any){
    if(value){
      // this.getShelfCreationList(value)
      this.getZoneLevelsByID(value)
    }

  }
  onChangeFromShelfValue(value: any, tableValue: any){
    if(value){
      this.getProductTaggingList(value)
    }
  }
  onChangeToRackValue(value: any, tableValue: any){
    if(value){
      this.getToShelfCreationList(value)
    }
  }

  // // get storage zone by ware house id
  // getStorageZoneCreationListByID(wareHouseID, zoneID) {
  //   this._zoneService.getStorageZoneCreationByWareHouse(wareHouseID).subscribe(
  //     (response) => {
  //       console.log(response);
  //       if (response?.results) {
  //         this.storageZoneCreationList = response?.results;
  //         this.storageZoneCreationList = this.storageZoneCreationList.filter(e => e.id === zoneID);
  //         console.log("storage list", this.storageZoneCreationList)
  //         this._zonelevelService.getZoneLevelCreationByStorageZone(zoneID).subscribe((data) => {
  //           this.zone_level_list = data?.results[0].zone_level_list
  //           this.formFields[2].formSchema[7].options = this.zone_level_list
  //           console.log("form fields", this.formFields)
  //         })
  //       }
  //     }
  //   )

  // }

  //to get storage zone list by Warehouse ID and to assign value to child table
  onChangeProductValue(value: any, tableValue: any) {
    const tableValueUpdated: any = {};
    if (tableValue) {
      Object.assign(tableValueUpdated, tableValue);
    }
    this.productTagging = this.productTaggingtList.filter(e => e.product === value)[0];
    console.log("product taggging", this.productTagging)
    tableValueUpdated.kitNumber = this.productTagging.kit_no
    tableValueUpdated.batchNumber = this.productTagging.batch_no
    tableValueUpdated.quantity = this.productTagging.recevied_qty
    tableValueUpdated.serialNumber = this.productTagging.serial_number
    // tableValueUpdated.fromRack = this.productTagging.rack
    // tableValueUpdated.fromShelf = this.productTagging.shelf
    // this.getStorageZoneCreationListByID(this.productTagging.ware_house, this.productTagging.zone)
    return tableValueUpdated;
  }

  // //to get shelf creationlist by rack level id
  // onChangeZoneLevelValue(value: any, tableValue: any) {
  //   const tableValueUpdated: any = {};
  //   console.log("table value updated", tableValue)
  //   if (tableValue) {
  //     Object.assign(tableValueUpdated, tableValue);
  //   }
  //   const zoneLevelID = value
  //   this.getShelfCreationList(zoneLevelID)
  //   return tableValueUpdated;
  // }


}
