import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { MaterialReceipt } from 'src/app/shared/models/inventory.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ProjectCreation } from 'src/app/shared/models/project.model';
import { ProjectService } from 'src/app/project/modules/project-main-page/services/project.service';
import { PriceSetting } from 'src/app/shared/models/finance.model';
import { PriceSettingService } from './services/price-setting.service';
import { AppSettings } from 'src/app/shared/models/company.model';
import { AppSettingsService } from 'src/app/company/modules/app-settings-main-page/services/app-settings.service';

@Component({
  selector: 'app-price-setting',
  templateUrl: './price-setting.component.html',
  styleUrls: ['./price-setting.component.scss']
})
export class PriceSettingComponent implements OnInit {

  priceSetting: PriceSetting | any = {};
  priceSettingList: PriceSetting[] = new Array<PriceSetting>();
  selectedPriceSetting: PriceSetting[] = new Array<PriceSetting>();
  showPriceSettingModifier: boolean = false;
  projectList: ProjectCreation[] = new Array<ProjectCreation>();
  appSettingsList: AppSettings[] = new Array<AppSettings>();

  showmaterialReceiptPrintModifier: boolean = false;
  printFields: any = [];
  materialReceiptObject = {};
  approved:boolean = false;
  date1: Date;
  formFields: any = [];
  columns: any = [];
  appSettingsArray: any = [];
  appSettingsArray1: any = [];
  appSettingsArray2: any = [];
  appSettingsArray3: any = [];

  constructor(
    private _priceSettingService: PriceSettingService,
    private _sharedService: SharedService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService,
    private _projectService: ProjectService,
    private datePipe: DatePipe,
    private _appSettingsService: AppSettingsService,
  ) { }

  ngOnInit(): void {
    this.getProjectList();
    this.setPriceSettingTable();
    this.getPriceSettingList();
    this.getAppSettingsList();
  }

