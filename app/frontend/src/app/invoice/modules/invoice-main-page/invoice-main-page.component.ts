import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { PartyMasterService } from 'src/app/master/modules/party-master-main-page/services/party-master.service';
import { InvoiceCreation } from 'src/app/shared/models/invoice.model';
import { PartyMaster } from 'src/app/shared/models/party.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { InvoiceMainPageService } from './services/invoice-main-page.service';

@Component({
  selector: 'app-invoice-main-page',
  templateUrl: './invoice-main-page.component.html',
  styleUrls: ['./invoice-main-page.component.scss']
})
export class InvoiceMainPageComponent implements OnInit {

  invoiceCreation: InvoiceCreation | any = {};
  invoiceCreationList: InvoiceCreation[] = new Array<InvoiceCreation>();
  selectedInvoiceCreations: InvoiceCreation[] = new Array<InvoiceCreation>();
  showInvoiceCreationModifier: boolean = false;

  formFields: any = [];
  columns: any = [];

  partyList: PartyMaster[] = new Array<PartyMaster>();

  totalQuantity: number = 0.0;
  subTotal: number = 0.0;

  batchNumberList: any = [];
  quantityCount: number = 0;
  tableRowObject: any = {};

  showInvoiceCreationPrintModifier: boolean = false;
  printFields: any = [];
  invoiceCreationObject = {};

  countryOfOrigin: string = '';
  note: string = '';

  constructor(private http: HttpClient,
    private _invoiceService: InvoiceMainPageService,
    private _sharedService: SharedService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService,
    private _pratyService: PartyMasterService,) { }

  ngOnInit(): void {
    this.setInvoiceFields();
    this.setInvoiceTable();
    this.getInvoiceList();
    this.getPartyList();
    this.getBatchNumberList();
    this.countryOfOrigin = "The exporter of the products covered by the document declares that, except where otherwise clearly indicated, these products are of German preferential origin";
    this.note = "Medication for clinical trial only; No commercial value, not for sale. Transport conditions: between 2°C and 8°C & Storage conditions: 2°C and 8°C. Handle with care & Protect from light, heat and moisture. Do not pile up OR stack packages. DO NOT OPEN PALLETS WITHOUT PRIOR NOTIFICATION OF FISHER OR CONSIGNEE";
    console.log('fields', this.formFields)
  }

