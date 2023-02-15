import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { FormBuilderComponent } from 'src/app/dynamic-form-generator/components/form-builder/form-builder.component';
import { TableFieldComponent } from 'src/app/dynamic-form-generator/fields/table-field/table-field.component';
import { InvoiceMainPageService } from 'src/app/invoice/modules/invoice-main-page/services/invoice-main-page.service';
import { PartyMasterService } from 'src/app/master/modules/party-master-main-page/services/party-master.service';
import { PartyMaster } from 'src/app/shared/models/party.model';
import { CMTRFCreation } from 'src/app/shared/models/project.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CmtrfService } from './services/cmtrf.service';
import * as moment from 'moment';

@Component({
  selector: 'app-cmtrf-form',
  templateUrl: './cmtrf-form.component.html',
  styleUrls: ['./cmtrf-form.component.scss']
})
export class CmtrfFormComponent implements OnInit {


  cmtrfCreation: CMTRFCreation | any = {};
  cmtrfCreationList: CMTRFCreation[] = new Array<CMTRFCreation>();
  selectedCMTRFCreation: CMTRFCreation[] = new Array<CMTRFCreation>();
  showCMTRFCreationModifier: boolean = false;

  formFields: any = [];
  columns: any = [];

  batchNumberList: any = [];

  responseArray = [];
  object: any = { item: '', quantity: '', product: '', expiry_date: '', kit_no: '' };
  changesList: any = [];

  partyList: PartyMaster[] = new Array<PartyMaster>();

  constructor(private _cmtrfCreationService: CmtrfService,
    private _sharedService: SharedService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService,
    private _invoiceService: InvoiceMainPageService,
    private changeDetectorRef: ChangeDetectorRef,
    private _pratyService: PartyMasterService) { }

  ngOnInit(): void {
    this.setCMTRFCreationFields();
    this.setCMTRFCreationTable();
    this.getCMTRFCreationList();
    this.getBatchNumberList();
    this.getPartyList();
    console.log('fields', this.formFields);
  }

