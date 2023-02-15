import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProductTagging } from 'src/app/shared/models/inventory.model';
import { productMaster } from 'src/app/shared/models/product.model';
import { ProductMasterService } from 'src/app/master/modules/product-master-main-page/services/product-master.service';
import { WareHouseCreation, ZoneCreation, zoneLevels, zoneLevelCreation, shelf_creation_list } from 'src/app/shared/models/wareshouse.model';

import { ProductTaggingService } from './services/product-tagging.service';
import { StorageZoneCreationServiceService } from 'src/app/wareshouse/modules/storage-zone-creation/services/storage-zone-creation-service.service';
import { ZoneLevelCreationService } from 'src/app/wareshouse/modules/zone-level-creation/services/zone-level-creation.service';
import { ShelfCreationService } from 'src/app/wareshouse/modules/shelf-creation/services/shelf-creation.service';
import { WareshouseCreationService } from 'src/app/wareshouse/modules/warehouse-creation/services/wareshouse-creation.service';
import * as moment from 'moment';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectCreation } from 'src/app/shared/models/project.model';
import { ProjectService } from 'src/app/project/modules/project-main-page/services/project.service';
import { StorageTypeCreation } from 'src/app/shared/models/wareshouse.model';
import { StorageTypeService } from 'src/app/wareshouse/modules/storage-type-creation/services/storage-type.service';

@Component({
  selector: 'app-product-tagging',
  templateUrl: './product-tagging.component.html',
  styleUrls: ['./product-tagging.component.scss']
})
export class ProductTaggingComponent implements OnInit {

  productTagging: ProductTagging | any = {};
  productTaggingtList: ProductTagging[] = new Array<ProductTagging>();
  selectedProductTagging: ProductTagging[] = new Array<ProductTagging>();
  showProductTaggingModifier: boolean = false;

  formFields: any = [];
  columns: any = [];
  productList: productMaster[] = new Array<productMaster>();
  wareHouseList: WareHouseCreation[] = new Array<WareHouseCreation>();
  zoneList: ZoneCreation[] = new Array<ZoneCreation>();
  rackList: zoneLevelCreation[] = new Array<zoneLevelCreation>();
  levelList: zoneLevels[] = new Array<zoneLevels>();
  shelfList: shelf_creation_list[] = new Array<shelf_creation_list>();
  projectList: ProjectCreation[] = new Array<ProjectCreation>();
  storageTypeList:StorageTypeCreation[] = new Array<StorageTypeCreation>();
  tag_id: any=0;
  // partyList: PartyMaster[] = new Array<PartyMaster>();

  // showmaterialReceiptPrintModifier: boolean = false;
  // printFields: any = [];
  // materialReceiptObject = {};

  constructor(private _sharedService: SharedService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService,
    private _productTaggingService: ProductTaggingService,
    private _productservice: ProductMasterService,
    private _wareHouseService: WareshouseCreationService,
    private _zoneService: StorageZoneCreationServiceService,
    private _zonelevelService: ZoneLevelCreationService,
    private _shelfCreationService: ShelfCreationService,
    private _projectService: ProjectService,
    private _storageService: StorageTypeService,
    private routes: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    
      this.tag_id = this.route.snapshot.queryParams['tag_id'];
    console.log('param', this.tag_id );
    if(this.tag_id != 0 && this.tag_id != undefined){
    this._productTaggingService.getProductTaggingById(this.tag_id).subscribe(
      (response)=>{
        console.log("check results",response)
        // this.productTagging=response?.results;
        console.log("check results",response)
        this.editProductTagging(response);
        
      }

    )
    
    }
    this.setProductTaggingTable();
    this.getProductTaggingList();
    this.getWareHouseList();
    this.getProductList();
    this.getZoneList();
    this.getProjectList();
    
  }

