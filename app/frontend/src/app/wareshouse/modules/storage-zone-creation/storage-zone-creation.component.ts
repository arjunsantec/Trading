import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { WareHouseCreation, ZoneCreation } from 'src/app/shared/models/wareshouse.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { WareshouseCreationService } from '../warehouse-creation/services/wareshouse-creation.service';
import { StorageZoneCreationServiceService } from './services/storage-zone-creation-service.service';
@Component({
  selector: 'app-storage-zone-creation',
  templateUrl: './storage-zone-creation.component.html',
  styleUrls: ['./storage-zone-creation.component.scss']
})
export class StorageZoneCreationComponent implements OnInit {
  columns: any = [];
  formFields: any = [];
  storageZoneCreation: ZoneCreation | any = {};
  storageZoneCreationList: ZoneCreation[] = new Array<ZoneCreation>();
  selectedStorageZoneCreation: ZoneCreation[] = new Array<ZoneCreation>();
  showStorageZoneCreationModifier: boolean = false;
  wareHouseCreationList: WareHouseCreation[] = new Array<WareHouseCreation>();

  constructor(public translate: TranslateService,
    private _sharedService: SharedService,
    private _zoneService: StorageZoneCreationServiceService,
    private confirmationService: ConfirmationService,
    private _wareHouseService: WareshouseCreationService,) { }


  ngOnInit(): void {
    this.setStorageZoneTable();
    this.setZoneCreationFields();
    this.getStorageZoneCreationList();
    this.getWareHouseCreationList();
  }

  // For Table Show 
  setStorageZoneTable() {
    this.columns = [
      { field: 'warehouseName', label: 'wareHouse_TC' },
      { field: 'zoneName', label: 'zoneName_TC' },
      { field: 'zoneCode', label: 'zoneCode_TC' },
      { field: 'minTemp', label: 'minTemp_TC' },
      { field: 'maxTemp', label: 'maxTemp_TC' },
      // { field: 'barCode', label: 'barCode_TC' },
    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('storageZone_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('storageZone_TC') })
  }


  // Dynamic Form Generating Fields
  setZoneCreationFields() {
    this.formFields = [
      {
        type: 'dropdown',
        name: 'wareHouse',
        label: this.translate.instant('wareHouse_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('wareHouse_TC') }),
        value: this.storageZoneCreation.wareHouse,
        validation: {
          required: true,
        },
        options: this.wareHouseCreationList,
        optionLabel: "wareHouseName",
        optionValue: "id",
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('wareHouse_TC') }),
        }
      },

      {
        type: 'text',
        name: 'zoneName',
        label: this.translate.instant('zoneName_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('zoneName_TC') }),
        value: this.storageZoneCreation.zoneName,
        validation: {
          required: true,
          maxlength: 50,
        },
        // options: [
        //   { id: 'High rack zone', name: 'High rack zone' },
        //   { id: 'Low rack zone', name: 'Low rack zone' },
        //   { id: 'Refrigeration zone', name: 'Refrigeration zone' },
        //   { id: 'Inward Zone', name: 'Inward Zone' },
        //   { id: 'Outward zone', name: 'Outward zone' },
        //   { id: 'Bulk Storage zone	', name: 'Bulk Storage zone	' },
        //   { id: 'Fixed bin zone', name: 'Fixed bin zone' },
        //   { id: 'Others', name: 'Others' },
        // ],
        // optionLabel: "name",
        // optionValue: "id",
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('zoneName_TC') }),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('zoneName_TC'), char: this.translate.instant('fifty_number') }),
        }
      },
      {
        type: 'text',
        name: 'zoneCode',
        label: this.translate.instant('zoneCode_TC'),
        placeholder: this.translate.instant('autoGenerate_TC', { label: this.translate.instant('zoneCode_TC') }),
        value: this.storageZoneCreation.zoneCode,
        readonly: 'readonly',
        // validation: {
        //   maxlength: 50,
        // },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        // errorText: {
        //   maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('zoneName_TC'), char: this.translate.instant('fifty_number') }),
        // }
      },
      {
        type: 'text',
        name: 'minTemp',
        label: this.translate.instant('minTemp_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('minTemp_TC') }),
        value: this.storageZoneCreation.minTemp,
        validation: {
          required: true,
          maxlength: 50,
        },
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('minTemp_TC') }),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('minTemp_TC'), char: this.translate.instant('fifty_number') }),
        }
      },
      {
        type: 'text',
        name: 'maxTemp',
        label: this.translate.instant('maxTemp_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('maxTemp_TC') }),
        value: this.storageZoneCreation.maxTemp,
        validation: {
          required: true,
          maxlength: 50,
        },
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('maxTemp_TC') }),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('maxTemp_TC'), char: this.translate.instant('fifty_number') }),
        }
      },

      // {
      //   type: 'text',
      //   name: 'barCode',
      //   label: this.translate.instant('barCode_TC'),
      //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('barCode_TC') }),
      //   value: this.storageZoneCreation.barCode,
      //   validation: {
      //     maxlength: 50,
      //   },
      //   prefixGroupBy: true,
      //   prefixGroupByIcon: 'pi-user',
      //   errorText: {
      //     maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('zoneName_TC'), char: this.translate.instant('fifty_number') }),
      //   }
      // },
    ]
  }

  // Get or return fields from dynamic form generator
  getFields() {
    return this.formFields;
  }

  // Get Storage Zone creation list here
  getStorageZoneCreationList() {
    this._zoneService.getStorageZoneCreationList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.storageZoneCreationList = response?.results;
          console.log("storage list", response)
        }
      }
    )
  }

  // Get Ware house creation list here

  getWareHouseCreationList() {
    this._wareHouseService.getWareHouseCreationList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.wareHouseCreationList = response?.results;
          this.setZoneCreationFields()
        }
      }
    )
  }

  //  to edit the added data
  editStorageZoneCreation(storageZoneCreation: ZoneCreation) {
    this.storageZoneCreation = { ...storageZoneCreation };
    this.setZoneCreationFields();
    this.showStorageZoneCreationModifier = true;
  }


  deleteStorageZoneCreation(event: Event, storageZoneCreation: ZoneCreation) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', { entity: storageZoneCreation?.zoneName }),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._zoneService.removeStorageZoneCreation(storageZoneCreation?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', { entity: storageZoneCreation?.zoneName })
            );
            this.getStorageZoneCreationList();
          }
        )
      }
    });
  }

  //to save 
  saveStorageZoneCreation(storageZoneCreation: ZoneCreation) {

    if (this.storageZoneCreation?.id) {
      storageZoneCreation.id = this.storageZoneCreation?.id;
      this.clearStorageZoneCreation();
    }
    this._zoneService.StorageZoneCreationModifier(storageZoneCreation).subscribe(
      (response) => {
        console.log(response);
        if (Object.keys(response).length != 0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', { entity: storageZoneCreation?.zoneName })
          );
          this.showStorageZoneCreationModifier = false;
          this.getStorageZoneCreationList();
        }
      }
    )
  }

  clearStorageZoneCreation() {
    this.storageZoneCreation = {};
    this.setZoneCreationFields();
  }
} 
