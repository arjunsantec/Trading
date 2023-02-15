import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { GoodsAcceptance, acceptanceList, WareHouseCreation, zoneLevels, zoneLevelCreation, shelf_creation_list, ZoneCreation } from 'src/app/shared/models/wareshouse.model';
import { productMaster } from 'src/app/shared/models/product.model';
import { AcceptanceOfGoodsService } from './services/acceptance-of-goods.service';
import { ProductMasterService } from 'src/app/master/modules/product-master-main-page/services/product-master.service';
import { MaterialReceiptService } from 'src/app/inventory/modules/material-receipt-main-page/services/material-receipt.service';
import { MaterialReceipt } from 'src/app/shared/models/inventory.model';
import { PartyMasterService } from 'src/app/master/modules/party-master-main-page/services/party-master.service';
import { PartyMaster } from 'src/app/shared/models/party.model';
import { WareshouseCreationService } from '../warehouse-creation/services/wareshouse-creation.service';
import { StorageZoneCreationServiceService } from '../storage-zone-creation/services/storage-zone-creation-service.service';
import { ZoneLevelCreationService } from '../zone-level-creation/services/zone-level-creation.service';
import { ShelfCreationService } from '../shelf-creation/services/shelf-creation.service';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ProjectCreation } from 'src/app/shared/models/project.model';
import { ProjectService } from 'src/app/project/modules/project-main-page/services/project.service';



@Component({
  selector: 'app-acceptance-of-goods',
  templateUrl: './acceptance-of-goods.component.html',
  styleUrls: ['./acceptance-of-goods.component.scss']
})
export class AcceptanceOfGoodsComponent implements OnInit {
  columns: any = [];
  goodsAcceptanceCreationFields: any = [];
  goodsAcceptanceCreation: GoodsAcceptance | any = {};
  goodsAcceptanceList: GoodsAcceptance[] = new Array<GoodsAcceptance>();
  selectedGoodsAcceptance: GoodsAcceptance[] = new Array<GoodsAcceptance>();
  showGoodsAcceptanceCreationModifier: boolean = false

  goods_acceptance_list: acceptanceList[] = new Array<acceptanceList>();
  productList: productMaster[] = new Array<productMaster>();

  showGoodsAcceptancePrintModifier: boolean = false;
  printFields: any = [];
  goodsAcceptanceObject = {};
  materialReceiptList: MaterialReceipt[] = new Array<MaterialReceipt>();
  materialReceipt: MaterialReceipt | any = {};
  approveButton: string = 'approve';
  rejectButton: string = 'reject';

  partyList: PartyMaster[] = new Array<PartyMaster>();
  wareHouseCreationList: WareHouseCreation[] = new Array<WareHouseCreation>();
  storageZoneCreationList: ZoneCreation[] = new Array<ZoneCreation>();
  zone_level_list: zoneLevels[] = new Array<zoneLevels>();
  zoneLevelCreationList: zoneLevelCreation[] = new Array<zoneLevelCreation>();
  shelf_creation_list: shelf_creation_list[] = new Array<shelf_creation_list>();
  date: any;
  time: any;
  projectList: ProjectCreation[] = new Array<ProjectCreation>();




