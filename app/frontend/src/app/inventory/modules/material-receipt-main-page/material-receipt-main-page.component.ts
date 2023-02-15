import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { MaterialReceipt } from 'src/app/shared/models/inventory.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { MaterialReceiptService } from './services/material-receipt.service';
import { productMaster } from 'src/app/shared/models/product.model';
import { PartyMaster } from 'src/app/shared/models/party.model';
import { PartyMasterService } from 'src/app/master/modules/party-master-main-page/services/party-master.service';
import { ProductMasterService } from 'src/app/master/modules/product-master-main-page/services/product-master.service';
import { WareshouseCreationService } from 'src/app/wareshouse/modules/warehouse-creation/services/wareshouse-creation.service';
import { shelf_creation_list, WareHouseCreation, ZoneCreation, zoneLevelCreation, zoneLevels } from 'src/app/shared/models/wareshouse.model';
import { StorageZoneCreationServiceService } from 'src/app/wareshouse/modules/storage-zone-creation/services/storage-zone-creation-service.service';
import { ZoneLevelCreationService } from 'src/app/wareshouse/modules/zone-level-creation/services/zone-level-creation.service';
import { ShelfCreationService } from 'src/app/wareshouse/modules/shelf-creation/services/shelf-creation.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ProjectCreation } from 'src/app/shared/models/project.model';
import { ProjectService } from 'src/app/project/modules/project-main-page/services/project.service';

@Component({
  selector: 'app-material-receipt-main-page',
  templateUrl: './material-receipt-main-page.component.html',
  styleUrls: ['./material-receipt-main-page.component.scss'],
})
export class MaterialReceiptMainPageComponent implements OnInit {
  materialReceipt: MaterialReceipt | any = {};
  materialReceiptList: MaterialReceipt[] = new Array<MaterialReceipt>();
  selectedMaterialReceipt: MaterialReceipt[] = new Array<MaterialReceipt>();
  showMaterialReceiptModifier: boolean = false;
  wareHouseCreationList: WareHouseCreation[] = new Array<WareHouseCreation>();
  storageZoneCreationList: ZoneCreation[] = new Array<ZoneCreation>();
  zone_level_list: zoneLevels[] = new Array<zoneLevels>();
  zoneLevelCreationList: zoneLevelCreation[] = new Array<zoneLevelCreation>();
  shelf_creation_list: shelf_creation_list[] = new Array<shelf_creation_list>();
  zoneCreationList: ZoneCreation[] = new Array<ZoneCreation>();

  formFields: any = [];
  columns: any = [];
  productList: productMaster[] = new Array<productMaster>();
  partyList: PartyMaster[] = new Array<PartyMaster>();
  projectList: ProjectCreation[] = new Array<ProjectCreation>();

  showmaterialReceiptPrintModifier: boolean = false;
  printFields: any = [];
  materialReceiptObject = {};
  approved:boolean = false;
  date1: Date;


  constructor(
    private _materialReceiptService: MaterialReceiptService,
    private _productService: ProductMasterService,
    private _partyService: PartyMasterService,
    private _sharedService: SharedService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService,
    private _wareHouseService: WareshouseCreationService,
    private _zoneService: StorageZoneCreationServiceService,
    private _zonelevelService: ZoneLevelCreationService,
    private _shelfCreationService: ShelfCreationService,
    private _projectService: ProjectService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    let date = new Date();
    this.date1 = date;
    console.log('date value', date, this.date1)
    this.setMaterialReceiptFields();
    this.setMaterialReceiptTable();
    this.getMaterialReceiptList();
    this.getProductList();
    this.getPartyList();
    this.getProjectList();
    this.getWareHouseCreationList();
    this.getAllStorageZoneCreationList();
    this.approved = false;    
    // this.date1 = today.getMonth() + '/' + today.getDate() + '/' + today.getFullYear();

    console.log("form fields ", this.formFields)
  
  }

