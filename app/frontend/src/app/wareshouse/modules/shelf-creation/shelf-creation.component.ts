import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ShelfCreation, shelf_creation_list, ZoneCreation, zoneLevelCreation } from 'src/app/shared/models/wareshouse.model';
import { ShelfCreationService } from './services/shelf-creation.service';
import { StorageZoneCreationServiceService } from '../storage-zone-creation/services/storage-zone-creation-service.service';
import { ZoneLevelCreationService } from '../zone-level-creation/services/zone-level-creation.service';
import { AppSettings } from 'src/app/shared/models/company.model';
import { AppSettingsService } from 'src/app/company/modules/app-settings-main-page/services/app-settings.service';

@Component({
  selector: 'app-shelf-creation',
  templateUrl: './shelf-creation.component.html',
  styleUrls: ['./shelf-creation.component.scss']
})
export class ShelfCreationComponent implements OnInit {

  columns: any = [];
  shelfCreationFields: any = [];
  shelfCreation: ShelfCreation | any = {};
  shelfCreationList: ShelfCreation[] = new Array<ShelfCreation>();
  selectedShelfCreation: ShelfCreation[] = new Array<ShelfCreation>();
  showShelfCreationModifier: boolean = false;

  shelf_creation_list: shelf_creation_list[] = new Array<shelf_creation_list>();
  zoneLevelList: ShelfCreation[] = new Array<ShelfCreation>();

  storageZoneCreationList: ZoneCreation[] = new Array<ZoneCreation>();
  zoneLevelCreationList: zoneLevelCreation[] = new Array<zoneLevelCreation>();
  filteredzoneLevelCreationList: zoneLevelCreation[] = new Array<zoneLevelCreation>();
  filteredRackLevelsList: zoneLevelCreation[] = new Array<zoneLevelCreation>();

  appSettingsList: AppSettings[] = new Array<AppSettings>();
  appSettingsArray: any = [];

  constructor(public translate: TranslateService,
    private _shelfCreationService: ShelfCreationService,
    private _sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private _zoneService: StorageZoneCreationServiceService,
    private _appSettingsService: AppSettingsService,
    private _zonelevelService: ZoneLevelCreationService,) { }

  ngOnInit(): void {
    this.setShelfCreationTable();
    this.getShelfCreationList();
    this.setShelfCreationFields();
    this.getStorageZoneCreationList();
    this.getZoneLevelCreationList();
    this.getAppSettingsList();
    console.log(this.shelfCreationFields);
  }

  setShelfCreationTable() {
    this.columns = [
      { field: 'zoneName', label: 'zoneName_TC' },
      { field: 'levelName', label: 'ZoneLevel_TC' },
    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('ShelfCreation_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('ShelfCreation_TC') })
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
        this.shelfCreationFields[3].formSchema[6].options = finalArray;
      }
    )
  }