  setProductTaggingTable() {
    this.columns = [
      { field: 'productName', label: 'product_TC' },
      { field: 'expiry', label: 'expiry_TC' },
      { field: 'recevied_qty', label: 'recevied_qty_TC' },
      { field: 'wareHouseName', label: 'ware_house_TC' },
      { field: 'zoneName', label: 'zone_TC' },
      { field: 'rackName', label: 'rack_TC' },
      { field: 'levelName', label: 'zoneLevelCreation_TC' },
      { field: 'shelfName', label: 'shelf_TC' },
      // {field: 'isApproved', label: 'isApproved_TC'},
      // { field: 'grn_details', label: 'grnDetails_TC' },
    ];
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains');
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', {
      entity: this.translate.instant('ProductTagging_TC'),
    });
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {
      entity: this.translate.instant('ProductTagging_TC'),
    });
  }

  setProductTaggingFields() {
    this.formFields = [
      {
        type: 'fieldset',
        headerText: this.translate.instant('supplierDetails_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'product',
            label: this.translate.instant('productName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('productName_TC'),
            }),
            value: this.productTagging.product,
            readonly: true,
            required: true,
            validation: {
              required: true,
            },
            options: this.productList,
            optionLabel: "productName",
            optionValue: "id",


            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('productName_TC') }),
            }
          },
          {
            type: 'dropdown',
            name: 'ware_house',
            label: this.translate.instant('ware_house_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('ware_house_TC'),
            }),
            value: this.productTagging.ware_house,
            readonly: true,
            required: true,
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
            name: 'zone',
            label: this.translate.instant('zoneName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('zoneName_TC'),
            }),
            value: this.productTagging.zone,
            readonly: true,
            required: true,
            validation: {
              required: true,
            },
            options: this.zoneList,
            optionLabel: "zoneName",
            optionValue: "id",
            onValueChange: this.onChangeStorageZoneValue.bind(this),

            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('zoneName_TC') }),
            }
          },
          {
            type: 'dropdown',
            name: 'rack',
            label: this.translate.instant('rackName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('rackName_TC'),
            }),
            value: this.productTagging.rack,
            readonly: false,
            // required: true,
            // validation: {
            //   required: true,
            // },
            options: this.rackList,
            optionLabel: "rackName",
            optionValue: "id",
            onValueChange: this.onChangeRackNameValue.bind(this),

            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('rackName_TC') }),
            // }
          },
          {
            type: 'dropdown',
            name: 'level',
            label: this.translate.instant('zoneLevelCreation_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('zoneLevelCreation_TC'),
            }),
            value: this.productTagging.level,
            readonly: false,
            required: true,
            validation: {
              required: true,
            },
            options: this.zoneList,
            optionLabel: "levelName",
            optionValue: "id",
            onValueChange: this.onChangeLevelNameValue.bind(this),

            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('zoneLevelCreation_TC') }),
            }
          },
          {
            type: 'dropdown',
            name: 'shelf',
            label: this.translate.instant('ShelfName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('ShelfName_TC'),
            }),
            value: this.productTagging.shelf,
            readonly: false,
            required: true,
            validation: {
              required: true,
            },
            options: this.shelfList,
            optionLabel: "shelfName",
            optionValue: "id",
            // onValueChange: this.onChangePartyValue.bind(this),

            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('ShelfName_TC') }),
            }
          },

          // {
          //   type: 'text',
          //   name: 'supplierInvoiceNumber',
          //   label: this.translate.instant('supplierInvoiceNumber_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('supplierInvoiceNumber_TC'),
          //   }),
          //   value: this.productTagging.supplierInvoiceNumber,
          //   readonly: false,
          //   validation: {
          //     // required: true,
          //     minlength: 1,
          //   },
          // },

        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('receiptDetails_TC'),
        footerText: '',
        fillScreen: false,
        fields: [

          {
            type: 'text',
            name: 'batch_no',
            label: this.translate.instant('batchNumber_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('batchNumber_TC'),
            }),
            value: this.productTagging.batch_no,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('batchNumber_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('batchNumber_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'kit_no',
            label: this.translate.instant('kitNumber_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('kitNumber_TC'),
            }),
            value: this.productTagging.kit_no,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('kitNumber_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('kitNumber_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'trc_no',
            label: this.translate.instant('trc_no_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('trc_no_TC'),
            }),
            value: this.productTagging.trc_no,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('trc_no_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('trc_no_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },

          {
            type: 'date',
            name: 'trc_date',
            label: this.translate.instant('trc_date_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('trc_date_TC'),
            }),
            value: this.productTagging.trc_date,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('trc_date_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('trc_date_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'date',
            name: 'expiry',
            label: this.translate.instant('expiry_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('expiry_TC'),
            }),
            value: this.productTagging.expiry,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('expiry_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('expiry_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'serial_number',
            label: this.translate.instant('serial_number_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('serial_number_TC'),
            }),
            value: this.productTagging.serial_number,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('serial_number_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('serial_number_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'manufacture',
            label: this.translate.instant('manufacture_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('manufacture_TC'),
            }),
            value: this.productTagging.manufacture,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('manufacture_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('manufacture_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'min_temp',
            label: this.translate.instant('minTemp_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('minTemp_TC'),
            }),
            value: this.productTagging.min_temp,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('minTemp_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('minTemp_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'max_temp',
            label: this.translate.instant('maxTemp_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('maxTemp_TC'),
            }),
            value: this.productTagging.max_temp,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('maxTemp_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('maxTemp_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'recevied_qty',
            label: this.translate.instant('recevied_qty_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('recevied_qty_TC'),
            }),
            value: this.productTagging.recevied_qty,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('recevied_qty_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('recevied_qty_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'available_qty',
            label: this.translate.instant('available_qty_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('available_qty_TC'),
            }),
            value: this.productTagging.available_qty,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('available_qty_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('available_qty_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'price',
            label: this.translate.instant('price_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('price_TC'),
            }),
            value: this.productTagging.price,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('price_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('price_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'dropdown',
            name: 'storage_type',
            label: this.translate.instant('storageType_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('storageType_TC'),
            }),
            value: this.productTagging.storage_type,
            options: [
              { id: 'BINS', name: 'BINS' },
              { id: 'FRIDGE', name: 'FRIDGE' },
              { id: 'PALLETS', name: 'PALLETS' },
              { id: 'BOX', name: 'BOX' },
            ],
            optionLabel: "name",
            optionValue: "id",
            onValueChange: this.onChangeStorageTypeValue.bind(this),
          },
          {
            type: 'dropdown',
            name: 'type_name',
            label: this.translate.instant('typeName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('typeName_TC'),
            }),
            value: this.productTagging.type_name,
            options: this.storageTypeList,
            optionLabel: "name",
            optionValue: "name",
          },
          {
            type: 'date',
            name: 'load_date',
            label: this.translate.instant('loadDate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('loadDate_TC'),
            }),
            value: this.productTagging.load_date,
            // validation: {
            // required: true,
            // },
            selectionMode: 'single',
            // errorText: {
            // required: this.translate.instant('formRequiredError_SC', {
            //   label: this.translate.instant('loadDate_TC'),
            // }),
            // },
          },
          {
            type: 'date',
            name: 'unload_date',
            label: this.translate.instant('unloadDate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('unloadDate_TC'),
            }),
            value: this.productTagging.unload_date,
            selectionMode: 'single',
            // validation: {
            // required: true,
            // },
            // errorText: {
            // required: this.translate.instant('formRequiredError_SC', {
            //   label: this.translate.instant('unloadDate_TC'),
            // }),
            // },
          },
          {
            type: 'dropdown',
            name: 'project',
            label: this.translate.instant('project_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('project_TC'),
            }),
            value: this.productTagging.project,
            // readonly: false,
            // required: true,
            // validation: {
            //   required: true,
            // },
            options: this.projectList,
            optionLabel: "projectName",
            optionValue: "id",
            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('project_TC') }),
            // }
          },
        ]
      },
    ]
  }

  getProjectList() {
    this._projectService.getProjectList().subscribe((response) => {
      console.log('project list', response);
      if (response?.results) {
        this.projectList = response?.results;
        console.log('project list', this.projectList);
        this.setProductTaggingFields();
      }
    })
  }

  getSTorageList(name){
    this._storageService.getStorageTypeByName(name).subscribe(
      (response)=>{
        console.log("check results",response)
        this.storageTypeList = response?.results[0].storage_type_creation_list;
        this.formFields[1].fields[13].options = this.storageTypeList;

      }
    )
  }

  onChangeStorageTypeValue(prevValue: any, value: any, formValue: any){
    console.log("check storage ytype value",value)
    this.getSTorageList(value);

  }

  saveProductTagging(productTagging: ProductTagging) {
    // console.log(materialReceipt)

    // if (this.materialReceipt?.id) {
    productTagging.id = this.productTagging?.id;
    // productTagging.load_date = moment(productTagging?.load_date).format("YYYY-MM-DD");
    // productTagging.unload_date = moment(productTagging?.unload_date).format("YYYY-MM-DD");
    // productTagging.expiry = moment(productTagging?.expiry).format("YYYY-MM-DD");
    // materialReceipt.isApproved = this.materialReceipt?.isApproved;
    // this.clearMaterialReceipt();
    // }

    this._productTaggingService.ProductTaggingModifier(productTagging).subscribe((response) => {
      console.log(response);
      if (Object.keys(response).length != 0) {
        console.log('response', response);
        this._sharedService.handleSuccess(
          this.translate.instant('entityUpdateSuccessTitle_TC', {
            entity: '',
          })
        );
        this.showProductTaggingModifier = false;
        
        this.getProductTaggingList();
      }
    });
  }

  editProductTagging(productTagging: ProductTagging) {
    
    this.showProductTaggingModifier = true;
    console.log("Product tagging", productTagging)
    this.productTagging = { ...productTagging };
    if (productTagging.ware_house != null && productTagging.zone != null ){
    this.onChangeWareHouseValue(1,productTagging.ware_house,1);
    }
    if (productTagging.zone != null){
      this.onChangeStorageZoneValue(1,productTagging.zone,1);
    }

    if (productTagging.zone != null && productTagging.rack != null ){
      
      // this.getRackList(productTagging.zone);
      this.getLevelList(productTagging.rack);
    }
    console.log("check data", this.productTagging)
    if (productTagging.rack != null && productTagging.level != null) {
      this.getShelfList(productTagging.zone, productTagging.rack, productTagging.level)
    }
    if (productTagging.storage_type != null){
      this.getSTorageList(productTagging.storage_type);

    }
    this.setProductTaggingFields();
    this.showProductTaggingModifier = true;
  }
  onChangeWareHouseValue(prevValue: any, value: any, formValue: any){
    console.log("check value",value);
    this._zoneService.getStorageZoneCreationByWareHouse(value).subscribe(
      (response) => {
        console.log("check storage zone list", response);
        if (response?.results) {
          this.zoneList = response?.results;
          console.log("storage Zone list", this.zoneList)
          this.formFields[0].fields[2].options = this.zoneList;

        }
      }
    )


  }

  onChangeStorageZoneValue(prevValue: any, value: any, formValue: any) {
    console.log("check value", value);
    // console.log("check table value",tableValue)
    this.getRackList(value);
  }
  onChangeRackNameValue(prevValue: any, value: any, formValue: any) {

    const formValueUpdated: any = {};
    let object: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      const zoneLevelID = value
      this.getLevelList(zoneLevelID)

    }
    return formValueUpdated;
  }
  onChangeLevelNameValue(prevValue: any, value: any, formValue: any) {
    console.log("check form value of level", formValue.zone)
    console.log("check form value of level", formValue.rack)
    console.log("check form value of level", formValue.level)
    const formValueUpdated: any = {};
    let object: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      const zoneLevelID = formValue.zone;
      const rackID = formValue.rack;
      const levelID = formValue.level;
      this.getShelfList(zoneLevelID, rackID, levelID)

    }
    return formValueUpdated;
  }



  getProductTaggingList() {
    this._productTaggingService.getProductTaggingList().subscribe(
      (response) => {
        console.log("check products", response);
        if (response?.results) {
          this.productTaggingtList = response?.results;
          console.log("product tagging list", this.productTaggingtList)

        }
      }
    )
  }
  getProductList() {
    this._productservice.getProductMasterList().subscribe(
      (response) => {
        console.log("check Product list", response);
        if (response?.results) {
          this.productList = response?.results;
          console.log("product list", this.productList)

        }

      }
    )
  }

  getWareHouseList() {
    this._wareHouseService.getWareHouseCreationList().subscribe(
      (response) => {
        console.log("check warehouse list", response);
        if (response?.results) {
          this.wareHouseList = response?.results;
          console.log("WareHouse list", this.wareHouseList)

        }
      }
    )
  }

  getZoneList() {
    this._zoneService.getStorageZoneCreationList().subscribe(
      (response) => {
        console.log("check storage zone list", response);
        if (response?.results) {
          this.zoneList = response?.results;
          console.log("storage Zone list", this.zoneList)

        }
      }
    )
  }

  getRackList(id) {
    this._zonelevelService.getZoneLevelCreationByStorageZone(id).subscribe(
      (response) => {
        console.log("check rack level list", response);


        if (response?.results) {
          this.rackList = response?.results;
          console.log("rack list", this.rackList);
          this.formFields[0].fields[3].options = this.rackList;
          // this.setProductTaggingFields();
        }

      }
    )

  }

  // updateRackFields() {
  //   this.formFields[0].fields[3].options = this.rackList;
  // }
  getLevelList(id) {
    this._zonelevelService.getZoneLevelCreationById(id).subscribe(
      (response) => {
        console.log("check zone level list", response);
        if (response?.zone_level_list) {
          this.levelList = response?.zone_level_list;
          console.log("level list", this.levelList)
          this.formFields[0].fields[4].options = this.levelList;
        }
      }
    )
  }
  getShelfList(zone, rack, level) {
    this._shelfCreationService.getShelfCreationByZoneRackLevel(zone, rack, level).subscribe(
      (response) => {
        console.log("check shelf list", response);
        this.shelfList = response;
        console.log("shelf list", this.shelfList)
        if (response?.results) {
          this.shelfList = response?.results[0].shelf_creation_list;
          console.log("shelf list", this.shelfList);
          this.formFields[0].fields[5].options = this.shelfList;

        }
      }
    )
  }

  clearProductTagging() {
    this.productTagging = {};
    this.setProductTaggingFields();
  }

  getFields() {
    return this.formFields;
  }

  deleteProductTagging(event: Event, producttagging: ProductTagging) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', {
        entity: '',
      }),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._productTaggingService
          .removeProductTagging(producttagging?.id)
          .subscribe((response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {
                entity: '',
              })
            );
            // this.getGoodsAcceptanceList();
            this.getProductTaggingList();
          });
      },
    });
  }




}