  setMaterialReceiptTable() {
    this.columns = [

      { field: 'isApproved', label: 'pmStatus_TC' },
      { field: 'materialReceiptCode', label: 'materialCode_TC' },
      // { field: 'poNumber', label: 'poNumber_TC' },
      // { field: 'poDate', label: 'poDate_TC' },
      // { field: 'supplierInvoiceNumber', label: 'supplierInvoiceNumber_TC' },
      // { field: 'courierNo', label: 'courierNo_TC' },
      { field: 'supplier', label: 'supplierName_TC' },
      { field: 'recipient', label: 'recipientName_TC' },
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
      entity: this.translate.instant('materialReceipt_TC'),
    });
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {
      entity: this.translate.instant('materialReceipt_TC'),
    });
  }

  setMaterialReceiptFields() {
    this.formFields = [
      // {
      //   type: 'dropdown',
      //   name: 'inwardType',
      //   label: this.translate.instant('inwardType_TC'),
      //   placeholder: this.translate.instant('formPlaceholder_SC', {
      //     label: this.translate.instant('inwardType_TC'),
      //   }),
      //   value: this.materialReceipt.inwardType,
      //   readonly: false,
      //   validation: {
      //     required: true,
      //   },
      //   options: [
      //     { id: 'With Purchase Order', name: 'With Purchase Order' },
      //     { id: 'With out Purchase Order', name: 'With out Purchase Order' },

      //   ],
      //   optionLabel: "name",
      //   optionValue: "id",
      //   errorText: {
      //     required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('supplierName_TC') }),
      //   }
      // },
      {
        type: 'fieldset',
        headerText: this.translate.instant('materialReceipt_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'materialReceiptCode',
            label: this.translate.instant('materialCode_TC'),
            placeholder: this.translate.instant('autoGenerate_TC', { label: this.translate.instant('materialCode_TC') }),
            value: this.materialReceipt.materialReceiptCode,
            readonly: 'readonly',
          },
          {
            type: 'text',
            name: 'orderNumber',
            label: this.translate.instant('orderNumber_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('orderNumber_TC'),
            }),
            value: this.materialReceipt.orderNumber,
            readonly: false,
          },
          {
            type: 'text',
            name: 'studyNumber',
            label: this.translate.instant('studyNumber_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('studyNumber_TC'),
            }),
            value: this.materialReceipt.awb,
            readonly: false,
          },
          {
            type: 'text',
            name: 'poNumber',
            label: this.translate.instant('poNumber_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('poNumber_TC'),
            }),
            value: this.materialReceipt.poNumber,
            readonly: false,
            validation: {
              // required: true,
              maxlength: 50,
            },
            errorText: {
              // required: this.translate.instant('formRequiredError_SC', {
              //   label: this.translate.instant('poNumber_TC'),
              // }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('poNumber_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'date',
            name: 'poDate',
            label: this.translate.instant('poDate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('poDate_TC'),
            }),
            value: this.materialReceipt.poDate,
            // showTime: true,
            disabled: false,
            validation: {
              required: true,
            },
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('poDate_TC'),
              }),
            },
          },
          {
            type: 'boolean',
            name: 'shippingCondition',
            label: this.translate.instant('shippingCondition_TC'),
            value: this.materialReceipt.shippingCondition,
            disabled: false,
          },
          {
            type: 'boolean',
            name: 'storageCondition',
            label: this.translate.instant('storageCondition_TC'),
            value: this.materialReceipt.storageCondition,
            disabled: false,
          },
          {
            type: 'text',
            name: 'awb',
            label: this.translate.instant('awb_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('awb_TC'),
            }),
            value: this.materialReceipt.awb,
            readonly: false,
            validation: {
              maxlength: 30,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('awb_TC'),
                char: this.translate.instant('thirty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'incoTerms',
            label: this.translate.instant('incoTerms_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('incoTerms_TC'),
            }),
            value: this.materialReceipt.incoTerms,
            multiline: true,
            readonly: false,
          },
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('supplierDetails_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'supplierName',
            label: this.translate.instant('supplierName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('supplierName_TC'),
            }),
            value: this.materialReceipt.supplierName,
            readonly: false,
            validation: {
              required: true,
            },
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            onValueChange: this.onChangePartyValue.bind(this),

            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('supplierName_TC') }),
            }
          },
          // {
          //   type: 'dropdown',
          //   name: 'supplierName',
          //   label: this.translate.instant('supplierName_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('supplierName_TC'),
          //   }),
          //   value: this.materialReceipt.supplierName,
          //   validation: {
          //     required: true,
          //   },
          //   options: this.partyList,
          //   optionLabelList: ["partyName", "partyCode", "state"],
          //   optionValue: "partyName",
          //   errorText: {
          //     required: this.translate.instant('formRequiredError_SC', {
          //       label: this.translate.instant('supplierName_TC'),
          //     }),
          //   },
          // },
          {
            type: 'text',
            name: 'supplierPhone',
            label: this.translate.instant('supplierPhone_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('supplierPhone_TC'),
            }),
            value: this.materialReceipt.supplierPhone,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('supplierPhone_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('supplierPhone_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'supplierInvoiceNumber',
            label: this.translate.instant('supplierInvoiceNumber_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('supplierInvoiceNumber_TC'),
            }),
            value: this.materialReceipt.supplierInvoiceNumber,
            readonly: false,
            validation: {
              // required: true,
              minlength: 1,
            },
            errorText: {
              // required: this.translate.instant('formRequiredError_SC', {
              //   label: this.translate.instant('supplierInvoiceNumber_TC'),
              // }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('supplierInvoiceNumber_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'courierNo',
            label: this.translate.instant('courierNo_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('courierNo_TC'),
            }),
            value: this.materialReceipt.courierNo,
            readonly: false,
            validation: {
              // required: true,
              minlength: 1,
            },
            errorText: {
              // required: this.translate.instant('formRequiredError_SC', {
              //   label: this.translate.instant('courierNo_TC'),
              // }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('courierNo_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'deliveryChallanNo',
            label: this.translate.instant('deliveryChallanNo_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('deliveryChallanNo_TC'),
            }),
            value: this.materialReceipt.deliveryChallanNo,
            readonly: false,
            validation: {
              // required: true,
              minlength: 1,
            },
            errorText: {
              // required: this.translate.instant('formRequiredError_SC', {
              //   label: this.translate.instant('deliveryChallanNo_TC'),
              // }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('deliveryChallanNo_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'corgoType',
            label: this.translate.instant('corgoType_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('corgoType_TC'),
            }),
            value: this.materialReceipt.corgoType,
            readonly: false,
            validation: {
              // required: true,
              minlength: 1,
            },
            errorText: {
              // required: this.translate.instant('formRequiredError_SC', {
              //   label: this.translate.instant('corgoType_TC'),
              // }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('corgoType_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'supplierAddress',
            label: this.translate.instant('supplierAddress_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('supplierAddress_TC'),
            }),
            value: this.materialReceipt.supplierAddress,
            multiline: true,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('supplierAddress_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('supplierAddress_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('receiptDetails_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'recipientName',
            label: this.translate.instant('recipientName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('recipientName_TC'),
            }),
            value: this.materialReceipt.recipientName,
            readonly: false,
            validation: {
              required: true,
            },
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            onValueChange: this.onChangeRecipientPartyValue.bind(this),
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('recipientName_TC') }),
            }
          },
          // {
          //   type: 'text',
          //   name: 'recipientName',
          //   label: this.translate.instant('recipientName_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('recipientName_TC'),
          //   }),
          //   value: this.materialReceipt.recipientName,
          //   readonly: false,
          //   validation: {
          //     required: true,
          //     minlength: 1,
          //   },
          //   errorText: {
          //     required: this.translate.instant('formRequiredError_SC', {
          //       label: this.translate.instant('recipientName_TC'),
          //     }),
          //     minlength: this.translate.instant('formMinLengthError_SC', {
          //       label: this.translate.instant('recipientName_TC'),
          //       char: this.translate.instant('one_number'),
          //     }),
          //   },
          // },
          {
            type: 'text',
            name: 'recipientPhone',
            label: this.translate.instant('recipientPhone_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('recipientPhone_TC'),
            }),
            value: this.materialReceipt.recipientPhone,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('recipientPhone_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('recipientPhone_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'recipientAddress',
            label: this.translate.instant('recipientAddress_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('recipientAddress_TC'),
            }),
            value: this.materialReceipt.recipientAddress,
            multiline: true,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('recipientAddress_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('recipientAddress_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('weights_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'weight',
            label: this.translate.instant('weight_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('weight_TC'),
            }),
            value: this.materialReceipt.weight,
            validation: {
              required: true,
            },
            readonly: false,
            keyFilter: 'num',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('weight_TC'),
              }),
            },
          },
          {
            type: 'text',
            name: 'size',
            label: this.translate.instant('size_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('size_TC'),
            }),
            value: this.materialReceipt.size,
            validation: {
              required: true,
            },
            readonly: false,
            keyFilter: 'num',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('size_TC'),
              }),
            },
          },
          {
            type: 'text',
            name: 'boxQty',
            label: this.translate.instant('boxQty_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('boxQty_TC'),
            }),
            value: this.materialReceipt.boxQty,
            readonly: false,
            keyFilter: 'num',
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('boxQty_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('boxQty_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('projects_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          // {
          //   type: 'text',
          //   name: 'sponsor',
          //   label: this.translate.instant('sponsor_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('sponsor_TC'),
          //   }),
          //   value: this.materialReceipt.sponsor,
          //   readonly: false,
          //   validation: {
          //     maxlength: 30,
          //   },
          //   // prefixGroupBy: true,
          //   // prefixGroupByIcon: 'pi-user',
          //   errorText: {
          //     maxlength: this.translate.instant('formMaxLengthError_SC', {
          //       label: this.translate.instant('sponsor_TC'),
          //       char: this.translate.instant('thirty_number'),
          //     }),
          //   },
          // },
          {
            type: 'dropdown',
            name: 'sponsor',
            label: this.translate.instant('sponsor_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('sponsor_TC'),
            }),
            value: this.materialReceipt.sponsor,
            // readonly: false,
            // validation: {
            //   required: true,
            // },
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('sponsor_TC') }),
            // }
          },
          {
            type: 'text',
            name: 'portocol',
            label: this.translate.instant('portocol_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('portocol_TC'),
            }),
            value: this.materialReceipt.portocol,
            readonly: false,
            validation: {
              maxlength: 30,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('portocol_TC'),
                char: this.translate.instant('thirty_number'),
              }),
            },
          },
          // {
          //   type: 'text',
          //   name: 'project',
          //   label: this.translate.instant('project_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('project_TC'),
          //   }),
          //   value: this.materialReceipt.project,
          //   readonly: false,
          //   validation: {
          //     maxlength: 30,
          //   },
          //   // prefixGroupBy: true,
          //   // prefixGroupByIcon: 'pi-user',
          //   errorText: {
          //     maxlength: this.translate.instant('formMaxLengthError_SC', {
          //       label: this.translate.instant('project_TC'),
          //       char: this.translate.instant('thirty_number'),
          //     }),
          //   },
          // },
          {
            type: 'dropdown',
            name: 'project',
            label: this.translate.instant('project_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('project_TC'),
            }),
            value: this.materialReceipt.project,
            readonly: false,
            validation: {
              required: true,
            },
            options: this.projectList,
            optionLabel: "projectName",
            optionValue: "id",
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('project_TC') }),
            }
          },
        ]
      },
      {
        type: 'table',
        name: 'grn_details',
        label: this.translate.instant('grnDetails_TC'),
        readonly: false,
        required: true,
        // disableMultipleEditing: true,
        formInitialise: {
          // created: '',
          // modified: '',
          // user_created: '',
          // user_modified: '',
          // guid: '',
          // is_active: '',
          product_id: '',
          product_code: '',
          kit_no: '',
          batch_no: '',
          expiry: '',
          serial_number: '',
          manufacture: '',
          min_temp: '',
          max_temp: '',
          recevied_qty: '',
          // unit: '',
          // unit_price: '',
          // base_price: '',
          // gst: '',
          // unit_net_price: '',
          // net_price: '',
          ware_house: '',
          zone: '',
          rack: '',
          shelf: '',
          note: '',
          trc_no: '',
          trc_date: moment(this.date1).format("YYYY-MM-DD"),
          // is_flag: '',
          // material_receipt: '',
        },
        columnSchema: [
          // 'created_TC',
          // 'modified_TC',
          // 'user_created_TC',
          // 'user_modified_TC',
          // 'guid_TC',
          // 'is_active_TC',
          'productName_TC',
          'productCode_TC',
          'kit_no_TC',
          'batch_no_TC',
          'expiry_TC',
          'serial_number_TC',
          'manufacture_TC',
          'minTemp_TC',
          'maxTemp_TC',
          'recevied_qty_TC',
          // 'unit_TC',
          // 'unit_price_TC',
          // 'basePrice_TC',
          // 'gst_TC',
          // 'unit_net_price_TC',
          // 'net_price_TC',
          'ware_house_TC',
          'zone_TC',
          // 'rack_TC',
          // 'shelf_TC',
          'note_TC',
          'trc_no_TC',
          'trc_date_TC',
          // 'is_flag_TC',
          // 'material_receipt_TC',
        ],
        onCancelForm: this.resetRow.bind(this),
        formSchema: [
          // {
          //   name: 'created',
          //   type: 'input',
          // },
          // {
          //   name: 'modified',
          //   type: 'input',
          // },
          // {
          //   name: 'user_created',
          //   type: 'input',
          // },
          // {
          //   name: 'user_modified',
          //   type: 'input',
          // },
          // {
          //   name: 'guid',
          //   type: 'input',
          // },
          // {
          //   name: 'is_active',
          //   type: 'input',
          // },
          // {
          //   name: 'product_code',
          //   type: 'dropdown',
          //   options: this.subCategoryList,
          //   optionLabel: "subcat_name",
          //   optionValue: "id",
          // },
          {
            type: 'dropdown',
            name: 'product_id',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('productName_TC') }),
            options: this.productList,
            optionLabel: "productName",
            optionValue: "id",
            onValueChange: this.onChangeProductValue.bind(this),
          },
          {
            type: 'input',
            name: 'product_code',
          },
          {
            name: 'kit_no',
            type: 'input',
          },
          {
            name: 'batch_no',
            type: 'input',
          },
          {
            name: 'expiry',
            type: 'date',
          },
          {
            name: 'serial_number',
            type: 'input',
          },
          {
            name: 'manufacture',
            type: 'input',
          },
          {
            name: 'min_temp',
            type: 'input',
          },
          {
            name: 'max_temp',
            type: 'input',
          },
          {
            name: 'recevied_qty',
            type: 'input',
          },
          // {
          //   name: 'unit',
          //   type: 'input',
          // },
          // {
          //   name: 'unit_price',
          //   type: 'input',
          // },
          // {
          //   name: 'base_price',
          //   type: 'input',
          // },
          // {
          //   name: 'gst',
          //   type: 'input',
          // },
          // {
          //   name: 'unit_net_price',
          //   type: 'input',
          // },
          // {
          //   name: 'net_price',
          //   type: 'input',
          // },
          {
            type: 'dropdown',
            name: 'ware_house',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('ware_house_TC') }),
            options: this.wareHouseCreationList,
            optionLabel: "wareHouseName",
            optionValue: "id",
            onValueChange: this.onChangeWareHouseValue.bind(this),
          },
          {
            type: 'dropdown',
            name: 'zone',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('zone_TC') }),
            options: this.storageZoneCreationList,
            displayOptions: this.zoneCreationList,
            optionLabel: "zoneName",
            optionValue: "id",
            onValueChange: this.onChangeStorageZoneValue.bind(this),
          },
          // {
          //   type: 'dropdown',
          //   name: 'rack',
          //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('rack_TC') }),
          //   options: this.zone_level_list,
          //   optionLabel: "levelName",
          //   optionValue: "id",
          //   onValueChange: this.onChangeZoneLevelValue.bind(this),
          // },
          // {
          //   name: 'shelf',
          //   type: 'dropdown',
          //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('shelf_TC') }),
          //   options: this.shelf_creation_list,
          //   optionLabel: "shelfName",
          //   optionValue: "id",
          // },
          {
            name: 'note',
            type: 'input',
          },
          {
            name: 'trc_no',
            type: 'input',
            placeholder: this.translate.instant('autoGenerate_TC', {
              label: this.translate.instant('autoGenerate_TC'),
            }),
            readonly: true,
          },
          {
            name: 'trc_date',
            type: 'date',
          },
          // {
          //   name: 'is_flag',
          //   type: 'input',
          // },
          // {
          //   name: 'material_receipt',
          //   type: 'input',
          // },
        ],
        dataKey: 'id',
        dataSource: this.materialReceipt.grn_details || [],
      },
      {
        type: 'text',
        name: 'requestApproval',
        label: this.translate.instant('requestApproval_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', {
          label: this.translate.instant('requestApproval_TC'),
        }),
        value: this.materialReceipt.requestApproval,
        readonly: false,
        validation: {
          required: true,
          minlength: 1,
        },
        errorText: {
          required: this.translate.instant('formRequiredError_SC', {
            label: this.translate.instant('requestApproval_TC'),
          }),
          minlength: this.translate.instant('formMinLengthError_SC', {
            label: this.translate.instant('requestApproval_TC'),
            char: this.translate.instant('one_number'),
          }),
        },
      },
      {
        type: 'text',
        name: 'approvalOnDeviatior',
        label: this.translate.instant('approvalOnDeviatior_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', {
          label: this.translate.instant('approvalOnDeviatior_TC'),
        }),
        value: this.materialReceipt.approvalOnDeviatior,
        readonly: false,
        validation: {
          required: true,
          minlength: 1,
        },
        errorText: {
          required: this.translate.instant('formRequiredError_SC', {
            label: this.translate.instant('approvalOnDeviatior_TC'),
          }),
          minlength: this.translate.instant('formMinLengthError_SC', {
            label: this.translate.instant('approvalOnDeviatior_TC'),
            char: this.translate.instant('one_number'),
          }),
        },
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('invoices_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'invoice',
            label: this.translate.instant('Invoice_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('Invoice_TC') }),
            value: this.materialReceipt.invoice,
            readonly: false,
            validation: {
              maxlength: 200,
            },
            errorText: {
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('Invoice_TC'), char: this.translate.instant('two_hundred_number') }),
            }
          },
          {
            type: 'text',
            name: 'invoiceIn',
            label: this.translate.instant('InvoiceIn_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('InvoiceIn_TC') }),
            value: this.materialReceipt.invoiceIn,
            readonly: false,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('InvoiceIN_TC'), char: this.translate.instant('fifty_number') }),
            }
          },
          {
            type: 'text',
            name: 'carrierInvoice',
            label: this.translate.instant('CarrierInvoice_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('CarrierInvoice_TC') }),
            value: this.materialReceipt.carrierInvoice,
            readonly: false,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('CarrierInvoice_TC'), char: this.translate.instant('fifty_number') }),
            }
          },
          {
            type: 'text',
            name: 'courier',
            label: this.translate.instant('courier_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('courier_TC') }),
            value: this.materialReceipt.courier,
            readonly: false,
            validation: {
              maxlength: 100,
            },
            errorText: {
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('courier_TC'), char: this.translate.instant('hundred_number') }),
            }
          },
          {
            type: 'date',
            name: 'receiveDate',
            label: this.translate.instant('receiveDate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('receiveDate_TC'),
            }),
            value: this.materialReceipt.receiveDate,
            disabled: false,
            showTime: true,
            validation: {
              required: true,
            },
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('receiveDate_TC'),
              }),
            },
          },
        ],
      },
      {
        type: 'text',
        name: 'isApproved',
        label: this.translate.instant('isApproved_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('isApproved_TC') }),
        value: this.materialReceipt.isApproved ? this.materialReceipt.isApproved : 'PENDING',
        readonly:'readonly',
        // onValueChange: this.onChangeInToggle.bind(this),
        disabled: true,
      },
    ];
  }

  resetRow(prevValue: any, tableValue: any) {
    return prevValue;
  }

  getFields() {
    return this.formFields;
  }

  getProductList() {
    this._productService.getProductMasterList().subscribe(
      (response) => {
        console.log("check products", response);
        if (response?.results) {
          this.productList = response?.results;
          console.log("product list", this.productList)
          this.formFields[5].formSchema[0].options = this.productList
        }
      }
    )
  }

  getPartyList() {
    this._partyService.getPartyMasterList().subscribe(
      (response) => {
        console.log("check results", response)
        if (response?.results) {
          this.partyList = response?.results;
          console.log("party list", this.partyList)
          this.setMaterialReceiptFields();
        }
      }
    )
  }

  getProjectList() {
    this._projectService.getProjectList().subscribe((response) => {
      console.log('project list', response);
      if (response?.results) {
        this.projectList = response?.results;
        console.log('project list', this.projectList);
        this.setMaterialReceiptFields();
      }
    })
  }

  onChangePartyValue(prevValue: any, value: any, formValue: any) {
    console.log("check prevalue", prevValue)
    console.log("check value", value)
    console.log("check formValue", formValue)
    const formValueUpdated: any = {};
    let object: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      object = this.partyList.filter(e => e.id === value)[0];
      console.log('Supplier Object', object);
      formValueUpdated.supplierPhone = object.phoneNumber;
      formValueUpdated.supplierAddress = object.companyAddress;
    }
    return formValueUpdated;
  }

  onChangeRecipientPartyValue(prevValue: any, value: any, formValue: any) {
    console.log("value", value)
    const formValueUpdated: any = {};
    let object: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      object = this.partyList.filter(e => e.id === value)[0];
      console.log('Supplier Object', object);
      formValueUpdated.recipientAddress = object.companyAddress;
      formValueUpdated.recipientPhone = object.phoneNumber;
    }
    return formValueUpdated;

  }

  // onChangeProductValue(value: any, tableValue: any) {
  //   const tableValueUpdated: any = {};
  //   if (tableValue) {
  //     Object.assign(tableValueUpdated, tableValue);
  //   }
  //   if (value) {
  //     tableValueUpdated.product_id = value;
  //     console.log("table value updated",tableValueUpdated)
  //     tableValueUpdated.product_code = this.productList.filter(e => e.id === value)[0]?.productCode;
  //   }
  //   return tableValueUpdated;
  // }

  getMaterialReceiptList() {
    this._materialReceiptService
      .getMaterialReceiptList()
      .subscribe((response) => {
        console.log(response);
        if (response?.results) {
          this.materialReceiptList = response?.results;
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('materialReceipt_TC')})
          // );
        }
      });
  }

  editMaterialReceipt(materialReceipt: MaterialReceipt) {
    this.showMaterialReceiptModifier = true;
    console.log("material reciept", materialReceipt)
    // this.getShelfCreationList(zoneLevelID)
    // this.getZoneLevelCreationList(storageZoneID)
    // this.getStorageZoneCreationList(wareHouseID)
    // this.approved = materialReceipt.isApproved;
    if(materialReceipt.isApproved == 'APPROVED'){
      this.approved = true;
    } else {
      this.approved = false;
    }
    this.materialReceipt = { ...materialReceipt };
    this.setMaterialReceiptFields();
    // this.readOnly(this.approved);
    this.showMaterialReceiptModifier = true;
  }

  onChangeInToggle(prevValue: any, value: any, formValue: any) {
    console.log('Boolean', value);
    this.readOnly(value);
  }

  readOnly(value: boolean) {
    if (value) {
      this.formFields[0].fields.forEach(element => {
        element.readonly = true;
      });
      this.formFields[0].fields[3].disabled = true;
      this.formFields[0].fields[4].disabled = true;
      this.formFields[1].fields.forEach(element => {
        element.readonly = true;
      });
      this.formFields[2].fields.forEach(element => {
        element.readonly = true;
      });
      this.formFields[3].fields.forEach(element => {
        element.readonly = true;
      });
      this.formFields[4].fields.forEach(element => {
        element.readonly = true;
      });
      this.formFields[5].readonly = true;
      this.formFields[6].readonly = true;
      this.formFields[7].readonly = true;
      this.formFields[8].fields.forEach(element => {
        element.readonly = true;
      });
      this.formFields[8].fields[4].disabled = true;
    } else {
      this.formFields[0].fields.forEach(element => {
        element.readonly = false;
      });
      this.formFields[0].fields[3].disabled = false;
      this.formFields[0].fields[4].disabled = false;
      this.formFields[1].fields.forEach(element => {
        element.readonly = false;
      });
      this.formFields[2].fields.forEach(element => {
        element.readonly = false;
      });
      this.formFields[3].fields.forEach(element => {
        element.readonly = false;
      });
      this.formFields[4].fields.forEach(element => {
        element.readonly = false;
      });
      this.formFields[5].readonly = false;
      this.formFields[6].readonly = false;
      this.formFields[7].readonly = false;
      this.formFields[8].fields.forEach(element => {
        element.readonly = false;
      });
      this.formFields[8].fields[4].disabled = false;
    }
  }

  deleteMaterialReceipt(event: Event, materialReceipt: MaterialReceipt) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', {
        entity: materialReceipt?.materialReceiptCode,
      }),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._materialReceiptService
          .removeMaterialReceipt(materialReceipt?.id)
          .subscribe((response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {
                entity: materialReceipt?.materialReceiptCode,
              })
            );
            this.getMaterialReceiptList();
          });
      },
    });
  }

  saveMaterialReceipt(materialReceipt: MaterialReceipt) {
    // console.log(materialReceipt)

    if (this.materialReceipt?.id) {
      materialReceipt.id = this.materialReceipt?.id;
      // materialReceipt.isApproved = this.materialReceipt?.isApproved;
      // this.clearMaterialReceipt();
    }
    
    this._materialReceiptService
      .materialReceiptModifier(materialReceipt)
      .subscribe((response) => {
        console.log(response);
        if (Object.keys(response).length != 0) {
          console.log('response', response);
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {
              entity: materialReceipt?.materialReceiptCode ? materialReceipt?.materialReceiptCode : '',
            })
          );
          this.showMaterialReceiptModifier = false;
          this.getMaterialReceiptList();
        }
      });
  }

  clearMaterialReceipt() {
    this.materialReceipt = {};
    this.setMaterialReceiptFields();
  }


  // Get Ware house creation list here
  getWareHouseCreationList() {
    this._wareHouseService.getWareHouseCreationList().subscribe(
      (response) => {
        console.log("warehouse list", response?.results);
        if (response?.results) {
          this.wareHouseCreationList = response?.results;
          this.formFields[5].formSchema[10].options = this.wareHouseCreationList
        }
      }
    )
  }
  // Get Storage Zone creation list here
  getStorageZoneCreationList(wareHouseID) {
    this._zoneService.getStorageZoneCreationByWareHouse(wareHouseID).subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.storageZoneCreationList = response?.results;
          console.log("storage list", this.storageZoneCreationList)
          this.formFields[5].formSchema[11].options = this.storageZoneCreationList
        }
      }
    )
  }

  getAllStorageZoneCreationList() {
    this._zoneService.getStorageZoneCreationList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.zoneCreationList = response?.results;
          console.log("storage list", this.zoneCreationList)
          this.formFields[5].formSchema[11].displayOptions = this.zoneCreationList;
        }
      }
    )
  }

  //get zonelevel list
  // getZoneLevelCreationList(storageZoneID) {
  //   this._zonelevelService.getZoneLevelCreationByStorageZone(storageZoneID).subscribe(
  //     (response) => {
  //       console.log(response);
  //       if (response?.results) {
  //         this.zone_level_list = response?.results[0].zone_level_list;
  //         console.log("zonelist", this.zone_level_list)
  //         this.formFields[5].formSchema[11].options = this.zone_level_list
  //       }
  //     }
  //   )
  // }

  //get shelf list 
  getShelfCreationList(zoneLevelID) {
    this._shelfCreationService.getShelfCreationByZoneLevelID(zoneLevelID).subscribe(
      (response) => {
        console.log("shelf creation", response);
        if (response?.results) {
          this.shelf_creation_list = response?.results[0].shelf_creation_list;
          this.formFields[5].formSchema[12].options = this.shelf_creation_list
        }
      }
    )
  }

  onChangeProductValue(value: any, tableValue: any) {
    const tableValueUpdated: any = {};
    if (tableValue) {
      Object.assign(tableValueUpdated, tableValue);
    }
    if (value) {
      tableValueUpdated.product_id = value;
      console.log("table value updated", tableValueUpdated)
      tableValueUpdated.product_code = this.productList.filter(e => e.id === value)[0]?.productCode;
      tableValueUpdated.min_temp = this.productList.filter(e => e.id === value)[0]?.minTemp;
      tableValueUpdated.max_temp = this.productList.filter(e => e.id === value)[0]?.maxTemp;
    }
    return tableValueUpdated;
  }

  onChangeWareHouseValue(value: any, tableValue: any) {
    const tableValueUpdated: any = {};
    console.log("table value updated", tableValue)
    if (tableValue) {
      Object.assign(tableValueUpdated, tableValue);
    }
    if (tableValueUpdated?.zone) {
      tableValueUpdated.zone = "";
    }
    const wareHouseID = value
    this.getStorageZoneCreationList(wareHouseID)
    return tableValueUpdated;
  }

  onChangeStorageZoneValue(value: any, tableValue: any) {
    const tableValueUpdated: any = {};
    console.log("table value updated", tableValue)
    if (tableValue) {
      Object.assign(tableValueUpdated, tableValue);
    }
    const storageZoneID = value
    // this.getZoneLevelCreationList(storageZoneID)
    return tableValueUpdated;
  }

  onChangeZoneLevelValue(value: any, tableValue: any) {
    const tableValueUpdated: any = {};
    console.log("table value updated", tableValue)
    if (tableValue) {
      Object.assign(tableValueUpdated, tableValue);
    }
    const zoneLevelID = value
    this.getShelfCreationList(zoneLevelID)
    return tableValueUpdated;
  }



  generateFields() {
    this.printFields = [
      // {
      //   type: 'header',
      //   label_1: 'ფორმა 004_საქონლის მიღება',
      //   label_2: 'Form 004_Receipt of Goods',
      // },
      {
        type: 'receipt',
        value: this.materialReceiptObject,
      },
      // {
      //   type: 'footerheader',
      //   label_1: `ინვოისი / Invoice - ${this.materialReceiptObject['invoice']}`,
      //   label_2: 'დამატებითი ინფორმაცია / Additional Information',
      // },
      // {
      //   type: 'footerbody',
      //   label_1: `<div style='margin-bottom: 1px'>
      //   <p>კურიერი / Courier : ${this.materialReceiptObject['courier']} , ხელმოწერა / Signature : ________________________</p>
      //   <p>მიმღები / Recipient : ${this.materialReceiptObject['recipient']} , ხელმოწერა / Signature : ________________________</p>
      //   <p style="word-spacing:5px;">მიღებული თარიღი / Received date : ${this.datePipe.transform(this.materialReceiptObject['receiveDate'], 'yyyy-MM-dd')} , დრო / Time : ${this.datePipe.transform(this.materialReceiptObject['receiveDate'], 'hh:mm:ss a')}</p>
      //   <p>გადამოწმება / Verification : ________________________ , ხელმოწერა / Signature : ________________________</p>
      //   <p>
      //       ამ გადაზიდვის შინაარსი გამოვლენილია მხოლოდ კლინიკური კვლევის გამოყენებისათვის და უნდა იქნას გამოყენებული მხოლოდ
      //       კლინიკურ კვლევებში ჩარიცხული პაციენტების მკურნალობისთვის. არ არის კომერციული ღირებულება. არა იყიდება ან იყიდება.
      //       გადაზიდვა უფასოდ უნდა გადაეცეს
      //   </p>
      //   <p style="word-spacing:1px;">
      //       The content of this shipment is identified for clinical trial use only and must be used solely for the treatment
      //       of patients enrolled in clinical trials. No commercial value. Not for sale or resale. Shipment must be hand
      //       overed on free of charge basis
      //   </p>
      //   <p style="word-spacing:1px; font-size: medium;">
      //   სსპ / SOP-03 , ვერსია / Version-03, ფორმა / Form-004
      //   </p>
      //   </div>
      //   <hr>`,
      // },
      // {
      //   type: 'footer',
      // }
    ]
  }

  getPrintFields() {
    // console.log(this.printFields)
    return this.printFields;
  }

  printmaterialReceipt(materialReceipt: MaterialReceipt) {
    this.materialReceiptObject = materialReceipt;
    this.showmaterialReceiptPrintModifier = true;
    this.generateFields();
  }

  getDataSource() {
    if (this.formFields[5].dataSource.length == 0) {
      // console.log('dataSource true');
      return true;
    } else {
      // console.log('dataSource false')
      return false;
    }
  }
}