  setShelfCreationFields() {
    this.shelfCreationFields = [
      {
        type: 'dropdown',
        name: 'storageZone',
        label: this.translate.instant('zoneName_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('zoneName_TC') }),
        value: this.shelfCreation.storageZone,
        onValueChange: this.onChangeStorageZoneValue.bind(this),
        validation: {
          required: true,
          // maxlength: 50,
        },
        options: this.storageZoneCreationList,
        optionLabel: "zoneName",
        optionValue: "id",
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('zoneName_TC') }),
          // maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('zoneName_TC'), char: this.translate.instant('fifty_number') }),
        }
      },
      {
        type: 'dropdown',
        name: 'rackName',
        label: this.translate.instant('rackName_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('rackName_TC') }),
        value: this.shelfCreation.rackName,
        validation: {
          required: true,
        },
        onValueChange: this.onChangeRackValue.bind(this),
        options: this.filteredzoneLevelCreationList,
        optionLabel: "rackName",
        optionValue: "id",
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('rackName_TC') }),
        }
      },
      {
        type: 'dropdown',
        name: 'zoneLevel',
        label: this.translate.instant('levelName_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('levelName_TC') }),
        value: this.shelfCreation.zoneLevel,
        validation: {
          required: true,
        },
        options: this.filteredRackLevelsList,
        optionLabel: "levelName",
        optionValue: "id",
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('levelName_TC') }),
        }
      },
      {
        type: 'table',
        name: 'shelf_creation_list',
        label: this.translate.instant('ShelfCreationList_TC'),
        formInitialise: {
          status: '', shelfName: '', shelfCode: '', minTemp: '', maxTemp: '', ratePerShelf: '', currencyType: '', minWeight: '', maxWeight: '',
          length: '', width: '', height: '',
          description: ''
        },
        // barCode: '',
        columnSchema: ['pmStatus_TC', 'ShelfName_TC', 'ShelfCode_TC', 'ShelfMinTemp_TC', 'ShelfMaxTemp_TC', 'RatePerShelf_TC', 'currencyType_TC', 'ShelfMinWeight_TC', 'ShelfMaxWeight_TC',
          'ShelfLength', 'ShelfWidth_TC', 'ShelfHeight_TC',
          'ShelfDesciption_TC'],
        //  'ShelfBarCode_TC',
        onCancelForm: this.resetRow.bind(this),
        formSchema: [
          {
            type: 'dropdown',
            name: 'status',
            label: this.translate.instant('pmStatus_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmStatus_TC') }),
            validation: {
              required: true,
            },
            options: [
              { id: '0', name: 'Open' },
              { id: '1', name: 'Closed' },
              { id: '2', name: 'Under Maintainance' },
            ],
            optionLabel: "name",
            optionValue: "id",
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmApprovalStatus_TC') }),
            }
          },
          {
            name: 'shelfName',
            type: 'input',
          },
          {
            name: 'shelfCode',
            type: 'input',
          },
          {
            name: 'minTemp',
            type: 'input'
          },
          {
            name: 'maxTemp',
            type: 'input'
          },
          {
            name: 'ratePerShelf',
            type: 'input'
          },
          {
            type: 'dropdown',
            name: 'currencyType',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('currencyType_TC') }),
            options: this.appSettingsArray,
            optionLabel: 'name',
            optionValue: 'id',
          },
          {
            name: 'minWeight',
            type: 'input'
          },
          {
            name: 'maxWeight',
            type: 'input'
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
          // {
          //   name: 'barCode',
          //   type: 'input'
          // },
          {
            name: 'description',
            type: 'input'
          },
        ],
        dataKey: 'id',
        dataSource: this.shelfCreation?.shelf_creation_list ? this.shelf_creation_list : [],

      },
    ]
  }

  getFields() {
    return this.shelfCreationFields;
  }

  resetRow(prevValue: any, tableValue: any) {
    return prevValue;
  }

  // Get Storage Zone creation list here
  getStorageZoneCreationList() {
    this._zoneService.getStorageZoneCreationList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.storageZoneCreationList = response?.results;
          console.log("storage list", response)
          this.setShelfCreationFields();
        }
      }
    )
  }

  getZoneLevelCreationList() {
    this._zonelevelService.getZoneLevelCreationList().subscribe(
      (response) => {
        console.log("sonelevelleist", response?.results.zone_level_list);
        if (response?.results) {
          this.zoneLevelCreationList = response?.results;
          console.log("sonelevelleist", response?.results[0].zone_level_list);
          this.setShelfCreationFields();
        }
      }
    )
  }

  getShelfCreationList() {
    this._shelfCreationService.getShelfCreationList().subscribe(
      (response) => {
        console.log("shelf creation", response);
        if (response?.results) {
          this.shelfCreationList = response?.results;
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', { entity: this.translate.instant('ShelfCreation_TC') })
          // )
        }
      }
    )
  }

  editShelfCreation(shelfCreation: ShelfCreation) {
    this.filteredzoneLevelCreationList = this.zoneLevelCreationList.filter(e => e.storageZone === shelfCreation.storageZone);
    this.filteredzoneLevelCreationList = this.filteredzoneLevelCreationList
    this.filteredRackLevelsList = this.zoneLevelCreationList.filter(e => Number(e.id) === shelfCreation.rackName);
    this.filteredRackLevelsList = this.filteredRackLevelsList[0].zone_level_list;
    this.shelf_creation_list = shelfCreation.shelf_creation_list;
    this.shelfCreation = { ...shelfCreation };
    console.log(this.shelfCreation)
    this.setShelfCreationFields();
    this.showShelfCreationModifier = true;
  }

  deleteShelfCreation(event: Event, shelfCreation: ShelfCreation) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', { entity: shelfCreation?.zoneLevel }),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._shelfCreationService.removeShelfCreation(shelfCreation?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', { entity: shelfCreation?.zoneLevel })
            );
            this.getShelfCreationList();
          }
        )
      }
    });
  }

  saveShelfCreation(shelfCreation: ShelfCreation) {
    if (this.shelfCreation?.id) {
      shelfCreation.id = this.shelfCreation?.id;
    }
    this._shelfCreationService.ShelfCreationModifier(shelfCreation).subscribe(
      (response) => {
        console.log(response);
        if (Object.keys(response).length != 0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', { entity: '' })
          );
          this.showShelfCreationModifier = false
          this.clearShelfCreation();
          this.getShelfCreationList();
        }
      }
    )
  }

  clearShelfCreation() {
    this.shelfCreation = {};
    this.setShelfCreationFields();
  }


  onChangeStorageZoneValue(prevValue: any, value: any, formValue: any) {
    if (value) {
      this.filteredzoneLevelCreationList = this.zoneLevelCreationList.filter(e => e.storageZone === value);
      if (Object.keys(this.filteredzoneLevelCreationList).length != 0) {
        this.filteredzoneLevelCreationList = this.filteredzoneLevelCreationList;
      }
      else {
        this._sharedService.handleWarning(
          this.translate.instant('entityWarningTitle_TC', { entity: `No Racks Available for this Zone` })
        );

      }
    }
    this.updateZoneLevelFields();
    return formValue;
  }

  updateZoneLevelFields() {
    this.shelfCreationFields[1].options = this.filteredzoneLevelCreationList;
  }


  onChangeRackValue(prevValue: any, value: any, formValue: any) {
    console.log("value", value)
    if (value) {
      this.filteredRackLevelsList = this.zoneLevelCreationList.filter(e => e.id === value);
      this.filteredRackLevelsList = this.filteredRackLevelsList[0].zone_level_list;
      this.shelfCreationFields[2].options = this.filteredRackLevelsList;
    }
    return formValue;
  }


}
