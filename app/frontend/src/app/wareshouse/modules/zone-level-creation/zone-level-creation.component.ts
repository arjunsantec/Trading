import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ZoneCreation, zoneLevels } from 'src/app/shared/models/wareshouse.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StorageZoneCreationServiceService } from '../storage-zone-creation/services/storage-zone-creation-service.service';
import { zoneLevelCreation } from 'src/app/shared/models/wareshouse.model';
import { ZoneLevelCreationService } from './services/zone-level-creation.service';
import { AppSettings } from 'src/app/shared/models/company.model';
import { AppSettingsService } from 'src/app/company/modules/app-settings-main-page/services/app-settings.service';

@Component({
  selector: 'app-zone-level-creation',
  templateUrl: './zone-level-creation.component.html',
  styleUrls: ['./zone-level-creation.component.scss']
})
export class ZoneLevelCreationComponent implements OnInit {
  columns: any = [];
  formFields: any = [];
  zoneLevelCreation: zoneLevelCreation | any = {};
  storageZoneCreationList: ZoneCreation[] = new Array<ZoneCreation>();
  zone_level_list: zoneLevels[] = new Array<zoneLevels>();
  zoneLevelCreationList: zoneLevelCreation[] = new Array<zoneLevelCreation>();
  showzoneLevelCreationModifier: boolean = false;
  selectedZoneLevelCreation: zoneLevelCreation[] = new Array<zoneLevelCreation>();
  filteredstorageZoneCreationList: ZoneCreation[] = new Array<ZoneCreation>();
  minTemp: string;
  maxTemp: string;

  appSettingsList: AppSettings[] = new Array<AppSettings>();
  appSettingsArray: any = [];
  
  // zoneLevelCreation:zoneLevelCreation[]=new Array<zoneLevelCreation>();
  constructor(public translate: TranslateService,
    private _sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private _zoneService: StorageZoneCreationServiceService,
    private _appSettingsService: AppSettingsService,
    private _zonelevelService: ZoneLevelCreationService,) { }

  ngOnInit(): void {
    this.getStorageZoneCreationList();
    this.setZoneLevelsTable();
    this.setZoneLevelCreationFields();
    this.getZoneLevelCreationList();
    this.getAppSettingsList();
    console.log(this.formFields);
  }


  setZoneLevelsTable() {
    this.columns = [
      { field: 'zoneName', label: 'zoneName_TC' },
      // {field: 'zone_level_list', label: 'zone_level_list_TC'},
    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('zoneLevelCreation_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('zoneLevelCreation_TC') })
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
        this.formFields[3].formSchema[5].options = finalArray;
      }
    )
  }