  setPriceSettingTable() {
    this.columns = [

      { field: 'projectName', label: 'project_TC' },
      // { field: 'materialReceiptCode', label: 'materialCode_TC' },
      // { field: 'poNumber', label: 'poNumber_TC' },
      // { field: 'poDate', label: 'poDate_TC' },
      // { field: 'supplierInvoiceNumber', label: 'supplierInvoiceNumber_TC' },
      // { field: 'courierNo', label: 'courierNo_TC' },
      // { field: 'supplier', label: 'supplierName_TC' },
      // { field: 'recipient', label: 'recipientName_TC' },
      // { field: 'supplierAddress', label: 'supplierAddress_TC' },
      // { field: 'supplierPhone', label: 'supplierPhone_TC' },
      // { field: 'deliveryChallanNo', label: 'deliveryChallanNo_TC' },
      // { field: 'corgoType', label: 'corgoType_TC' },
      // { field: 'boxQty', label: 'boxQty_TC' },
      // { field: 'requestApproval', label: 'requestApproval_TC' },
      // { field: 'approvalOnDeviatior', label: 'approvalOnDeviatior_TC' },
      // { field: 'awb', label: 'awb_TC' },
      // { field: 'sponsor', label: 'sponsor_TC' },
      // { field: 'portocol', label: 'portocol_TC' },
      // { field: 'project', label: 'project_TC' },
      // { field: 'weight', label: 'weight_TC' },
      // { field: 'size', label: 'size_TC' },
      // { field: 'recipientAddress', label: 'recipientAddress_TC' },
      // { field: 'recipientPhone', label: 'recipientPhone_TC' },
      // { field: 'isApproved', label: 'isApproved_TC' },
      // { field: 'grn_details', label: 'grnDetails_TC' },
      // { field: 'invoice', label: 'Invoice_TC' },
      // { field: 'invoiceIn', label: 'InvoiceIn_TC' },
      // { field: 'carrierInvoice', label: 'CarrierInvoice_TC' },
      // { field: 'receiveDate', label: 'receiveDate_TC' },
      // { field: 'courier', label: 'courier_TC' },
      // { field: 'orderNumber', label: 'orderNumber_TC' },
      // { field: 'studyNumber', label: 'studyNumber_TC' },
      // { field: 'incoTerms', label: 'incoTerms_TC' },
      // { field: 'shippingCondition', label: 'shippingCondition_TC' },
      // { field: 'storageCondition', label: 'storageCondition_TC' },
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
      entity: this.translate.instant('price_setting_TC'),
    });
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {
      entity: this.translate.instant('price_setting_TC'),
    });
  }

  setPriceSettingFields() {
    this.formFields = [

      {
        type: 'fieldset',
        headerText: this.translate.instant('project_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'project',
            label: this.translate.instant('project_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('project_TC'),
            }),
            value: this.priceSetting.project,
            readonly: false,
            required: true,
            validation: {
              required: true,
            },
            options: this.projectList,
            optionLabel: "projectName",
            optionValue: "id",
            // onValueChange: this.onChangePartyValue.bind(this),

            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('project_TC') }),
            }
          },
          {
            type: 'dropdown',
            name: 'Currency',
            label: this.translate.instant('currency_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('currency_TC'),
            }),
            value: this.priceSetting.Currency,
            required: true,
            validation: {
              required: true,
            },
            options: this.appSettingsArray,
            optionLabel: 'name',
            optionValue: 'id',
            // onValueChange: this.onChangePartyValue.bind(this),

            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('currency_TC') }),
            }
          },
          
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('details_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'shelfRate',
            label: this.translate.instant('shelfRate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('shelfRate_TC'),
            }),
            value: this.priceSetting.shelfRate,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('shelfRate_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('shelfRate_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          

          // pallet

          {
            type: 'text',
            name: 'palletRate',
            label: this.translate.instant('palletRate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('palletRate_TC'),
            }),
            value: this.priceSetting.palletRate,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('palletRate_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('palletRate_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          // {
          //   type: 'dropdown',
          //   name: 'palletCurrency',
          //   label: this.translate.instant('palletCurrency_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('palletCurrency_TC'),
          //   }),
          //   value: this.priceSetting.palletCurrency,
          //   required: true,
          //   validation: {
          //     required: true,
          //   },
          //   options: this.appSettingsArray1,
          //   optionLabel: 'name',
          //   optionValue: 'id',
          //   // onValueChange: this.onChangePartyValue.bind(this),

          //   errorText: {
          //     required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('palletCurrency_TC') }),
          //   }
          // },
          //fridge

          {
            type: 'text',
            name: 'fridgeRate',
            label: this.translate.instant('fridgeRate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('fridgeRate_TC'),
            }),
            value: this.priceSetting.fridgeRate,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('fridgeRate_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('fridgeRate_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          // paddons

          {
            type: 'text',
            name: 'paddonsRate',
            label: this.translate.instant('paddonsRate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('paddonsRate_TC'),
            }),
            value: this.priceSetting.paddonsRate,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('paddonsRate_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('paddonsRate_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          // {
          //   type: 'dropdown',
          //   name: 'paddonsCurrency',
          //   label: this.translate.instant('paddonsCurrency_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('paddonsCurrency_TC'),
          //   }),
          //   value: this.priceSetting.paddonsCurrency,
          //   required: true,
          //   validation: {
          //     required: true,
          //   },
          //   options: this.appSettingsArray2,
          //   optionLabel: 'name',
          //   optionValue: 'id',
          //   // onValueChange: this.onChangePartyValue.bind(this),

          //   errorText: {
          //     required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('paddonsCurrency_TC') }),
          //   }
          // },

          // box

          {
            type: 'text',
            name: 'boxRate',
            label: this.translate.instant('boxRate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('boxRate_TC'),
            }),
            value: this.priceSetting.boxRate,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('boxRate_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('boxRate_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          // {
          //   type: 'dropdown',
          //   name: 'boxCurrency',
          //   label: this.translate.instant('boxCurrency_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('boxCurrency_TC'),
          //   }),
          //   value: this.priceSetting.boxCurrency,
          //   required: true,
          //   validation: {
          //     required: true,
          //   },
          //   options: this.appSettingsArray3,
          //   optionLabel: 'name',
          //   optionValue: 'id',
          //   // onValueChange: this.onChangePartyValue.bind(this),

          //   errorText: {
          //     required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('boxCurrency_TC') }),
          //   }
          // },

          // pricing date

          {
            type: 'date',
            name: 'pricingDate',
            label: this.translate.instant('pricingDate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('pricingDate_TC'),
            }),
            value: this.priceSetting.pricingDate,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('pricingDate_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('pricingDate_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
        ]
      },
    ]
  }

  resetRow(prevValue: any, tableValue: any) {
    return prevValue;
  }

  getFields() {
    return this.formFields;
  }

  getPriceSettingList() {
    this._priceSettingService
      .getPriceSettingList()
      .subscribe((response) => {
        console.log(response);
        if (response?.results) {
          this.priceSettingList = response?.results;
          console.log("check list",this.priceSettingList)
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('materialReceipt_TC')})
          // );
        }
      });
  }

  editPriceSetting(priceSetting: PriceSetting) {
    this.showPriceSettingModifier = true;
    console.log("price setting", priceSetting)
    this.priceSetting = { ...priceSetting };
    this.setPriceSettingFields();
    this.showPriceSettingModifier = true;
  }

  deletePriceSetting(event: Event, pricesetting: PriceSetting) {
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
        this._priceSettingService
          .removePriceSetting(pricesetting?.id)
          .subscribe((response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {
                entity:'Project',
              })
            );
            this.getPriceSettingList();
          });
      },
    });
  }

  clearPriceSetting() {
    this.priceSetting = {};
    this.setPriceSettingFields();
  }

  savePriceSetting(priceSetting: PriceSetting) {
    // console.log(materialReceipt)

    if (this.priceSetting?.id) {
      priceSetting.id = this.priceSetting?.id;
      // materialReceipt.isApproved = this.materialReceipt?.isApproved;
      // this.clearMaterialReceipt();
    }
    
    this._priceSettingService
      .priceSettingModifier(priceSetting)
      .subscribe((response) => {
        console.log(response);
        if (Object.keys(response).length != 0) {
          console.log('response', response);
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {
              entity: 'Project',
            })
          );
          this.showPriceSettingModifier = false;
          this.getPriceSettingList();
        }
      });
  }

  getProjectList() {
    this._projectService.getProjectList().subscribe((response) => {
      console.log('project list', response);
      if (response?.results) {
        this.projectList = response?.results;
        console.log('project list', this.projectList);
        this.setPriceSettingFields();
      }
    })
  }

  getAppSettingsList() {
    this._appSettingsService.getAppSettingsList().subscribe(
      (response) => {
        console.log('App Settings List', response?.results);
          this.appSettingsList = response?.results;
        let currencyArray: any;
        currencyArray = this.appSettingsList.filter(e => e.appKey == 'CURRENCY_TYPES');
        console.log("check currency list",currencyArray)
        const currencyValue = currencyArray[0]['appValue'].split(",");
        const finalArray = [];
        currencyValue.forEach((element: any) => {
          // console.log('element', element)
          finalArray.push({ id: element, name: element });
        });
        this.appSettingsArray = finalArray;
        this.appSettingsArray1 = finalArray;
        this.appSettingsArray2 = finalArray;
        this.appSettingsArray3 = finalArray;
        console.log('final Value', finalArray)
        
        this.setPriceSettingFields();
      }
    )
  }

}
