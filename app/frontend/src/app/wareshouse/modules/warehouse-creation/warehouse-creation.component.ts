import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { WareHouseCreation } from 'src/app/shared/models/wareshouse.model';
import { WareshouseCreationService } from './services/wareshouse-creation.service';

@Component({
  selector: 'app-warehouse-creation',
  templateUrl: './warehouse-creation.component.html',
  styleUrls: ['./warehouse-creation.component.scss']
})
export class WarehouseCreationComponent implements OnInit {

  columns: any = [];
  formFields: any = [];
  wareHouseCreation: WareHouseCreation | any = {};
  wareHouseCreationList: WareHouseCreation[]=new Array<WareHouseCreation>();
  selectedWareHouseCreation: WareHouseCreation[]=new Array<WareHouseCreation>();
  showWareHouseCreationModifier: boolean = false;

  constructor(public translate: TranslateService,
    private _sharedService: SharedService,
    private _wareHouseService: WareshouseCreationService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.setWareHouseFields();
    this.setWareHouseTable();
    this.getWareHouseCreationList();
  }

// For Table Show 

  setWareHouseTable() {
    this.columns = [
      {field: 'wareHouseName', label: 'wareHouseName_TC'},
      {field: 'wareHouseCode', label: 'wareHouseCode_TC'},
      {field: 'wareHouseAddress', label: 'wareHouseAddress_TC'},
    ]
  }

  globalSearch(event: any, dt: any){
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any){
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', {entity: this.translate.instant('waresHouseCreation_TC')})
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {entity: this.translate.instant('waresHouseCreation_TC')})
  }

  // Dynamic Form Generating Fields

  setWareHouseFields() {
    this.formFields= [
      {
        type: 'text',
        name: 'wareHouseName',
        label: this.translate.instant('wareHouseName_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('wareHouseName_TC')}),
        value: this.wareHouseCreation.wareHouseName,
        validation: {
          required: true,
          maxlength: 150,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('wareHouseName_TC')}),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('wareHouseName_TC'), char: this.translate.instant('one_fifty_number')}),
        }
      },
      {
        type: 'text',
        name: 'wareHouseCode',
        label: this.translate.instant('wareHouseCode_TC'),
        placeholder: this.translate.instant('autoGenerate_TC', { label: this.translate.instant('wareHouseCode_TC')}),
        value: this.wareHouseCreation.wareHouseCode,
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
        type: 'text',
        name: 'wareHouseAddress',
        label: this.translate.instant('wareHouseAddress_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('wareHouseAddress_TC')}),
        value: this.wareHouseCreation.wareHouseAddress,
        validation: {
          required: true,
          maxlength: 150,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('wareHouseAddress_TC')}),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('wareHouseAddress_TC'), char: this.translate.instant('one_fifty_number')}),
        }
      },
    ]
  }

  // Get or return fields from dynamic form generator

  getFields() {
    return this.formFields;
  }

// Get Ware house creation list here

  getWareHouseCreationList() {
    this._wareHouseService.getWareHouseCreationList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.wareHouseCreationList = response?.results;
        }
      }
    )
  }
//  For editing the added data

  editWareHouseCreation(WareHouseCreation: WareHouseCreation) {
    this.wareHouseCreation = { ...WareHouseCreation };
    this.setWareHouseFields();
    this.showWareHouseCreationModifier = true;
  }

  deleteWareHouseCreation(event: Event, wareHouseCreation: WareHouseCreation) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', {entity: wareHouseCreation?.wareHouseName}),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._wareHouseService.removeWareHouseCreation(wareHouseCreation?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {entity: wareHouseCreation?.wareHouseName})
            );
            this.getWareHouseCreationList();
          }
        )
      }
    });
  }


  saveStorageZoneCreation(wareHouseCreation: WareHouseCreation) {
    
    if(this.wareHouseCreation?.id) {
      wareHouseCreation.id = this.wareHouseCreation?.id;
      this.clearWareHouseCreation();
    }
    this._wareHouseService.WareHouseCreationModifier(wareHouseCreation).subscribe(
      (response) => {
        console.log(response);
        if (Object.keys(response).length!=0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {entity: wareHouseCreation?.wareHouseName})
          );
          this.showWareHouseCreationModifier = false;
          this.getWareHouseCreationList();
        }
      }
    )
  }

  clearWareHouseCreation() {
    this.wareHouseCreation = {};
    this.setWareHouseFields();
  }


}