  setZoneLevelCreationFields() {
    this.formFields = [
      {
        type: 'dropdown',
        name: 'storageZone',
        label: this.translate.instant('zoneName_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('zoneName_TC') }),
        value: this.zoneLevelCreation.storageZone,
        validation: {
          required: true,
          maxlength: 50,
        },
        onValueChange: this.onChangeStorageZoneValue.bind(this),
        options: this.storageZoneCreationList,
        optionLabel: "zoneName",
        optionValue: "id",
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('zoneName_TC') }),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('zoneName_TC'), char: this.translate.instant('fifty_number') }),
        }
      },
      {
        type: 'text',
        name: 'rackName',
        label: this.translate.instant('rackName_TC'),
        placeholder:this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('rackName_TC')}),
        value: this.zoneLevelCreation.rackName,
        validation: {
          required: true,
          maxlength: 150,
        },
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('rackName_TC')}),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('rackName_TC'), char: this.translate.instant('one_fifty_number')}),
        }
      },
      {
        type: 'text',
        name: 'rackCode',
        label: this.translate.instant('rackCode_TC'),
        placeholder: this.translate.instant('autoGenerate_TC', { label: this.translate.instant('rackCode_TC')}),
        value: this.zoneLevelCreation.rackCode,
        readonly:'readonly',
        // validation: {
        //   required: true,
        //   maxlength: 150,
        // },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        // errorText: {
        //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('wareHouseCode_TC')}),
        //   maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('wareHouseCode_TC'), char: this.translate.instant('one_fifty_number')}),
        // }
      },
      {
        type: 'table',
        name: 'zone_level_list',
        label: this.translate.instant('zoneLevelList_TC'),
        formInitialise: { levelName: '', levelCode: '', minTemp: '', maxTemp: '', ratePerLevel: '', currencyType: '', minWeight: '', maxWeight: '', description: '' },
        columnSchema: ['levelName_TC', 'levelCode_TC', 'minTemp_TC', 'maxTemp_TC', 'ratePerLevel_TC', 'currencyType_TC', 'minWeight_TC', 'maxWeight_TC', 'description_TC'],
        formSchema: [
          {
            name: 'levelName',
            type: 'input',
          },
          {
            name: 'levelCode',
            type: 'input',
          },
          {
            name: 'minTemp',
            type: 'number'
          },
          {
            name: 'maxTemp',
            type: 'number'
          },
          {
            name: 'ratePerLevel',
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
            type: 'input',
          },
          {
            name: 'maxWeight',
            type: 'input'
          },
          // {
          //   name: 'barCode',
          //   type: 'input'
          // }
          // ,
          {
            name: 'description',
            type: 'input'
          },
          
        ],
        onCancelForm: this.resetRow.bind(this),
        dataKey: 'id',
        dataSource: this.zoneLevelCreation.zone_level_list || [],
      },
    ]
  }

  getFields() {
    return this.formFields;
  }

  resetRow(prevValue: any, tableValue: any) {
    return prevValue;
  }

  getStorageZoneCreationList() {
    this._zoneService.getStorageZoneCreationList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.storageZoneCreationList = response?.results;

          this.setZoneLevelCreationFields();
        }
      }
    )
  }

  getZoneLevelCreationList() {
    this._zonelevelService.getZoneLevelCreationList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.zoneLevelCreationList = response?.results;
        }
      }
    )
  }

  editZoneLevelCreation(zoneLevelCreation: zoneLevelCreation) {
    this.zoneLevelCreation = { ...zoneLevelCreation };
    this.storageZoneCreationList;
    this.showzoneLevelCreationModifier = true;
    this.setZoneLevelCreationFields();
    this.filteredstorageZoneCreationList = this.storageZoneCreationList.filter(e => Number(e.id) === zoneLevelCreation.storageZone);
    this.minTemp = this.filteredstorageZoneCreationList[0].minTemp;
    this.maxTemp = this.filteredstorageZoneCreationList[0].maxTemp;
    this.formFields[3].formInitialise.maxTemp = this.maxTemp
    this.formFields[3].formInitialise.minTemp = this.minTemp
  }


  deleteZoneLevelCreation(event: Event, zoneLevelCreation: any) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', { entity: zoneLevelCreation?.zoneName }),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._zonelevelService.removeZoneLevelCreation(zoneLevelCreation?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', { entity: zoneLevelCreation?.zoneName })
            );
            this.getZoneLevelCreationList();
          }
        )
      }
    });
  }

  saveZoneLevelCreation(zoneLevelCreation: zoneLevelCreation) {
    console.log('zone level', zoneLevelCreation);
    if (this.zoneLevelCreation?.id) {
      zoneLevelCreation.id = this.zoneLevelCreation?.id;
      // zoneLevelCreation.zone_level_list = this.zone_level_list;
    }
    this._zonelevelService.zoneLevelCreationModifier(zoneLevelCreation).subscribe(
      (response) => {
        console.log(response);
        if (Object.keys(response).length != 0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', { entity: '' })
          );
          this.showzoneLevelCreationModifier = false;
          this.clearZoneLevelCreation();
          this.getZoneLevelCreationList();
        }
      }
    )
  }

  clearZoneLevelCreation() {
    this.zoneLevelCreation = {};
    this.setZoneLevelCreationFields();
  }

  onChangeStorageZoneValue(prevValue: any, value: any, formValue: any) {
    if (value) {
      this.filteredstorageZoneCreationList = this.storageZoneCreationList.filter(e => e.id === value);
      this.minTemp = this.filteredstorageZoneCreationList[0].minTemp;
      this.maxTemp = this.filteredstorageZoneCreationList[0].maxTemp;
      this.formFields[3].formInitialise.maxTemp = this.maxTemp
      this.formFields[3].formInitialise.minTemp = this.minTemp
    }
    return formValue;
  }

}