  setCMTRFCreationTable() {
    this.columns = [
      { field: 'protocol', label: 'protocol_TC' },
      { field: 'depot', label: 'depot_TC' },
      { field: 'orderNumber', label: 'orderNumber_TC' },
      { field: 'batchNumber', label: 'batchNumber_TC' },
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
      entity: this.translate.instant('cmtrf_TC'),
    });
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {
      entity: this.translate.instant('cmtrf_TC'),
    });
  }

  getBatchNumberList() {
    this._invoiceService.getBatchNumberList().subscribe(
      (response) => {
        // console.log(response);
        // if (response) {
        this.batchNumberList = response.batch_number;
        console.log("batchNumberList", this.batchNumberList)
        this.setCMTRFCreationFields();
        // }
      }
    )
  }

  getPartyList() {
    this._pratyService.getPartyMasterList().subscribe(
      (response) => {
        // console.log("check results", response);
        if (response?.results) {
          this.partyList = response?.results;
          console.log("party list", this.partyList)
          this.setCMTRFCreationFields();
        }
      }
    )
  }

  setCMTRFCreationFields() {
    this.formFields = [
      {
        type: 'text',
        name: 'protocol',
        label: this.translate.instant('protocol_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('protocol_TC') }),
        value: this.cmtrfCreation.protocol,
        validation: {
          // required: true,
          maxlength: 100,
        },
        errorText: {
          // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('protocol_TC') }),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('protocol_TC'), char: this.translate.instant('hundred_number') })
        }
      },
      {
        type: 'text',
        name: 'depot',
        label: this.translate.instant('depot_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('depot_TC') }),
        value: this.cmtrfCreation.depot,
        validation: {
          // required: true,
          maxlength: 100,
        },
        errorText: {
          // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('depot_TC') }),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('depot_TC'), char: this.translate.instant('hundred_number') })
        }
      },
      {
        type: 'text',
        name: 'orderNumber',
        label: this.translate.instant('orderNumber_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('orderNumber_TC') }),
        value: this.cmtrfCreation.orderNumber,
        validation: {
          // required: true,
          maxlength: 100,
        },
        errorText: {
          // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('orderNumber_TC') }),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('orderNumber_TC'), char: this.translate.instant('hundred_number') })
        }
      },
      {
        type: 'dropdown',
        name: 'batchNumber',
        label: this.translate.instant('batchNumber_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', {
          label: this.translate.instant('batchNumber_TC'),
        }),
        value: this.cmtrfCreation.batchNumber,
        // validation: {
        //   required: true,
        // },
        options: this.batchNumberList,
        optionLabel: "batch_no",
        optionValue: "batch_no",
        onValueChange: this.onChangeBatchNumber.bind(this),
        // errorText: {
        //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('batchNumber_TC') }),
        // }
      },
      {
        type: 'table',
        name: 'cmtrf_list',
        label: this.translate.instant('shipmentContent_TC'),
        formInitialise: { item: '', quantity: '', product: '', expiry_date: '', kit_no: '' },
        columnSchema: ['item_TC', 'quantity_TC', 'productName_TC', 'expiryDateTable_TC', 'kit_no_TC'],
        formSchema: [
          {
            type: 'input',
            name: 'item',
          },
          {
            type: 'input',
            name: 'quantity',
          },
          {
            type: 'input',
            name: 'product',
          },
          {
            type: 'date',
            name: 'expiry_date',
          },
          {
            type: 'input',
            name: 'kit_no',
          },
        ],
        // onValueChange: this.onChangeTableValue.bind(this),
        onCancelForm: this.resetRow.bind(this),
        dataKey: 'id',
        // getTableRowID: this.getTableRowID.bind(this),
        dataSource: this.cmtrfCreation.cmtrf_list || [],
        // maxWidthFooter: "207.4px"
      },
      // {
      //   type: 'fieldset',
      //   headerText: this.translate.instant('acknowledgement_TC'),
      //   fillScreen: false,
      //   fields: [
          {
            type: 'dropdown',
            name: 'receiverName',
            label: this.translate.instant('receiverName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('receiverName_TC'),
            }),
            value: this.cmtrfCreation.receiverName,
            // validation: {
            //   required: true,
            // },
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('receiverName_TC') }),
            // }
          },
          {
            type: 'table',
            name: 'acknowledgement_list',
            label: this.translate.instant('acknowledgement_TC'),
            formInitialise: { container: '', data_logger: '', alarm: false },
            columnSchema: ['container_TC', 'dataLogger_TC', 'alarm_TC'],
            formSchema: [
              {
                type: 'input',
                name: 'container',
              },
              {
                type: 'input',
                name: 'data_logger',
              },
              {
                type: 'boolean',
                name: 'alarm',
              },
            ],
            onCancelForm: this.resetRow.bind(this),
            dataKey: 'id',
            dataSource: this.cmtrfCreation.acknowledgement_list || [],
          },
      //   ]
      // },
    ]
  }

  getFields() {
    return this.formFields;
  }

  resetRow(prevValue: any, tableValue: any) {
    return prevValue;
  }

  getCMTRFCreationList() {
    this._cmtrfCreationService.getCtmrfList().subscribe((response) => {
      console.log(response);
      if (response?.results) {
        this.cmtrfCreationList = response?.results;
        // this._sharedService.handleSuccess(
        //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('cmtrf_TC')})
        // );
      }
    });
  }

  onChangeBatchNumber(prevValue: any, value: any, formValue: any) {
    console.log("check Batch", value, formValue)
    console.log('form fields batch', this.formFields[4].dataSource);
    const v = []
    this._cmtrfCreationService.getBatchProductTaggingList(value).subscribe(
      (response) => {
        console.log('product tagging', response);
        if (response.length != 0) {
          for (let j = 0; j <= this.formFields[4].dataSource?.length + 1; j++) {
            this.formFields[4].dataSource.pop(j)
          }
          response.forEach((element: any) => {
            let expiry_date = moment(element.expiry).format("YYYY-MM-DD")
            this.object = {
              item: '',
              quantity: element.available_qty,
              product: element.product__product_name,
              expiry_date: expiry_date,
              kit_no: element.kit_no,
            }
            console.log('data', this.object);
            const id = this.generateUniqueId();
            let item: any = {};
            Object.assign(item, this.object)
            item.id = id;
            this.formFields[4].dataSource.push(item);
          }
          )
        }
      }
    )
  }

  generateUniqueId() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  editCMTRFCreation(cmtrfCreation: CMTRFCreation) {
    this.cmtrfCreation = { ...cmtrfCreation };
    this.setCMTRFCreationFields();
    this.showCMTRFCreationModifier = true;
    console.log('form fields batch', this.formFields);
    this.ngOnInit();
  }

  deleteCMTRFCreation(event: Event, cmtrfCreation: CMTRFCreation) {
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
        this._cmtrfCreationService.removeCtmrf(cmtrfCreation?.id).subscribe((response) => {
          console.log(response);
          this._sharedService.handleSuccess(
            this.translate.instant('entityDeleteSuccessTitle_TC', {
              entity: '',
            })
          );
          this.getCMTRFCreationList();
        });
      },
    });
  }

  saveCMTRFCreation(cmtrfCreation: CMTRFCreation) {
    console.log('save', cmtrfCreation);
    if (this.cmtrfCreation?.id) {
      cmtrfCreation.id = this.cmtrfCreation?.id;
    }
    this._cmtrfCreationService.ctmrfModifier(cmtrfCreation).subscribe((response) => {
      console.log("response", response);
      if (Object.keys(response).length != 0) {
        this._sharedService.handleSuccess(
          this.translate.instant('entityUpdateSuccessTitle_TC', {
            entity: '',
          })
        );
        this.showCMTRFCreationModifier = false;
        this.clearCMTRFCreation();
        this.getCMTRFCreationList();
      }
    });
  }

  clearCMTRFCreation() {
    this.cmtrfCreation = {};
    this.setCMTRFCreationFields();
  }

}