  constructor(public translate: TranslateService,
    private _materialReceiptService: MaterialReceiptService,
    // private _shelfCreationService: ShelfCreationService,
    private _partyService: PartyMasterService,
    private _sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private _acceptanceService: AcceptanceOfGoodsService,
    private _productService: ProductMasterService,
    private _wareHouseService: WareshouseCreationService,
    private _zoneService: StorageZoneCreationServiceService,
    private _zonelevelService: ZoneLevelCreationService,
    private _shelfCreationService: ShelfCreationService,
    private _projectService: ProjectService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {

    this.setGoodsAcceptanceFields();
    this.setGoodsAcceptanceTable();
    this.getGoodsAcceptanceList();
    this.getProductList();
    this.getMaterialReceiptList();
    this.getPartyList();
    this.getProjectList();
    this.getWareHouseCreationList();
    this.getStorageZoneCreationLists();
    console.log(this.goodsAcceptanceCreationFields);
  }

  setGoodsAcceptanceTable() {
    this.columns = [
      { field: 'status', label: 'pmStatus_TC' },
      { field: 'supplier', label: 'supplierName_TC' },
      { field: 'supplierPhone', label: 'supplierPhone_TC' },
      { field: 'recipient', label: 'recipientName_TC' },
      { field: 'recipientPhone', label: 'recipientPhone_TC' },
      // { field: 'Invoice', label: 'Invoice_TC' },
      // { field: 'carrierInvoice', label: 'CarrierInvoice_TC' },
      { field: 'projectName', label: 'project_TC' },
      { field: 'Protocol', label: 'portocol_TC' },
      // { field: 'Size', label: 'size_TC' },
      // { field: 'receiveDate', label: 'receiveDate_TC' },
      // { field: 'courier', label: 'courier_TC' },
    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('GoodsAcceptance_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('GoodsAcceptance_TC') })
  }

  showGoodsAcceptanceCreation() {
    this.showGoodsAcceptanceCreationModifier = true;
    this.approveButton = 'approve';
    this.rejectButton = 'reject';
  }


  setGoodsAcceptanceFields() {
    this.goodsAcceptanceCreationFields = [
      {
        type: 'dropdown',
        name: 'materialReceipt',
        label: this.translate.instant('materialReceipt_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', {
          label: this.translate.instant('materialReceipt_TC'),
        }),
        value: this.goodsAcceptanceCreation.materialReceipt,
        // validation: {
        //   required: true,
        // },
        options: this.materialReceiptList,
        optionLabel: "materialReceiptCode",
        optionValue: "id",
        onValueChange: this.onChangeMaterialReceiptValue.bind(this),
        // errorText: {
        //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('poNumber_TC') }),
        // }
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('supplierDetails_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          // {
          //   type: 'text',
          //   name: 'supplierName',
          //   label: this.translate.instant('supplierName_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('supplierName_TC') }),
          //   value: this.goodsAcceptanceCreation.supplierName,
          //   validation: {
          //     maxlength: 50,
          //   },
          //   prefixGroupBy: true,
          //   prefixGroupByIcon: 'pi-user',
          //   errorText: {
          //     maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('supplierName_TC'), char: this.translate.instant('fifty_number') }),
          //   }
          // },
          {
            type: 'dropdown',
            name: 'supplierName',
            label: this.translate.instant('supplierName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('supplierName_TC'),
            }),
            value: this.goodsAcceptanceCreation.supplierName,
            readonly: false,
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            onValueChange: this.onChangePartyValue.bind(this),

          },
          {
            type: 'text',
            name: 'supplierAddress',
            label: this.translate.instant('supplierAddress_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('supplierAddress_TC') }),
            value: this.goodsAcceptanceCreation.supplierAddress,
            validation: {
              maxlength: 50,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('supplierAddress_TC'), char: this.translate.instant('fifty_number') }),
            }
          },
          {
            type: 'text',
            name: 'supplierPhone',
            label: this.translate.instant('supplierPhone_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('supplierPhone_TC') }),
            value: this.goodsAcceptanceCreation.supplierPhone,
            validation: {
              maxlength: 50,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('supplierPhone_TC'), char: this.translate.instant('fifty_number') }),
            }
          },
        ],
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('receiptDetails_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          // {
          //   type: 'text',
          //   name: 'receipentName',
          //   label: this.translate.instant('recipientName_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('recipientName_TC') }),
          //   value: this.goodsAcceptanceCreation.receipentName,
          //   validation: {
          //     maxlength: 50,
          //   },
          //   prefixGroupBy: true,
          //   prefixGroupByIcon: 'pi-user',
          //   errorText: {
          //     maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('recipientName_TC'), char: this.translate.instant('fifty_number') }),
          //   }
          // },
          {
            type: 'dropdown',
            name: 'recipientName',
            label: this.translate.instant('recipientName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('recipientName_TC'),
            }),
            value: this.goodsAcceptanceCreation.recipientName,
            readonly: false,
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            onValueChange: this.onChangeRecipientPartyValue.bind(this),

          },
          {
            type: 'text',
            name: 'recipientAddress',
            label: this.translate.instant('recipientAddress_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('recipientAddress_TC') }),
            value: this.goodsAcceptanceCreation.recipientAddress,
            validation: {
              maxlength: 50,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('recipientAddress_TC'), char: this.translate.instant('fifty_number') }),
            }
          },
          {
            type: 'text',
            name: 'recipientPhone',
            label: this.translate.instant('recipientPhone_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('recipientPhone_TC') }),
            value: this.goodsAcceptanceCreation.recipientPhone,
            validation: {
              maxlength: 50,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('recipientPhone_TC'), char: this.translate.instant('fifty_number') }),
            }
          },
        ],
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('weights_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'Weight',
            label: this.translate.instant('weight_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('weight_TC') }),
            value: this.goodsAcceptanceCreation.Weight,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('weight_TC'), char: this.translate.instant('fifty_number') }),
            }
          },
          {
            type: 'text',
            name: 'Size',
            label: this.translate.instant('size_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('size_TC') }),
            value: this.goodsAcceptanceCreation.Size,
            validation: {
              maxlength: 50,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('size_TC'), char: this.translate.instant('fifty_number') }),
            }
          },
          {
            type: 'text',
            name: 'BoxQuantity',
            label: this.translate.instant('boxQty_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('boxQty_TC') }),
            value: this.goodsAcceptanceCreation.BoxQuantity,
            validation: {
              maxlength: 50,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('boxQty_TC'), char: this.translate.instant('fifty_number') }),
            }
          },
        ],
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('projects_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          // {
          //   type: 'text',
          //   name: 'Sponsor',
          //   label: this.translate.instant('sponsor_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('sponsor_TC') }),
          //   value: this.goodsAcceptanceCreation.Sponsor,
          //   validation: {
          //     maxlength: 50,
          //   },
          //   // prefixGroupBy: true,
          //   // prefixGroupByIcon: 'pi-user',
          //   errorText: {
          //     maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('sponsor_TC'), char: this.translate.instant('fifty_number') }),
          //   }
          // },
          {
            type: 'dropdown',
            name: 'sponsor',
            label: this.translate.instant('sponsor_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('sponsor_TC'),
            }),
            value: this.goodsAcceptanceCreation.sponsor,
            // readonly: false,
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
          },
          {
            type: 'text',
            name: 'Protocol',
            label: this.translate.instant('portocol_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('portocol_TC') }),
            value: this.goodsAcceptanceCreation.Protocol,
            validation: {
              maxlength: 50,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('portocol_TC'), char: this.translate.instant('fifty_number') }),
            }
          },
          // {
          //   type: 'text',
          //   name: 'Project',
          //   label: this.translate.instant('project_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('project_TC') }),
          //   value: this.goodsAcceptanceCreation.Project,
          //   validation: {
          //     maxlength: 50,
          //   },
          //   // prefixGroupBy: true,
          //   // prefixGroupByIcon: 'pi-user',
          //   errorText: {
          //     maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('project_TC'), char: this.translate.instant('fifty_number') }),
          //   }
          // },
          {
            type: 'dropdown',
            name: 'Project',
            label: this.translate.instant('project_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('project_TC'),
            }),
            value: this.goodsAcceptanceCreation.Project,
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
        ],
      },
      {
        type: 'text',
        name: 'Invoice',
        label: this.translate.instant('Invoice_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('Invoice_TC') }),
        value: this.goodsAcceptanceCreation.Invoice,
        validation: {
          maxlength: 50,
        },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('Invoice_TC'), char: this.translate.instant('fifty_number') }),
        }
      },
      {
        type: 'text',
        name: 'invoiceIn',
        label: this.translate.instant('InvoiceIn_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('InvoiceIn_TC') }),
        value: this.goodsAcceptanceCreation.invoiceIn,
        validation: {
          maxlength: 50,
        },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('InvoiceIN_TC'), char: this.translate.instant('fifty_number') }),
        }
      },
      {
        type: 'text',
        name: 'carrierInvoice',
        label: this.translate.instant('CarrierInvoice_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('CarrierInvoice_TC') }),
        value: this.goodsAcceptanceCreation.carrierInvoice,
        validation: {
          maxlength: 50,
        },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('CarrierInvoice_TC'), char: this.translate.instant('fifty_number') }),
        }
      },
      {
        type: 'text',
        name: 'Awb',
        label: this.translate.instant('awb_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('awb_TC') }),
        value: this.goodsAcceptanceCreation.Awb,
        validation: {
          maxlength: 50,
        },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('awb_TC'), char: this.translate.instant('fifty_number') }),
        }
      },
      {
        type: 'text',
        name: 'studyNumber',
        label: this.translate.instant('studyNumber_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('studyNumber_TC') }),
        value: this.goodsAcceptanceCreation.studyNumber,
        validation: {
          maxlength: 50,
          // required: true,
        },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('studyNumber_TC'), char: this.translate.instant('fifty_number') }),
          // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('studyNumber_TC') }),
        }
      },
      {
        type: 'text',
        name: 'orderNumber',
        label: this.translate.instant('orderNumber_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('orderNumber_TC') }),
        value: this.goodsAcceptanceCreation.orderNumber,
        validation: {
          maxlength: 50,
        },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('orderNumber_TC'), char: this.translate.instant('fifty_number') }),
        }
      },
      // {
      //   type: 'dropdown',
      //   name: 'zoneLevel',
      //   label: this.translate.instant('levelName_TC'),
      //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('levelName_TC') }),
      //   value: this.shelfCreation.zoneLevel,
      //   validation: {
      //     required: true,
      //   },
      //   options: this.zoneLevelCreationList[0]?.zone_level_list,
      //   optionLabel: "levelName",
      //   optionValue: "id",
      //   errorText: {
      //     required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('levelName_TC') }),
      //   }
      // },
      {
        type: 'table',
        name: 'goods_acceptance_list',
        label: this.translate.instant('grnDetails_TC'),
        required: true,
        formInitialise: {
          product_id: '', productCode: '', trc_no: '',
          trc_date: '', Quantity: '', rejectedQuantity:'', acceptedQuantity:'', kitNumber: '',
          batchNumber: '', serialNumber: '', Validity: '',
          Manufacturer: '', minTemp: '',maxTemp:'', ware_house: '',
          zone: '',  Note: ''

        },
        columnSchema: ['productName_TC', 'productCode_TC', 'trc_no_TC',
          'trc_date_TC', 'Quantity_TC', 'rejectedQuantity_TC','acceptedQuantity_TC','kit_no_TC',
          'batch_no_TC', 'serial_number_TC', 'Validity_TC', 'manufacture_TC', 'minTemp_TC', 'maxTemp_TC', 'ware_house_TC',
          'zone_TC',
           'note_TC',],
        onCancelForm: this.resetRow.bind(this),
        formSchema: [

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
            name: 'productCode',
            type: 'input',
          },
          {
            name: 'trc_no',
            type: 'input',
          },
          {
            name: 'trc_date',
            type: 'date',
          },
          {
            name: 'Quantity',
            type: 'input',
            onValueChange: this.onChangequantityValue.bind(this),
          },
          {
            name: 'rejectedQuantity',
            type: 'input',
            onValueChange: this.onChangequantityValue.bind(this),
          },
          {
            name: 'acceptedQuantity',
            type: 'input'
          },
          {
            name: 'kitNumber',
            type: 'input'
          },
          {
            name: 'batchNumber',
            type: 'input'
          },
          {
            name: 'serialNumber',
            type: 'input'
          },
          {
            name: 'Validity',
            type: 'date'
          },
          {
            name: 'Manufacturer',
            type: 'input'
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
            name: 'Note',
            type: 'input'
          },
        ],
        dataKey: 'id',
        dataSource: this.goodsAcceptanceCreation.goods_acceptance_list || [],
        // dataSource: this.goodsAcceptanceCreation?.goods_acceptance_list,
        // this.materialReceipt.grn_details || []
      },
      {
        type: 'text',
        name: 'courier',
        label: this.translate.instant('courier_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('courier_TC') }),
        value: this.goodsAcceptanceCreation.courier,
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
        value: this.goodsAcceptanceCreation.receiveDate,
        validation: {
          required: true,
        },
        showTime: true,
        selectionMode: 'single',
        errorText: {
          required: this.translate.instant('formRequiredError_SC', {
            label: this.translate.instant('receiveDate_TC'),
          }),
        },
      },
      {
        type: 'dropdown',
        name: 'status',
        label: this.translate.instant('pmStatus_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', {
          label: this.translate.instant('pmStatus_TC'),
        }),
        value: this.goodsAcceptanceCreation.status,
        validation: {
          required: true,
        },
        required: true,
        options: [
          { id: 'APPROVED', name: 'APPROVED' },
          { id: 'REJECTED', name: 'REJECTED' },
          { id: 'PENDING', name: 'PENDING' },   
        ],
        optionLabel: 'name',
        optionValue: 'id',
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmStatus_TC') }),
        }
      },
    ]
  }

  getFields() {
    return this.goodsAcceptanceCreationFields;
  }

  resetRow(prevValue: any, tableValue: any) {
    return prevValue;
  }

  getProductList() {
    this._productService.getProductMasterList().subscribe(
      (response) => {
        // console.log("check produxts", response);
        if (response?.results) {
          this.productList = response?.results;
          // console.log("check results", this.productList)
          // this.setProductMasterFields();
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', { entity: this.translate.instant('productCategory_TC') })
          // );
        }
      }
    )
  }

  getProjectList() {
    this._projectService.getProjectList().subscribe((response) => {
      // console.log('project list', response);
      if (response?.results) {
        this.projectList = response?.results;
        // console.log('project list', this.projectList);
        this.setGoodsAcceptanceFields();
      }
    })
  }

  getGoodsAcceptanceList() {
    this._acceptanceService
      .getGoodsAcceptanceList()
      .subscribe((response) => {
        console.log('goods of acceptance', response);
        if (response?.results) {
          this.goodsAcceptanceList = response?.results;
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('materialReceipt_TC')})
          // );
        }
      });
  }

  getMaterialReceiptList() {
    this._materialReceiptService
      .getMaterialReceiptList()
      .subscribe((response) => {
        console.log('material list', response);
        if (response?.results) {
          this.materialReceiptList = response?.results;
          this.setGoodsAcceptanceFields();
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('materialReceipt_TC')})
          // );
        }
      });
  }

  onChangeMaterialReceiptValue(prevValue: any, value: any, formValue: any) {
    const formValueUpdated: any = {};
    console.log(value);
    let materialReceipt: any = [];
    let acceptanceObject: any = {};
    let acceptanceArray: any = [];
    console.log('field', this.goodsAcceptanceCreationFields)

    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }

    if (value) {
      materialReceipt = this.materialReceiptList.filter(e => e.id === value);
      console.log("check value",materialReceipt)
      console.log('M1', this.goodsAcceptanceCreationFields);
      this.goodsAcceptanceCreationFields[1].fields[0].value = materialReceipt[0]['supplierName'];
      formValueUpdated.supplierName = materialReceipt[0]['supplierName'];
      formValueUpdated.supplierAddress = materialReceipt[0]['supplierAddress'];
      formValueUpdated.supplierPhone = materialReceipt[0]['supplierPhone'];

      this.goodsAcceptanceCreationFields[2].fields[0].value = materialReceipt[0]['recipientName'];
      formValueUpdated.recipientName = materialReceipt[0]['recipientName'];
      formValueUpdated.recipientAddress = materialReceipt[0]['recipientAddress'];
      formValueUpdated.recipientPhone = materialReceipt[0]['recipientPhone'];
      formValueUpdated.Weight = materialReceipt[0]['weight'];
      formValueUpdated.Size = materialReceipt[0]['size'];
      formValueUpdated.BoxQuantity = materialReceipt[0]['boxQty'];
      this.goodsAcceptanceCreationFields[4].fields[0].value = materialReceipt[0]['sponsor'];
      formValueUpdated.sponsor = materialReceipt[0]['sponsor'];
      formValueUpdated.Protocol = materialReceipt[0]['portocol'];
      this.goodsAcceptanceCreationFields[4].fields[2].value = materialReceipt[0]['project'];
      formValueUpdated.Project = materialReceipt[0]['project'];
      formValueUpdated.Awb = materialReceipt[0]['awb'];
      formValueUpdated.Invoice = materialReceipt[0]['invoice'];
      formValueUpdated.invoiceIn = materialReceipt[0]['invoiceIn'];
      formValueUpdated.carrierInvoice = materialReceipt[0]['carrierInvoice'];
      formValueUpdated.orderNumber = materialReceipt[0]['orderNumber'];
      formValueUpdated.studyNumber = materialReceipt[0]['studyNumber'];
      formValueUpdated.courier = materialReceipt[0]['courier'];
      let date = materialReceipt[0]['receiveDate'];
      console.log("check date",date)
      // let date1 = moment(date).format("MM/DD/YYYY");
      // console.log("check date1",date1)
      // formValueUpdated.receiveDate = materialReceipt[0]['receiveDate'];
      formValueUpdated.receiveDate = moment(materialReceipt[0]['receiveDate']).format("MM/DD/YYYY HH:mm");
      // this.goodsAcceptanceCreationFields[13].value = moment(materialReceipt[0]['receiveDate']).format("MM/DD/YYYY HH:mm");

      materialReceipt[0]['grn_details'].forEach(element => {
        console.log('elements', element);
        // this.pro = this.productList.filter(e => e.id === element.productName[0].product_id);
        // this.goodsAcceptanceCreationFields[9].formSchema[0].optionValue=element.product_id
        acceptanceObject.product_id = element.product_id;
        acceptanceObject.productCode = element.product_code;
        acceptanceObject.Quantity = element.recevied_qty;
        acceptanceObject.rejectedQuantity = 0;
        acceptanceObject.acceptedQuantity = element.recevied_qty;
        acceptanceObject.kitNumber = element.kit_no;
        acceptanceObject.batchNumber = element.batch_no;
        acceptanceObject.serialNumber = element.serial_number;

        acceptanceObject.Manufacturer = element.manufacture;
        acceptanceObject.minTemp = element.min_temp;
        acceptanceObject.maxTemp = element.max_temp;
        acceptanceObject.Note = element.note;
        acceptanceObject.ware_house = element.ware_house;
        // acceptanceObject.shelf = element.shelf;
        // acceptanceObject.rack = element.rack;
        
        acceptanceObject.zone = element.zone;
        acceptanceObject.trc_date = element.trc_date;
        acceptanceObject.trc_no = element.trc_no;
        acceptanceObject.Validity = element.expiry;
        acceptanceObject.id = element.id;

        acceptanceArray.push(acceptanceObject);
        // console.log('goods_acceptance_list', acceptanceObject);
        // console.log('goods_acceptance_array', acceptanceArray);
        acceptanceObject = {};
      });
      formValueUpdated.goods_acceptance_list = acceptanceArray;
      console.log('goods_acceptance_array final', formValueUpdated)
      this.goodsAcceptanceCreationFields[11].dataSource = acceptanceArray;
    }
    // console.log("formValueUpdated",formValueUpdated);
    acceptanceArray = [];
    console.log("form value updated", formValueUpdated)
    return formValueUpdated;
  }

  editGoodsAcceptance(goodsAcceptance: GoodsAcceptance) {
    // this.goods_acceptance_list = goodsAcceptance.goods_acceptance_list;
    this.ngOnInit();
    console.log("goods acceptance", goodsAcceptance)
    this.goodsAcceptanceCreation = { ...goodsAcceptance };
    this.setGoodsAcceptanceFields();
    this.approveButton = 'approved';
    this.rejectButton = 'rejected';
    this.showGoodsAcceptanceCreationModifier = true;
  }

  deleteGoodsAcceptance(event: Event, goodsAcceptance: GoodsAcceptance) {
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
        this._acceptanceService
          .removeGoodsAcceptance(goodsAcceptance?.id)
          .subscribe((response) => {
            // console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {
                entity: '',
              })
            );
            this.getGoodsAcceptanceList();
          });
      },
    });
  }

  saveGoodsAcceptance(goodsAcceptance: GoodsAcceptance) {
    // console.log('saved object', goodsAcceptance);
    if (this.goodsAcceptanceCreation?.id) {
      goodsAcceptance.id = this.goodsAcceptanceCreation?.id;
    }
    console.log('date1', goodsAcceptance.receiveDate);
    // goodsAcceptance.receiveDate = moment(goodsAcceptance.receiveDate).format("YYYY-MM-DD HH:MM:SS");
    this._acceptanceService
      .GoodsAcceptanceModifier(goodsAcceptance)
      .subscribe((response) => {
        // console.log(response);
        if (Object.keys(response).length != 0) {
          console.log('response', response);
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {
              entity: '',
            })
          );
          this.showGoodsAcceptanceCreationModifier = false;
          this.clearGoodsAcceptance();
          this.getGoodsAcceptanceList();
        }
      });
  }

  rejectGoodsAcceptance(goodsAcceptance: GoodsAcceptance) {
    // console.log('save', this.goodsAcceptanceCreationFields);

    if (this.goodsAcceptanceCreation?.id) {
      goodsAcceptance.id = this.goodsAcceptanceCreation?.id;
      this.clearGoodsAcceptance();
    }
    goodsAcceptance.status = "REJECTED";
    goodsAcceptance.receiveDate = moment(this.goodsAcceptanceCreation?.receiveDate).format("YYYY-MM-DD")
    this._acceptanceService
      .GoodsAcceptanceModifier(goodsAcceptance)
      .subscribe((response) => {
        // console.log(response);
        if (Object.keys(response).length != 0) {
          // console.log('response', response);
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {
              entity: goodsAcceptance?.supplierName,
            })
          );
          this.showGoodsAcceptanceCreationModifier = false;
          this.getGoodsAcceptanceList();
        }
      });
  }

  clearGoodsAcceptance() {
    this.goodsAcceptanceCreation = {};
    this.setGoodsAcceptanceFields();
  }

  generateFields() {
    this.printFields = [
      // {
      //   type: 'header',
      //   label_1: 'ფორმა 005_საქონლის მიღება',
      //   label_2: 'Form 005_Acceptance of Goods',
      // },
      {
        type: 'acceptance',
        value: this.goodsAcceptanceObject,
      },
      // {
      //   type: 'footerheader',
      //   label_1: `ინვოისი / Invoice - ${this.goodsAcceptanceObject['Invoice']}`,
      //   label_2: 'დამატებითი ინფორმაცია / Additional Information',
      // },
      // {
      //   type: 'footerbody',
      //   label_1: `<div style='margin-bottom: 1px'>
      //   <p>კურიერი / Courier : ${this.goodsAcceptanceObject['courier']} , ხელმოწერა / Signature : ________________________</p>
      //   <p style="word-spacing:5px;">მიღებული თარიღი / Received date : ${this.datePipe.transform(this.goodsAcceptanceObject['receiveDate'], 'yyyy-MM-dd')} , დრო / Time : ${this.datePipe.transform(this.goodsAcceptanceObject['receiveDate'], 'hh:mm a')}</p>
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
      //   სსპ / SOP-03 , ვერსია / Version-03, ფორმა / Form-005
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

  printAcceptanceGoods(goodsAcceptance: GoodsAcceptance) {
    this.goodsAcceptanceObject = goodsAcceptance;
    this.date = this.datePipe.transform(this.goodsAcceptanceObject['receiveDate'], 'yyyy-MM-dd'); 
    this.time = this.datePipe.transform(this.goodsAcceptanceObject['receiveDate'], 'fullTime'); 
    this.showGoodsAcceptancePrintModifier = true;
    this.generateFields();
  }

  getApproveButton() {
    return this.approveButton;
  }

  getRejectButton() {
    return this.rejectButton;
  }

  getPartyList() {
    this._partyService.getPartyMasterList().subscribe(
      (response) => {
        // console.log("check results", response)
        if (response?.results) {
          this.partyList = response?.results;
          // console.log("party list", this.partyList)
          this.setGoodsAcceptanceFields();
        }
      }
    )
  }

  onChangePartyValue(prevValue: any, value: any, formValue: any) {
    const formValueUpdated: any = {};
    let object: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      object = this.partyList.filter(e => e.id === value)[0];
      formValueUpdated.supplierPhone = object.phoneNumber;
      formValueUpdated.supplierAddress = object.companyAddress;
    }
    return formValueUpdated;
  }

  onChangeRecipientPartyValue(prevValue: any, value: any, formValue: any) {
    // console.log("formValue", formValue)
    const formValueUpdated: any = {};
    let object: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      object = this.partyList.filter(e => e.id === value)[0];
      // console.log('Supplier Object', object);
      formValueUpdated.recipientAddress = object.companyAddress;
      formValueUpdated.recipientPhone = object.phoneNumber;
    }
    return formValueUpdated;
  }

  onChangeProductValue(value: any, tableValue: any) {
    // console.log("tableValue", tableValue)
    const tableValueUpdated: any = {};
    if (tableValue) {
      Object.assign(tableValueUpdated, tableValue);
    }
    if (value) {
      tableValueUpdated.product_id = value;
      // console.log('field', this.goodsAcceptanceCreationFields)
      // console.log("table value updated", tableValueUpdated)
      tableValueUpdated.productCode = this.productList.filter(e => e.id === value)[0]?.productCode;
      tableValueUpdated.minTemp = this.productList.filter(e => e.id === value)[0]?.minTemp;
      tableValueUpdated.maxTemp = this.productList.filter(e => e.id === value)[0]?.maxTemp;
    }
    return tableValueUpdated;
  }

  // Get Ware house creation list here
  getWareHouseCreationList() {
    this._wareHouseService.getWareHouseCreationList().subscribe(
      (response) => {
        // console.log("warehouse list", this.goodsAcceptanceCreationFields);
        if (response?.results) {
          this.wareHouseCreationList = response?.results;
          // this.goodsAcceptanceCreationFields[11].formSchema[11].options = this.wareHouseCreationList;
        }
      }
    )
  }
  // Get Storage Zone creation list here
  getStorageZoneCreationList(wareHouseID) {
    this._zoneService.getStorageZoneCreationByWareHouse(wareHouseID).subscribe(
      (response) => {
        // console.log(response);
        if (response?.results) {
          this.storageZoneCreationList = response?.results;
          // console.log("storage list", this.storageZoneCreationList)
          // this.goodsAcceptanceCreationFields[11].formSchema[12].options = this.storageZoneCreationList
        }
      }
    )
  }

  getStorageZoneCreationLists() {
    this._zoneService.getStorageZoneCreationList().subscribe(
      (response) => {
        // console.log(response);
        if (response?.results) {
          this.storageZoneCreationList = response?.results;
          // console.log("storage list", this.storageZoneCreationList)
          // this.goodsAcceptanceCreationFields[11].formSchema[12].options = this.storageZoneCreationList
        }
      }
    )
  }

  //get zonelevel list
  getZoneLevelCreationList(storageZoneID) {
    this._zonelevelService.getZoneLevelCreationByStorageZone(storageZoneID).subscribe(
      (response) => {
        // console.log(response);
        if (response?.results) {
          this.zone_level_list = response?.results[0].zone_level_list;
          // console.log("zonelist", this.zone_level_list)
          this.goodsAcceptanceCreationFields[11].formSchema[13].options = this.zone_level_list
        }
      }
    )
  }

  //get shelf list 
  getShelfCreationList(zoneLevelID) {
    this._shelfCreationService.getShelfCreationByZoneLevelID(zoneLevelID).subscribe(
      (response) => {
        // console.log("shelf creation", response);
        if (response?.results) {
          this.shelf_creation_list = response?.results[0].shelf_creation_list;
          this.goodsAcceptanceCreationFields[11].formSchema[14].options = this.shelf_creation_list
        }
      }
    )
  }

  onChangeWareHouseValue(value: any, tableValue: any) {
    const tableValueUpdated: any = {};
    // console.log("table value updated", tableValue)
    if (tableValue) {
      Object.assign(tableValueUpdated, tableValue);
    }
    const wareHouseID = value
    this.getStorageZoneCreationList(wareHouseID)
    return tableValueUpdated;
  }

  onChangeStorageZoneValue(value: any, tableValue: any) {
    const tableValueUpdated: any = {};
    // console.log("table value updated", tableValue)
    if (tableValue) {
      Object.assign(tableValueUpdated, tableValue);
    }
    const storageZoneID = value
    this.getZoneLevelCreationList(storageZoneID)
    return tableValueUpdated;
  }

  onChangeZoneLevelValue(value: any, tableValue: any) {
    const tableValueUpdated: any = {};
    // console.log("table value updated", tableValue)
    if (tableValue) {
      Object.assign(tableValueUpdated, tableValue);
    }
    const zoneLevelID = value
    this.getShelfCreationList(zoneLevelID)
    return tableValueUpdated;
  }

  onChangequantityValue(value: any, tableValue: any){
    const tableValueUpdated: any = {};
    // console.log("check rejected quantity value",value)
    // console.log("table rejected table  updated", tableValue)
    // console.log("tableValue", tableValue)
    // const tableValueUpdated: any = {};
    if (tableValue) {
      Object.assign(tableValueUpdated, tableValue);
    }
    if(tableValueUpdated.rejectedQuantity == ''){
      tableValueUpdated.rejectedQuantity = 0;
    }
    
    if (value) {
      // tableValueUpdated.rejectedQuantity = value;
      // console.log('field', this.goodsAcceptanceCreationFields)
      // console.log("table value updated", tableValueUpdated)
      tableValueUpdated.acceptedQuantity = parseFloat(tableValueUpdated.Quantity) - parseFloat(tableValueUpdated.rejectedQuantity);
      // console.log("check total",total)
      // tableValueUpdated.productCode = this.productList.filter(e => e.id === value)[0]?.productCode;
    }
    return tableValueUpdated;

  }

  getDataSource() {
    if (this.goodsAcceptanceCreationFields[11].dataSource.length == 0) {
      // console.log('dataSource true');
      return true;
    } else {
      // console.log('dataSource false')
      return false;
    }
  }

}
