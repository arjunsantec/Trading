import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';

import { WareHouseCreation, ZoneCreation, zoneLevels, zoneLevelCreation,shelf_creation_list, StorageTypeCreation, storage_type_creation_list } from 'src/app/shared/models/wareshouse.model';

import { StorageZoneCreationServiceService } from 'src/app/wareshouse/modules/storage-zone-creation/services/storage-zone-creation-service.service';
import { ZoneLevelCreationService } from 'src/app/wareshouse/modules/zone-level-creation/services/zone-level-creation.service';
import { ShelfCreationService } from 'src/app/wareshouse/modules/shelf-creation/services/shelf-creation.service';
import { WareshouseCreationService } from 'src/app/wareshouse/modules/warehouse-creation/services/wareshouse-creation.service';
import { StorageTypeService } from './services/storage-type.service';
import { AppSettings } from 'src/app/shared/models/company.model';
import { AppSettingsService } from 'src/app/company/modules/app-settings-main-page/services/app-settings.service';

@Component({
  selector: 'app-storage-type-creation',
  templateUrl: './storage-type-creation.component.html',
  styleUrls: ['./storage-type-creation.component.scss']
})
export class StorageTypeCreationComponent implements OnInit {

  storageTypeCreation: StorageTypeCreation | any = {};
  storageTypeCreationList: StorageTypeCreation[] = new Array<StorageTypeCreation>();
  selectedStorageTypeCreation: StorageTypeCreation[] = new Array<StorageTypeCreation>();
  showStorageTypeCreationModifier: boolean = false;
  storage_type_creation_list: storage_type_creation_list[] = new Array<storage_type_creation_list>(); 

  columns: any = [];
  formFields: any = [];

  wareHouseList: WareHouseCreation[] = new Array<WareHouseCreation>();
  zoneList: ZoneCreation[] = new Array<ZoneCreation>();
  rackList: zoneLevelCreation[] = new Array<zoneLevelCreation>();
  levelList: zoneLevels[] = new Array<zoneLevels>();
  shelfList: shelf_creation_list[] = new Array<shelf_creation_list>(); 
  appSettingsArray: any = [];
  appSettingsList: AppSettings[] = new Array<AppSettings>();

  constructor(private _sharedService: SharedService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService,
    private _storageTypeCreation: StorageTypeService,
    private _wareHouseService: WareshouseCreationService,
    private _zoneService: StorageZoneCreationServiceService,
    private _zonelevelService: ZoneLevelCreationService,
    private _shelfCreationService: ShelfCreationService,
    private _appSettingsService: AppSettingsService,) { }

  ngOnInit(): void {
    this.setStorageTypeCreationFields();
    this.setStorageTypeCreationTable();
    this.getStorageTypeCreationList();
    this.getwarehouselist();
    this.getstoragezonelist();
    this.getracklist();
    this.getshelflist();
    this.getAppSettingsList();
  }