  setInvoiceTable() {
    this.columns = [
      // { field: 'consignee', label: 'consignee_TC' },
      // { field: 'importerOfRecord', label: 'importerOfRecord_TC' },
      // { field: 'customsBroker', label: 'customsBroker_TC' },
      { field: 'invoice', label: 'invoiceNumber_TC' },
      // { field: 'invoiceDate', label: 'date_TC' },
      // { field: 'initial', label: 'initial_TC' },
      { field: 'protocol', label: 'protocol_TC' },
      // { field: 'incoterms', label: 'incoterms_TC' },
      { field: 'shipmentsContains', label: 'shipmentsContains_TC' },
      // { field: 'totalQuantity', label: 'totalQuantity_TC' },
      // { field: 'subTotal', label: 'subTotal_TC' },
      // { field: 'countryOfOrigin', label: 'countryOfOrigin_TC' },
      // { field: 'manufacturer', label: 'manufacturer_TC' },
      // { field: 'carrier', label: 'carrier_TC' },
      // { field: 'service', label: 'service_TC' },
      // { field: 'hawb', label: 'hawb_TC' },
      // { field: 'dispatchDate', label: 'dispatchDate_TC' },
      // { field: 'deliveryDate', label: 'deliveryDate_TC' },
      // { field: 'consignment', label: 'consignment_TC' },
      // { field: 'marks', label: 'marks_TC' },
      // { field: 'quantity', label: 'quantity_TC' },
      // { field: 'netWeight', label: 'netWeight_TC' },
      // { field: 'grossWeight', label: 'grossWeight_TC' },
      // { field: 'dimension', label: 'dimension_TC' },
      // { field: 'note', label: 'note_TC' },
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
      entity: this.translate.instant('invoice_TC'),
    });
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {
      entity: this.translate.instant('invoice_TC'),
    });
  }

  getPartyList() {
    this._pratyService.getPartyMasterList().subscribe(
      (response) => {
        // console.log("check results", response)
        if (response?.results) {
          this.partyList = response?.results;
          console.log("party list", this.partyList)
          this.setInvoiceFields();
        }
      }
    )
  }

  getBatchNumberList() {
    this._invoiceService.getBatchNumberList().subscribe(
      (response) => {
        // console.log(response);
        // if (response) {
          this.batchNumberList = response.batch_number;
          console.log("batchNumberList", this.batchNumberList)
          this.setInvoiceFields();
        // }
      }
    )
  }

  setInvoiceFields() {
    this.formFields = [
      {
        type: 'fieldset',
        headerText: this.translate.instant('invoiceDetails_TC'),
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'exporter',
            label: this.translate.instant('exporter_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('exporter_TC') }),
            value: this.invoiceCreation.exporter,
            validation: {
              // required: true,
              maxlength: 100,
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('exporter_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('exporter_TC'), char: this.translate.instant('hundred_number') })
            }
          },
          {
            type: 'text',
            name: 'consignee',
            label: this.translate.instant('consignee_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('consignee_TC') }),
            value: this.invoiceCreation.consignee,
            validation: {
              // required: true,
              maxlength: 200,
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('consignee_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('consignee_TC'), char: this.translate.instant('two_hundred_number') })
            }
          },
          {
            type: 'text',
            name: 'importerOfRecord',
            label: this.translate.instant('importerOfRecord_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('importerOfRecord_TC') }),
            value: this.invoiceCreation.importerOfRecord,
            validation: {
              // required: true,
              maxlength: 100,
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('importerOfRecord_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('importerOfRecord_TC'), char: this.translate.instant('hundred_number') })
            }
          },
          // {
          //   type: 'dropdown',
          //   name: 'consignee',
          //   label: this.translate.instant('consignee_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('consignee_TC'),
          //   }),
          //   value: this.invoiceCreation.consignee,
          //   // validation: {
          //   //   required: true,
          //   // },
          //   options: this.partyList,
          //   optionLabel: "partyName",
          //   optionValue: "id",
          //   // errorText: {
          //   //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('consignee_TC') }),
          //   // }
          // },
          // {
          //   type: 'dropdown',
          //   name: 'importerOfRecord',
          //   label: this.translate.instant('importerOfRecord_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('importerOfRecord_TC'),
          //   }),
          //   value: this.invoiceCreation.importerOfRecord,
          //   // validation: {
          //   //   required: true,
          //   // },
          //   options: this.partyList,
          //   optionLabel: "partyName",
          //   optionValue: "id",
          //   // errorText: {
          //   //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('importerOfRecord_TC') }),
          //   // }
          // },
          {
            type: 'dropdown',
            name: 'customsBroker',
            label: this.translate.instant('customsBroker_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('customsBroker_TC'),
            }),
            value: this.invoiceCreation.customsBroker,
            validation: {
              required: true,
            },
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('customsBroker_TC') }),
            }
          },
          {
            type: 'text',
            name: 'invoice',
            label: this.translate.instant('invoiceNumber_TC'),
            placeholder: this.translate.instant('autoGenerate_TC', { label: this.translate.instant('invoiceNumber_TC') }),
            value: this.invoiceCreation.invoice,
            readonly: 'readonly',
            toolTip: 'Auto Generated',
            tooltipPosition: 'top',
          },
          {
            type: 'date',
            name: 'invoiceDate',
            label: this.translate.instant('date_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('date_TC'),
            }),
            value: this.invoiceCreation.invoiceDate,
            showTime: true,
            selectionMode: 'single',
          },
          {
            type: 'text',
            name: 'initial',
            label: this.translate.instant('initial_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('initial_TC') }),
            value: this.invoiceCreation.initial,
            validation: {
              // required: true,
              maxlength: 100,
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('initial_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('initial_TC'), char: this.translate.instant('hundred_number') })
            }
          },
          {
            type: 'text',
            name: 'protocol',
            label: this.translate.instant('protocol_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('protocol_TC') }),
            value: this.invoiceCreation.protocol,
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
            name: 'incoterms',
            label: this.translate.instant('incoterms_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('incoterms_TC') }),
            value: this.invoiceCreation.incoterms,
            validation: {
              // required: true,
              maxlength: 100,
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('incoterms_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('incoterms_TC'), char: this.translate.instant('hundred_number') })
            }
          },
          {
            type: 'text',
            name: 'shipmentsContains',
            label: this.translate.instant('shipmentsContains_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('shipmentsContains_TC') }),
            value: this.invoiceCreation.shipmentsContains,
            validation: {
              // required: true,
              maxlength: 100,
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('shipmentsContains_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('shipmentsContains_TC'), char: this.translate.instant('hundred_number') })
            }
          },
          {
            type: 'text',
            name: 'manufacturer',
            label: this.translate.instant('manufacturer_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('manufacturer_TC') }),
            value: this.invoiceCreation.manufacturer,
            validation: {
              // required: true,
              maxlength: 100,
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('manufacturer_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('manufacturer_TC'), char: this.translate.instant('hundred_number') })
            }
          },
          {
            type: 'text',
            name: 'countryOfOrigin',
            label: this.translate.instant('countryOfOrigin_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('countryOfOrigin_TC') }),
            value: this.invoiceCreation.id ? this.invoiceCreation.countryOfOrigin : this.countryOfOrigin,
            multiline: true,
            validation: {
              // required: true,
              maxlength: 1000,
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('countryOfOrigin_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('countryOfOrigin_TC'), char: this.translate.instant('hundred_number') })
            }
          },
        ]
      },
      {
        type: 'table',
        name: 'invoice_creation_list',
        label: this.translate.instant('grnDetails_TC'),
        formInitialise: { description: '', expiry_date: '', batch: '', quantity: '', country_of_origin: '', tariff_no: '', value_per_unit: '', sub_total: '' },
        columnSchema: ['descriptionLabel_TC', 'expiryDateTable_TC', 'batch#_TC', 'quantity_TC', 'countryOfOrigin_TC', 'tariffNumber_TC', 'valuePerUnit_TC', 'subTotalEur_TC'],
        formSchema: [
          {
            type: 'input',
            name: 'description',
          },
          {
            type: 'date',
            name: 'expiry_date',
          },
          {
            type: 'dropdown',
            name: 'batch',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('batch#_TC') }),
            options: this.batchNumberList,
            optionLabel: "batch_no",
            optionValue: "batch_no",
            onValueChange: this.onChangeBatchValue.bind(this),
          },
          {
            type: 'number',
            name: 'quantity',
          },
          {
            type: 'input',
            name: 'country_of_origin',
          },
          {
            type: 'input',
            name: 'tariff_no',
          },
          {
            type: 'number',
            name: 'value_per_unit',
          },
          {
            type: 'number',
            name: 'sub_total',
          },
        ],
        tableFooter: true,
        footerInitialise: [
          {
            name: ''
          },
          {
            name: 'total_TC'
          },
          {
            name: ''
          },
          {
            name: this.totalQuantity
          },
          {
            name: ''
          },
          {
            name: ''
          },
          {
            name: ''
          },
          {
            name: this.subTotal
          },
        ],
        onValueChange: this.onChangeTableValue.bind(this),
        onCancelForm: this.resetRow.bind(this),
        dataKey: 'id',
        getTableRowID: this.getTableRowID.bind(this),
        dataSource: this.invoiceCreation.invoice_creation_list || [],
        maxWidthFooter: "206.5px"
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('shippingDetails_TC'),
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'carrier',
            label: this.translate.instant('carrier_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('carrier_TC') }),
            value: this.invoiceCreation.carrier,
            validation: {
              // required: true,
              maxlength: 100,
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('carrier_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('carrier_TC'), char: this.translate.instant('hundred_number') })
            }
          },
          {
            type: 'text',
            name: 'service',
            label: this.translate.instant('service_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('service_TC') }),
            value: this.invoiceCreation.service,
            validation: {
              // required: true,
              maxlength: 100,
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('service_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('service_TC'), char: this.translate.instant('hundred_number') })
            }
          },
          {
            type: 'text',
            name: 'hawb',
            label: this.translate.instant('hawb_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('hawb_TC') }),
            value: this.invoiceCreation.hawb,
            validation: {
              // required: true,
              maxlength: 100,
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('hawb_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('hawb_TC'), char: this.translate.instant('hundred_number') })
            }
          },
        ],
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('specifications_TC'),
        fillScreen: false,
        fields: [
          {
            type: 'date',
            name: 'dispatchDate',
            label: this.translate.instant('dispatchDate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('dispatchDate_TC'),
            }),
            value: this.invoiceCreation.dispatchDate,
            showTime: true,
            selectionMode: 'single',
          },
          {
            type: 'date',
            name: 'deliveryDate',
            label: this.translate.instant('deliveryDate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('deliveryDate_TC'),
            }),
            value: this.invoiceCreation.deliveryDate,
            showTime: true,
            selectionMode: 'single',
          },
          {
            type: 'text',
            name: 'consignment',
            label: this.translate.instant('consignment_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('consignment_TC') }),
            value: this.invoiceCreation.consignment,
            validation: {
              // required: true,
              maxlength: 100,
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('consignment_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('consignment_TC'), char: this.translate.instant('hundred_number') })
            }
          },
          {
            type: 'text',
            name: 'marks',
            label: this.translate.instant('marks_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('marks_TC') }),
            value: this.invoiceCreation.marks,
            validation: {
              // required: true,
              maxlength: 100,
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('marks_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('marks_TC'), char: this.translate.instant('hundred_number') })
            }
          },
          {
            type: 'text',
            name: 'quantity',
            label: this.translate.instant('quantity_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('quantity_TC') }),
            value: this.invoiceCreation.quantity,
            validation: {
              // required: true,
              maxlength: 100,
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('quantity_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('quantity_TC'), char: this.translate.instant('hundred_number') })
            }
          },
          {
            type: 'text',
            name: 'netWeight',
            label: this.translate.instant('netWeight_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('netWeight_TC') }),
            value: this.invoiceCreation.netWeight,
            validation: {
              // required: true,
              maxlength: 100,
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('netWeight_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('netWeight_TC'), char: this.translate.instant('hundred_number') })
            }
          },
          {
            type: 'text',
            name: 'grossWeight',
            label: this.translate.instant('grossWeight_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('grossWeight_TC') }),
            value: this.invoiceCreation.grossWeight,
            validation: {
              // required: true,
              maxlength: 100,
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('grossWeight_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('grossWeight_TC'), char: this.translate.instant('hundred_number') })
            }
          },
          {
            type: 'text',
            name: 'dimension',
            label: this.translate.instant('dimension_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('dimension_TC') }),
            value: this.invoiceCreation.dimension,
            validation: {
              // required: true,
              maxlength: 100,
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('dimension_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('dimension_TC'), char: this.translate.instant('hundred_number') })
            }
          },
          {
            type: 'text',
            name: 'note',
            label: this.translate.instant('note_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('note_TC') }),
            value: this.invoiceCreation.id ? this.invoiceCreation.note : this.note,
            multiline: true,
            // validation: {
            //   // required: true,
            //   maxlength: 1000,
            // },
            // errorText: {
            //   // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('note_TC') }),
            //   maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('note_TC'), char: this.translate.instant('hundred_number') })
            // }
          },
        ],
      },
      {
        type: 'text',
        name: 'totalQuantity',
        label: this.translate.instant('totalQuantity_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('totalQuantity_TC') }),
        value: this.invoiceCreation.totalQuantity,
        hidden: true,
      },
      {
        type: 'text',
        name: 'subTotal',
        label: this.translate.instant('subTotal_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('subTotal_TC') }),
        value: this.invoiceCreation.subTotal,
        hidden: true,
      },
    ]
  }

  resetRow(prevValue: any, tableValue: any) {
    return prevValue;
  }

  getTableRowID(event: any) {
    this.tableRowObject = event;
    console.log('Table row id', this.tableRowObject);
  }

  getFields() {
    return this.formFields;
  }

  getInvoiceList() {
    this._invoiceService.getInvoiceList().subscribe((response) => {
      console.log(response);
      if (response?.results) {
        this.invoiceCreationList = response?.results;
        // this._sharedService.handleSuccess(
        //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('invoice_TC')})
        // );
      }
    });
  }

  onChangeTableValue(value: any, tableValue: any, formValue: any) {
    const formValueUpdated: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    tableValue.forEach(element => {
      this.totalQuantity += Number(element.quantity)
      this.subTotal += Number(element.sub_total)
    });
    console.log('table total', this.totalQuantity, this.subTotal)
    this.formFields[1].footerInitialise = [
      {
        name: ''
      },
      {
        name: 'total_TC'
      },
      {
        name: ''
      },
      {
        name: this.totalQuantity
      },
      {
        name: ''
      },
      {
        name: ''
      },
      {
        name: ''
      },
      {
        name: this.subTotal
      },
    ],
    formValueUpdated.totalQuantity = this.totalQuantity;
    formValueUpdated.subTotal = this.subTotal;
    this.totalQuantity = 0;
    this.subTotal = 0;
    return formValueUpdated;
  }

  onChangeBatchValue(value: any, tableValue: any) {
    if (value) {
      console.log('batch', value)
        this._invoiceService.getQuantityCount(value).subscribe(
          (response) => {
            // console.log(response);
            if (response) {
              this.quantityCount = response;
              console.log("quantityCount", this.quantityCount)
            }
            this.formFields[1].dataSource.forEach((element: any) => {
              if (element.id == this.tableRowObject.id) {
                element.quantity = response.quantity;
                element.value_per_unit = response['price'].price__sum / response.quantity;
                element.sub_total = response['price'].price__sum;
              }
            });
          }
        )
      }
  }

  editInvoiceCreation(invoiceCreation: InvoiceCreation) {
    console.log('edit', invoiceCreation);
    this.invoiceCreation = { ...invoiceCreation };
    this.setInvoiceFields();
    this.onChangeTableValue(0, invoiceCreation.invoice_creation_list, invoiceCreation);
    this.showInvoiceCreationModifier = true;
  }

  deleteInvoiceCreation(event: Event, invoiceCreation: InvoiceCreation) {
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
        this._invoiceService.removeInvoice(invoiceCreation?.id).subscribe((response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {
                entity: '',
              })
            );
            this.getInvoiceList();
          });
      },
    });
  }

  saveInvoiceCreation(invoiceCreation: InvoiceCreation) {
    console.log('save', invoiceCreation);
    if (this.invoiceCreation?.id) {
      invoiceCreation.id = this.invoiceCreation?.id;
    }
    this._invoiceService.invoiceModifier(invoiceCreation).subscribe((response) => {
      console.log("response",response);
      if (Object.keys(response).length!=0) {
        this._sharedService.handleSuccess(
          this.translate.instant('entityUpdateSuccessTitle_TC', {
            entity: '',
          })
        );
        this.showInvoiceCreationModifier = false;
        this.clearInvoiceCreation();
        this.getInvoiceList();
      }
    });
  }

  clearInvoiceCreation() {
    this.invoiceCreation = {};
    this.setInvoiceFields();
  }

  generateFields() {
    this.printFields = [
      {
        type: 'invoice',
        value: this.invoiceCreationObject,
      },
    ]
  }

  getPrintFields() {
    return this.printFields;
  }

  printInvoiceCreation(invoiceCreation: InvoiceCreation) {
    this.invoiceCreationObject = invoiceCreation;
    this.showInvoiceCreationPrintModifier = true;
    this.generateFields();
  }

}