  getwarehouselist(){
    this._wareHouseService.getWareHouseCreationList().subscribe(
      (response)=>{
        if (response?.results) {
          this.wareHouseList = response?.results;
          console.log("check warehouse",this.wareHouseList)
          this.formFields[1].formSchema[4].options = this.wareHouseList
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('materialReceipt_TC')})
          // );
        }
      }
    )
  }

  getstoragezonelist(){
    this._zoneService.getStorageZoneCreationList().subscribe(
      (response)=>{
        if (response?.results) {
          this.zoneList = response?.results;
          console.log("check zone",this.zoneList)
          this.formFields[1].formSchema[5].options = this.zoneList
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('materialReceipt_TC')})
          // );
        }

      }
    )
  }

  getracklist(){
    this._zonelevelService.getZoneLevelCreationList().subscribe(
      (response)=>{
        if (response?.results) {
          this.rackList = response?.results;
          console.log("check rack",this.rackList)
          this.formFields[1].formSchema[6].options = this.rackList
          this.levelList = response?.results[0].zone_level_list;
          console.log("check level list",this.levelList)
          this.formFields[1].formSchema[7].options = this.levelList
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('materialReceipt_TC')})
          // );
        }
      }
    )
  }

  getshelflist(){
    this._shelfCreationService.getShelfCreationList().subscribe(
      (response)=>{
        if (response?.results) {
          this.shelfList = response?.results[0].shelf_creation_list;
          console.log("check shelf",this.shelfList)
          this.formFields[1].formSchema[8].options = this.shelfList
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('materialReceipt_TC')})
          // );
        }
      }
    )
  }

  setStorageTypeCreationTable() {
    this.columns = [
      { field: 'storageType', label: 'storageType_TC' },
      // { field: 'name', label: 'name_TC' },
      // { field: 'code', label: 'code_TC' },
      // { field: 'unitRate', label: 'unitRate_TC' },
      // { field: 'currency', label: 'currency_TC' },
      // { field: 'warehouse', label: 'warehouse_TC' },
      // { field: 'zone', label: 'zone_TC' },
      // { field: 'rack', label: 'rack_TC' },
      // { field: 'level', label: 'level_TC' },
      // { field: 'shelf', label: 'shelf_TC' },
      // { field: 'minTemp', label: 'minTemp_TC' },
      // { field: 'maxTemp', label: 'maxTemp_TC' },
      // { field: 'length', label: 'length_TC' },
      // { field: 'width', label: 'width_TC' },
      // { field: 'height', label: 'height_TC' },
      // { field: 'maxStorage', label: 'maxStorage_TC' },
    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains');
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', {
      entity: this.translate.instant('storageTypeCreation_TC'),
    });
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {
      entity: this.translate.instant('storageTypeCreation_TC'),
    });
  }

  setStorageTypeCreationFields() {
    this.formFields = [
      {
        type: 'dropdown',
        name: 'storageType',
        label: this.translate.instant('storageType_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', {
          label: this.translate.instant('storageType_TC'),
        }),
        value: this.storageTypeCreation.storageType,
        // validation: {
        //   required: true,
        // },
        options: [
          { id: 'BINS', name: 'BINS' },
          { id: 'FRIDGE', name: 'FRIDGE' },
          { id: 'PALLETS', name: 'PALLETS' },
          { id: 'BOX', name: 'BOX' },
        ],
        optionLabel: 'name',
        optionValue: 'id',
        // errorText: {
        //   required: this.translate.instant('formRequiredError_SC', {
        //     label: this.translate.instant('storageType_TC'),
        //   }),
        // },
      },
      {
        type: 'table',
        name: 'storage_type_creation_list',
        label: this.translate.instant('storage_type_creation_list_TC'),
        formInitialise: { name: '', code: '', unitRate: '', currency: '', warehouse: '', zone: '', rack: '', level: '', shelf: '', minTemp: '', maxTemp: '', length: '', width: '', height: '', maxStorage: '' },
        columnSchema: ['name_TC', 'code_TC', 'unitRate_TC', 'currency_TC', 'wareHouse_TC', 'zone_TC', 'rack_TC', 'ZoneLevel_TC', 'shelf_TC', 'minTemp_TC', 'maxTemp_TC', 'ShelfLength', 'ShelfWidth_TC', 'ShelfHeight_TC', 'maxStorage_TC'],
        onCancelForm: this.resetRow.bind(this),
        formSchema: [
          {
            name: 'name',
            type: 'input',
          },
          {
            name: 'code',
            type: 'input'
          },
          {
            name: 'unitRate',
            type: 'input'
          },
          // {
          //   name: 'currency',
          //   type: 'input',
          // },
          {
            type: 'dropdown',
            name: 'currency',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('currencyType_TC') }),
            options: this.appSettingsArray,
            optionLabel: 'name',
            optionValue: 'id',
          },
          {
            name: 'warehouse',
            type: 'dropdown',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('warehouse_TC') }),
            options:this.wareHouseList,
            optionLabel: "wareHouseName",
            optionValue: "id",
            // onValueChange: this.onChangeProductValue.bind(this),
          },
          {
            name: 'zone',
            type: 'dropdown',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('zone_TC') }),
            options: this.zoneList,
            optionLabel: "zoneName",
            optionValue: "id",
            // onValueChange: this.onChangeProductValue.bind(this),
          },
          {
            name: 'rack',
            type: 'dropdown',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('rack_TC') }),
            options: this.rackList,
            optionLabel: "rackName",
            optionValue: "id",
            // onValueChange: this.onChangeProductValue.bind(this),
          },
          {
            name: 'level',
            type: 'dropdown',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('level_TC') }),
            options: this.levelList,
            optionLabel: "levelName",
            optionValue: "id",
            // onValueChange: this.onChangeProductValue.bind(this),
          },
          {
            name: 'shelf',
            type: 'dropdown',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('shelf_TC') }),
            options: this.shelfList,
            optionLabel: "shelfName",
            optionValue: "id",
          },
          {
            name: 'minTemp',
            type: 'input'
          },
          {
            name: 'maxTemp',
            type: 'input',
          },
          {
            name: 'length',
            type: 'input'
          },
          {
            name: 'width',
            type: 'input'
          },
          {
            name: 'height',
            type: 'input'
          },
          {
            name: 'maxStorage',
            type: 'input'
          },
        ],
        dataKey: 'id',
        dataSource: this.storageTypeCreation.storage_type_creation_list || [],
      },
    ]
  }

  getFields() {
    return this.formFields;
  }

  resetRow(prevValue: any, tableValue: any) {
    return prevValue;
  }

  getStorageTypeCreationList() {
    this._storageTypeCreation.getStorageTypeList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.storageTypeCreationList = response?.results;
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: ''})
          // );
        }
      }
    )
  }

  deleteStorageTypeCreation(event: Event, storageType: StorageTypeCreation) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteSelectedItems_SC', {entity: ''}),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._storageTypeCreation.removeStorageType(storageType?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {entity: ''})
            );
            this.getStorageTypeCreationList()
          }
        )
      }
    })
  }

  editStorageTypeCreation(storageType: StorageTypeCreation) {
    this.storageTypeCreation = { ...storageType };
    this.setStorageTypeCreationFields();
    this.showStorageTypeCreationModifier = true;
  }

  saveStorageTypeCreation(storageType: StorageTypeCreation) {
    console.log("print",storageType)
    if (this.storageTypeCreation?.id) {
      storageType.id = this.storageTypeCreation?.id;
    }
    this._storageTypeCreation.storageTypeModifier(storageType).subscribe(
      (response) => {
        console.log(response);
        if (Object.keys(response).length!=0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {entity: ''})
          );
          this.showStorageTypeCreationModifier = false;
          this.clearStorageTypeCreation();
          this.getStorageTypeCreationList();
        }
      }
    )
  }

  getAppSettingsList() {
    // console.log('fields', this.formFields)
    this._appSettingsService.getAppSettingsList().subscribe(
      (response) => {
        console.log('App Settings List', response?.results);
        // if (response?.results) {
          this.appSettingsList = response?.results;
        // }
        let currencyArray: any;
        currencyArray = this.appSettingsList.filter(e => e.appKey == 'CURRENCY_TYPES');
        const currencyValue = currencyArray[0]['appValue'].split(",");
        const finalArray = [];
        currencyValue.forEach((element: any) => {
          // console.log('element', element)
          finalArray.push({ id: element, name: element });
        });
        this.appSettingsArray = finalArray;
        console.log('final Value', finalArray)
        this.formFields[1].formSchema[3].options = finalArray;
        // this.formFields[0].fields[4].options = finalArray;
      }
    )
  }

  clearStorageTypeCreation() {
    this.storageTypeCreation = {};
    this.setStorageTypeCreationFields();
  }

}
