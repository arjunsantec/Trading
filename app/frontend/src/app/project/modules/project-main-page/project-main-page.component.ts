import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProjectCreation, ProjectCreationDeatils, ProjectCreationFileUpload } from 'src/app/shared/models/project.model';
import { ProjectService } from './services/project.service';
import { PartyMaster, POC, Shippingaddress } from 'src/app/shared/models/party.model';
import { PartyMasterService } from 'src/app/master/modules/party-master-main-page/services/party-master.service';
import { AppSettings } from 'src/app/shared/models/company.model';
import { AppSettingsService } from 'src/app/company/modules/app-settings-main-page/services/app-settings.service';
import { productMaster } from 'src/app/shared/models/product.model';
import { ProductMasterService } from 'src/app/master/modules/product-master-main-page/services/product-master.service';
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-project-main-page',
  templateUrl: './project-main-page.component.html',
  styleUrls: ['./project-main-page.component.scss']
})
export class ProjectMainPageComponent implements OnInit {

  project: ProjectCreation | any = {};
  projectList: ProjectCreation[] = new Array<ProjectCreation>();
  selectedProjects: ProjectCreation[] = new Array<ProjectCreation>();
  project_creation_list: ProjectCreationDeatils[] = new Array<ProjectCreationDeatils>();
  showProjectModifier: boolean = false;

  formFields: any = [];
  columns: any = [];

  partyList: PartyMaster[] = new Array<PartyMaster>();
  note: string = '';

  totalQuantity: number = 0.0;
  totalNetWeight: number = 0.0;
  grandTotal: number = 0.0;

  appSettingsList: AppSettings[] = new Array<AppSettings>();
  appSettingsArray: any = [];

  formProductFields: any = [];
  productMaster: productMaster | any = {};
  product_list: productMaster[] = new Array<productMaster>();
  tableRowObject: any = {};

  partyMaster: PartyMaster | any = {};
  countryCode: any = [];
  partyMasterFields: any = [];
  shippingAddress: Shippingaddress[] = new Array<Shippingaddress>();
  POC: POC[] = new Array<POC>();
  fieldName: string;
  partyMasterId: string;

  projectImages: ProjectCreationFileUpload[] = new Array<ProjectCreationFileUpload>();
  fileSelected: any = [];

  formInitialiseForDialogue = { product: '', batch_no: '', expiry_date: '', quantity: '', hs_code: '', net_weight: '', unit_value: '', total_value: '', currency_type: '' }

  constructor(private http: HttpClient,
    private _productMasterService: ProductMasterService,
    private _projectService: ProjectService,
    private _sharedService: SharedService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService,
    private _appSettingsService: AppSettingsService,
    private _pratyService: PartyMasterService) { }

  ngOnInit(): void {
    this.setProjectTable();
    this.setProjectFields();
    this.getPartyList();
    this.getProjectList();
    this.getAppSettingsList();
    this.note = `These Commodities are licensed for the ultimate destination shown/ tor use in Georgia. Commodities will be used for clinical trials only and not iintended for resale. Values declared are for customs purpose only, commodities have no Commericial value. Materials for clinical investigation in Georgia. Certify that the information on this declaration is true and correct to the best of my knowledge`;
    // console.log('formFields', this.formFields);
    this.setProductMasterFields();
    this.getProductList();
    this.getCountryDetails();
    this.setPartyMasterFields();

    // console.log('productFields', this.formProductFields);
  }

  getCountryDetails() {
    this.http.get('assets/countryDetails/country.json').subscribe(
      country => {
        this.countryCode = country['country'];
        // console.log('country code', this.countryCode);
        this.setPartyMasterFields();
        this.setProjectFields();
      }
    )
  }

  setProjectTable() {
    this.columns = [
      { field: 'projectName', label: 'projectName_TC' },
      { field: 'projectCode', label: 'projectCode_TC' },
      // { field: 'createdDate', label: 'createdDate_TC' },
      // { field: 'loadingDate', label: 'plannedLoadingDate_TC' },
      // { field: 'shipmentDate', label: 'plannedShipmentDate_TC' },
      // { field: 'storageDays', label: 'totalNoOfStorageDays_TC' },
      // { field: 'fromName', label: 'fromCustomerName_TC' },
      { field: 'fromCustomerName', label: 'fromCustomerName_TC' },
      // { field: 'fromAddress', label: 'customerAddress_TC' },
      // { field: 'zipcode', label: 'zipCode_TC' },
      // { field: 'studyNumber', label: 'studyNumber_TC' },
      // { field: 'protocolNumber', label: 'protocolNumber_TC' },
      // { field: 'orderNumber', label: 'orderNumber_TC' },
      // { field: 'contactNo', label: 'contactNo_TC' },
      // { field: 'contactPerson', label: 'eContactPerson_TC' },
      // { field: 'email', label: 'dContactEmail_TC' },
      // { field: 'invoiceNumber', label: 'customerInvoiceNumber_TC' },
      // { field: 'awbNo', label: 'awbNo_TC' },
      // { field: 'proformaInvoice', label: 'customerProformaInvoiceNo_TC' },
      // { field: 'invoiceType', label: 'invoiceType_TC' },
      // { field: 'toName', label: 'ToCustomerName_TC' },
      { field: 'toCustomerName', label: 'ToCustomerName_TC' },
      // { field: 'toAddress', label: 'customerAddress_TC' },
      // { field: 'toZipcode', label: 'zipCode_TC' },
      // { field: 'tempControlled', label: 'tempControlled_TC' },
      // { field: 'minTemp', label: 'minTemperature_TC' },
      // { field: 'maxTemp', label: 'maxTemperature_TC' },
      // { field: 'ambientControlled', label: 'ambientControlled_TC' },
      // { field: 'ambientNote', label: 'ambientNote_TC' },
      { field: 'documentNo', label: 'documentNo_TC' },
      // { field: 'effectiveDate', label: 'effectiveDate_TC' },
      // { field: 'sopRelatedTo', label: 'eSOPRelatedTo_TC' },
      // { field: 'note', label: 'note_TC' },
      // { field: 'name', label: 'name_TC' },
      // { field: 'title', label: 'title_TC' },
      // { field: 'locations', label: 'locations_TC' },
      // { field: 'date', label: 'date_tc' },
      // { field: 'signature', label: 'signature_TC' },
      // { field: 'shipmentContent', label: 'shipmentContent_TC' }
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
      entity: this.translate.instant('project_TC'),
    });
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {
      entity: this.translate.instant('project_TC'),
    });
  }

  getAppSettingsList() {
    // console.log('fields', this.formFields)
    this._appSettingsService.getAppSettingsList().subscribe(
      (response) => {
        // console.log('App Settings List', response?.results);
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
        // console.log('final Value', finalArray)
        this.formFields[6].formSchema[8].options = finalArray;
        this.formProductFields[0].fields[4].options = finalArray;
      }
    )
  }

  getProductList() {
    this._productMasterService.getProductMasterList().subscribe(
      (response) => {
        // console.log("check products", response);
        if (response?.results) {
          this.product_list = response?.results;
          // console.log("product list", this.product_list)
          this.formFields[6].formSchema[0].options = this.product_list
        }
      }
    )
  }

  setProjectFields() {
    this.formFields = [
      {
        type: 'fieldset',
        headerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'projectName',
            label: this.translate.instant('projectName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('projectName_TC') }),
            value: this.project.projectName,
            validation: {
              required: true,
              maxlength: 100,
            },
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('projectName_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('projectName_TC'), char: this.translate.instant('hundred_number') })
            }
          },
          {
            type: 'text',
            name: 'projectCode',
            label: this.translate.instant('projectCode_TC'),
            placeholder: this.translate.instant('autoGenerate_TC', { label: this.translate.instant('projectCode_TC') }),
            value: this.project.projectCode,
          },
          {
            type: 'date',
            name: 'createdDate',
            label: this.translate.instant('createdDate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('createdDate_TC') }),
            value: this.project.createdDate,
            selectionMode: 'single',
            showTime: true,
          },
          {
            type: 'date',
            name: 'loadingDate',
            label: this.translate.instant('plannedLoadingDate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('plannedLoadingDate_TC') }),
            value: this.project.loadingDate,
            selectionMode: 'single',
            // showTime: true,
            onValueChange: this.onChangeToPlannedLoadingDateValue.bind(this),
            validation: {
              required: true,
            },
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('plannedLoadingDate_TC') }),
            }
          },
          {
            type: 'date',
            name: 'shipmentDate',
            label: this.translate.instant('plannedShipmentDate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('plannedShipmentDate_TC') }),
            value: this.project.shipmentDate,
            selectionMode: 'single',
            // showTime: true,
            onValueChange: this.onChangeToPlannedShipmentDateValue.bind(this),
            validation: {
              required: true,
            },
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('plannedShipmentDate_TC') }),
            }
          },
          {
            type: 'text',
            name: 'storageDays',
            label: this.translate.instant('totalNoOfStorageDays_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('totalNoOfStorageDays_TC') }),
            value: this.project.storageDays,
            // keyFilter: 'int',
          },
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('from_TC'),
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'fromName',
            label: this.translate.instant('customerName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('customerName_TC') }),
            value: this.project.fromName,
            options: this.partyList,
            optionLabel: 'partyName',
            optionValue: 'id',
            onValueChange: this.onChangeFromPartyValue.bind(this),
            dialogue: true,
            dialogueLabel: 'Party Master',
            dialogueFields: this.getPartyMasterFields(),
            saveDialogueData: this.savePartyMaster.bind(this),
            getFieldsName: this.getFieldName.bind(this),
            closeDialogueEvent: this.handleDialogue.bind(this),
            validation: {
              required: true,
            },
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('customerName_TC') }),
            }
          },
          {
            type: 'text',
            name: 'fromAddress',
            label: this.translate.instant('customerAddress_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('customerAddress_TC') }),
            value: this.project.fromAddress,
            multiline: true,
          },
          {
            type: 'text',
            name: 'zipcode',
            label: this.translate.instant('zipCode_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('zipCode_TC') }),
            value: this.project.zipcode,
          },
          {
            type: 'text',
            name: 'studyNumber',
            label: this.translate.instant('studyNumber_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('studyNumber_TC') }),
            value: this.project.studyNumber,
          },
          {
            type: 'text',
            name: 'protocolNumber',
            label: this.translate.instant('protocolNumber_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('protocolNumber_TC') }),
            value: this.project.protocolNumber,
          },
          {
            type: 'text',
            name: 'orderNumber',
            label: this.translate.instant('orderNumber_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('orderNumber_TC') }),
            value: this.project.orderNumber,
          },
          {
            type: 'text',
            name: 'contactNo',
            label: this.translate.instant('contactNo_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('contactNo_TC') }),
            value: this.project.contactNo,
          },
          {
            type: 'text',
            name: 'contactPerson',
            label: this.translate.instant('eContactPerson_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('eContactPerson_TC') }),
            value: this.project.contactPerson,
          },
          {
            type: 'text',
            name: 'email',
            label: this.translate.instant('dContactEmail_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('dContactEmail_TC') }),
            value: this.project.email,
            validation: {
              // required: true,
              email: true,
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$",
              minlength: 1,
              maxlength: 100
            },
            suffixGroupBy: true,
            suffixGroupByIcon: 'pi-at',
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('dContactEmail_TC') }),
              email: this.translate.instant("formValidationError_SC", { label: this.translate.instant('dContactEmail_TC') }),
              pattern: this.translate.instant("formPatternError_SC", { label: this.translate.instant('dContactEmail_TC') }),
              minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('dContactEmail_TC'), char: this.translate.instant('one_number') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('dContactEmail_TC'), char: this.translate.instant('hundred_number') })
            }
          },
          {
            type: 'text',
            name: 'invoiceNumber',
            label: this.translate.instant('customerInvoiceNumber_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('customerInvoiceNumber_TC') }),
            value: this.project.invoiceNumber,
          },
          {
            type: 'text',
            name: 'awbNo',
            label: this.translate.instant('awbNo_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('awbNo_TC') }),
            value: this.project.awbNo,
          },
          {
            type: 'text',
            name: 'proformaInvoice',
            label: this.translate.instant('customerProformaInvoiceNo_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('customerProformaInvoiceNo_TC') }),
            value: this.project.proformaInvoice,
          },
          {
            type: 'text',
            name: 'invoiceType',
            label: this.translate.instant('invoiceType_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('invoiceType_TC') }),
            value: this.project.invoiceType,
          },
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('to_TC'),
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'toName',
            label: this.translate.instant('customerName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('customerName_TC') }),
            value: this.project.toName,
            options: this.partyList,
            optionLabel: 'partyName',
            optionValue: 'id',
            onValueChange: this.onChangeToPartyValue.bind(this),
            dialogue: true,
            dialogueLabel: 'Party Master',
            dialogueFields: this.getPartyMasterFields(),
            saveDialogueData: this.savePartyMaster.bind(this),
            getFieldsName: this.getFieldName.bind(this),
            closeDialogueEvent: this.handleDialogue.bind(this),
            validation: {
              required: true,
            },
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('customerName_TC') }),
            },
          },
          {
            type: 'text',
            name: 'toAddress',
            label: this.translate.instant('customerAddress_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('customerAddress_TC') }),
            value: this.project.toAddress,
            multiline: true,
          },
          {
            type: 'text',
            name: 'toZipcode',
            label: this.translate.instant('zipCode_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('zipCode_TC') }),
            value: this.project.toZipcode,
          },
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('shippingConditions_TC'),
        fillScreen: false,
        fields: [
          {
            type: 'boolean',
            name: 'tempControlled',
            label: this.translate.instant('tempControlled_TC'),
            value: this.project.tempControlled,
            onValueChange: this.onChangeTempControlValue.bind(this),
          },
          {
            type: 'text',
            name: 'minTemp',
            label: this.translate.instant('minTemperature_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('minTemperature_TC') }),
            value: this.project.minTemp,
            hidden: true,
          },
          {
            type: 'text',
            name: 'maxTemp',
            label: this.translate.instant('maxTemperature_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('maxTemperature_TC') }),
            value: this.project.maxTemp,
            hidden: true,
          },
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('storageConditions_TC'),
        fillScreen: false,
        fields: [
          {
            type: 'boolean',
            name: 'ambientControlled',
            label: this.translate.instant('ambientControlled_TC'),
            value: this.project.ambientControlled,
            onValueChange: this.onChangeAmbientControlValue.bind(this),
          },
          {
            type: 'text',
            name: 'ambientNote',
            label: this.translate.instant('ambientNote_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('ambientNote_TC') }),
            value: this.project.ambientNote,
            multiline: true,
            hidden: true,
          },
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('documentDetails_TC'),
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'documentNo',
            label: this.translate.instant('documentNo_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('documentNo_TC') }),
            value: this.project.documentNo,
          },
          {
            type: 'date',
            name: 'effectiveDate',
            label: this.translate.instant('effectiveDate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('effectiveDate_TC') }),
            value: this.project.effectiveDate,
            selectionMode: 'single',
            // showTime: true,
          },
          {
            type: 'text',
            name: 'sopRelatedTo',
            label: this.translate.instant('eSOPRelatedTo_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('eSOPRelatedTo_TC') }),
            value: this.project.sopRelatedTo,
          },
        ]
      },
      {
        type: 'table',
        name: 'project_creation_list',
        label: this.translate.instant('shipmentContent_TC'),
        // tableCaption: true,
        // tableCaptionLabel: 'Product',
        // tableCaptionButtonLabel: 'Add Product',
        // dialogueFields: this.getProductFields(),
        // saveDialogueData: this.saveProductMaster.bind(this),
        // closeDialogue: this.getProductFields(),
        getTableRowID: this.getTableRowID.bind(this),
        saveDialogueData: this.saveProductMaster.bind(this),
        formInitialise: { product: '', batch_no: '', expiry_date: '', quantity: '', hs_code: '', net_weight: '', unit_value: '', total_value: '', currency_type: '' },
        columnSchema: ['product_TC', 'batchNo_TC', 'expDate_TC', 'Quantity_TC', 'hsn_TC', 'totalNetWeight_TC', 'unitValue_TC', 'totalValue_TC', 'currencyType_TC'],
        onValueChange: this.onChangeTableValue.bind(this),
        onCancelForm: this.resetRow.bind(this),
        closeDialogueEvent: this.handleDialogue.bind(this),
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
            name: this.totalNetWeight
          },
          {
            name: ''
          },
          {
            name: this.grandTotal
          },
          {
            name: ''
          }
        ],
        tableFooter: true,
        formSchema: [
          {
            type: 'dropdown',
            name: 'product',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('productName_TC') }),
            options: this.product_list,
            optionLabel: "productName",
            optionValue: "id",
            dialogue: true,
            dialogueLabel: 'Product Master',
            dialogueFields: this.getProductFields(),
            dialogueWidth: '80vw',
            dialogueHeight: '80vh',
            emptyCustomDialogTemplate: true,
            emptyComment: this.translate.instant('createProductErrorMSG_TC'),
            onValueChange: this.onChangeProductValue.bind(this),
          },
          {
            type: 'input',
            name: 'batch_no',
          },
          {
            type: 'date',
            name: 'expiry_date',
          },
          {
            type: 'number',
            name: 'quantity',
            onValueChange: this.onChangeQuantityValue.bind(this),
          },
          {
            type: 'input',
            name: 'hs_code',
          },
          {
            type: 'input',
            name: 'net_weight',
          },
          {
            type: 'number',
            name: 'unit_value',
            onValueChange: this.onChangeUnitValue.bind(this),
          },
          {
            type: 'number',
            name: 'total_value',
          },
          {
            type: 'dropdown',
            name: 'currency_type',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('currencyType_TC') }),
            options: this.appSettingsArray,
            optionLabel: 'name',
            optionValue: 'id',
          },
        ],
        dataKey: 'id',
        dataSource: this.project.project_creation_list || [],
        maxWidthFooter: "207.4px"
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('note_TC'),
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'note',
            label: this.translate.instant('note_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('note_TC') }),
            value: this.project.id ? this.project.note : this.note,
            multiline: true,
          },
        ],
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('approver_TC'),
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'name',
            label: this.translate.instant('name_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('name_TC') }),
            value: this.project.name,
          },
          {
            type: 'text',
            name: 'title',
            label: this.translate.instant('title_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('title_TC') }),
            value: this.project.title,
          },
          {
            type: 'text',
            name: 'locations',
            label: this.translate.instant('locations_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('locations_TC') }),
            value: this.project.locations,
          },
          {
            type: 'date',
            name: 'date',
            label: this.translate.instant('date_tc'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('date_tc') }),
            value: this.project.date,
            selectionMode: 'single',
            // showTime: true,
          },
          {
            type: 'text',
            name: 'signature',
            label: this.translate.instant('signature_TC'),
            placeholder: '',
            // placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('signature_TC') }),
            value: this.project.signature,
          },
        ],
      },
      {
        type: 'file',
        name: 'file_upload',
        label: this.translate.instant('document_TC'),
        value: this.projectImages,
        multiple: true,
        onUpload: this.onUpload.bind(this),
        downloadButton: true,
        labelOnDownload: this.translate.instant('download_TC'),
        fileType: 'image/*, application/pdf',
        deleteFile: this.deleteFile.bind(this),
      }, 
      {
        type: 'text',
        name: 'totalQuantity',
        label: this.translate.instant('documentNo_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('documentNo_TC') }),
        value: this.project.totalQuantity,
        hidden: true,
      },
      {
        type: 'text',
        name: 'totalWeight',
        label: this.translate.instant('documentNo_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('documentNo_TC') }),
        value: this.project.totalWeight,
        hidden: true,
      },
      {
        type: 'text',
        name: 'grandTotal',
        label: this.translate.instant('documentNo_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('documentNo_TC') }),
        value: this.project.grandTotal,
        hidden: true,
      },
    ]
  }

  getFields() {
    return this.formFields;
  }

  resetRow(prevValue: any, tableValue: any) {
    return prevValue;
  }

  getPartyList() {
    this._pratyService.getPartyMasterList().subscribe(
      (response) => {
        // console.log("check results", response);
        if (response?.results) {
          this.partyList = response?.results;
          // console.log("party list", this.partyList);
          this.setProjectFields();
        }
      }
    )
  }

  getProjectList() {
    this._projectService.getProjectList().subscribe((response) => {
      // console.log('project list', response);
      if (response?.results) {
        this.projectList = response?.results;
        console.log('project list', this.projectList);
        this.setProjectFields();
      }
    })
  }

  onChangeToPlannedLoadingDateValue(prevValue: any, value: any, formValue: any) {
    // console.log("check Loading date", value)
    const formValueUpdated: any = {};
    // let object: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    // console.log('loadingDate', formValueUpdated.loadingDate, 'plannedShipmentDate', formValueUpdated.shipmentDate)
    // console.log('Final Loading Value', this.calculateDiff(formValueUpdated.loadingDate, formValueUpdated.shipmentDate));
    if (formValueUpdated.shipmentDate !== '' && formValueUpdated.loadingDate !== '') {
      formValueUpdated.storageDays = this.calculateDiff(formValueUpdated.shipmentDate, formValueUpdated.loadingDate);
      return formValueUpdated;
    }
    // console.log('date Loading value', formValueUpdated.storageDays);
  }

  onChangeToPlannedShipmentDateValue(prevValue: any, value: any, formValue: any) {
    // console.log("check shipment date", value)
    const formValueUpdated: any = {};
    // let object: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    // console.log('plannedLoadingDate', formValueUpdated.loadingDate, 'plannedShipmentDate', formValueUpdated.shipmentDate)
    // console.log('Final Value', this.calculateDiff(formValueUpdated.loadingDate, formValueUpdated.shipmentDate));
    if (formValueUpdated.shipmentDate !== '' && formValueUpdated.loadingDate !== '') {
      formValueUpdated.storageDays = this.calculateDiff(formValueUpdated.shipmentDate, formValueUpdated.loadingDate);
      return formValueUpdated;
    }
    // console.log('date shipment value', formValueUpdated.storageDays);
  }

  calculateDiff(loadingDate: Date, shipmentDate: Date) {
    loadingDate = new Date(loadingDate);
    shipmentDate = new Date(shipmentDate);
    return Math.floor((Date.UTC(loadingDate.getFullYear(), loadingDate.getMonth(), loadingDate.getDate()) - Date.UTC(shipmentDate.getFullYear(), shipmentDate.getMonth(), shipmentDate.getDate())) / (1000 * 60 * 60 * 24));
  }

  onChangeFromPartyValue(prevValue: any, value: any, formValue: any) {
    // console.log("suj on change", this.formFields);
    // console.log("check value", value)
    console.log("form value", formValue);
    const formValueUpdated: any = {};
    let object: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      object = this.partyList.filter(e => e.id === value)[0];
      // console.log('Customer from', object);
      formValueUpdated.zipcode = object.zipCode;
      formValueUpdated.fromAddress = object.companyAddress;
      formValueUpdated.contactNo = object.phoneNumber;
      formValueUpdated.email = object.email;
    }
    return formValueUpdated;
  }

  onChangeToPartyValue(prevValue: any, value: any, formValue: any) {
    // console.log("check value", value)
    // console.log("formFields", this.formFields);
    const formValueUpdated: any = {};
    let object: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      object = this.partyList.filter(e => e.id === value)[0];
      // console.log('Customer from', object);
      formValueUpdated.toZipcode = object.zipCode;
      formValueUpdated.toAddress = object.companyAddress;
    }
    return formValueUpdated;
  }

  onChangeTempControlValue(prevValue: any, value: any, formValue: any) {
    // console.log("check temp control", value)
    // const formValueUpdated: any = {};
    // let object: any = {};
    // if (formValue) {
    //   Object.assign(formValueUpdated, formValue);
    // }
    if (value) {
      // console.log('displaying', this.formFields)
      this.formFields[3].fields[1].hidden = false;
      this.formFields[3].fields[2].hidden = false;
    } else {
      this.formFields[3].fields[1].hidden = true;
      this.formFields[3].fields[2].hidden = true;
    }
    // return formValueUpdated;
  }

  onChangeAmbientControlValue(prevValue: any, value: any, formValue: any) {
    // console.log("check ambient control", value)
    if (value) {
      this.formFields[4].fields[1].hidden = false;
    } else {
      this.formFields[4].fields[1].hidden = true;
    }
  }

  onChangeQuantityValue(value: any, tableValue: any) {
    // console.log('Quantity', value);
    const tableValueUpdated: any = {};
    if (tableValue) {
      Object.assign(tableValueUpdated, tableValue);
    }
    // if (value == null || value == 0 || tableValueUpdated.unit_value == null) {
    //   tableValueUpdated.total_value = 0;
    // }
    if (value) {
      tableValueUpdated.total_value = tableValueUpdated.quantity * tableValueUpdated.unit_value;
    } else if (value.value == null) {
      tableValueUpdated.total_value = 0;
    }
    return tableValueUpdated;
  }

  onChangeTableValue(value: any, tableValue: any, formValue: any) {
    const formValueUpdated: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    // console.log('sachin', value);
    // console.log('sujan 1', formValue)
    tableValue.forEach(element => {
      this.totalQuantity += Number(element.quantity)
      this.totalNetWeight += Number(element.net_weight)
      this.grandTotal += Number(element.total_value)
    });
    this.formFields[6].footerInitialise = [
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
        name: this.totalNetWeight
      },
      {
        name: ''
      },
      {
        name: this.grandTotal
      }
    ]
    // this.formFields[9].value = this.totalQuantity;
    // this.formFields[10].value = this.totalNetWeight;
    // this.formFields[11].value = this.grandTotal;
    formValueUpdated.totalQuantity = this.totalQuantity;
    formValueUpdated.totalWeight = this.totalNetWeight;
    formValueUpdated.grandTotal = this.grandTotal;
    this.totalQuantity = 0
    this.totalNetWeight = 0
    this.grandTotal = 0
    return formValueUpdated;
  }

  onChangeUnitValue(value: any, tableValue: any) {
    // console.log('Unit Value', value);
    const tableValueUpdated: any = {};
    if (tableValue) {
      Object.assign(tableValueUpdated, tableValue);
    }
    if (value) {
      tableValueUpdated.total_value = tableValueUpdated.quantity * tableValueUpdated.unit_value;
    } else if (value.value == null) {
      tableValueUpdated.total_value = 0;
    }
    return tableValueUpdated;
  }

  onChangeProductValue(value: any, tableValue: any) {
    const tableValueUpdated: any = {};
    if (tableValue) {
      Object.assign(tableValueUpdated, tableValue);
    }
    if (value) {
      tableValueUpdated.product_id = value;
      console.log("table value updated", tableValueUpdated)
      let product_code = this.product_list.filter(e => e.id === value)[0];
      console.log("table value updated", product_code);
      tableValueUpdated.hs_code = product_code.hsn;
      tableValueUpdated.currency_type = product_code.currencyType;
      tableValueUpdated.unit_value = product_code.unitPrice;
    }
    return tableValueUpdated;
  }

  editProject(project: ProjectCreation) {
    console.log('Edit', project.file_upload);
    this.project = { ...project };
    // const _ = require('lodash');
    // var result =_.map(project.file_upload, 'file');
    // console.log("on edit image",result)
    this.projectImages = project.file_upload;
    this.setProjectFields();
    this.onChangeTableValue(0, project.project_creation_list, project)
    this.formFields[3].fields[1].hidden = this.project.tempControlled ? false : true;
    this.formFields[3].fields[2].hidden = this.project.tempControlled ? false : true;
    this.formFields[4].fields[1].hidden = this.project.ambientControlled ? false : true;
    this.showProjectModifier = true;
  }

  deleteProject(event: Event, project: ProjectCreation) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    // console.log('Delete', project)
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', {
        entity: project?.projectName,
      }),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._projectService.removeProject(project?.id).subscribe((response) => {
          // console.log(response);
          this._sharedService.handleSuccess(
            this.translate.instant('entityDeleteSuccessTitle_TC', {
              entity: project?.projectName,
            })
          )
          this.getProjectList();
        })
      }
    })
  }

  saveProject(project: ProjectCreation) {
    console.log('save', project);
    const formData = new FormData();
    formData.append('projectName', project?.projectName);
    formData.append('projectCode', project?.projectCode);
    formData.append('createdDate', project?.createdDate);
    formData.append('loadingDate', project?.loadingDate);
    formData.append('shipmentDate', project?.shipmentDate);
    formData.append('storageDays', project?.storageDays);
    formData.append('fromName', project?.fromName.toString());
    formData.append('fromAddress', project?.fromAddress);
    formData.append('zipcode', project?.zipcode);
    formData.append('studyNumber', project?.studyNumber);
    formData.append('protocolNumber', project?.protocolNumber);
    formData.append('orderNumber', project?.orderNumber);
    formData.append('contactNo', project?.contactNo);
    formData.append('contactPerson', project?.contactPerson);
    formData.append('email', project?.email);
    formData.append('invoiceNumber', project?.invoiceNumber);
    formData.append('awbNo', project?.awbNo);
    formData.append('proformaInvoice', project?.proformaInvoice);
    formData.append('invoiceType', project?.invoiceType);
    formData.append('toName', project?.toName.toString());
    formData.append('toAddress', project?.toAddress);
    formData.append('toZipcode', project?.toZipcode);
    formData.append('tempControlled', project?.tempControlled.toString());
    formData.append('minTemp', project?.minTemp);
    formData.append('maxTemp', project?.maxTemp);
    formData.append('ambientControlled', project?.ambientControlled.toString());
    formData.append('ambientNote', project?.ambientNote);
    formData.append('documentNo', project?.documentNo);
    formData.append('effectiveDate', project?.effectiveDate);
    formData.append('sopRelatedTo', project?.sopRelatedTo);
    formData.append('note', project?.note);
    formData.append('name', project?.name);
    formData.append('title', project?.title);
    formData.append('locations', project?.locations);
    formData.append('date', project?.date);
    formData.append('signature', project?.signature);
    formData.append('totalQuantity', project?.totalQuantity.toString());
    formData.append('totalWeight', project?.totalWeight.toString());
    formData.append('grandTotal', project?.grandTotal.toString());
    formData.append('project_creation_list', JSON.stringify(project.project_creation_list));
    for  (var i =  0; i <  this.fileSelected.length; i++)  {  
      formData.append("file_upload",  this.fileSelected[i]);
    } 
    if (this.project?.id) {
      project.id = this.project?.id;
      formData.append('id', project?.id);
    }
    this._projectService.projectModifier(formData).subscribe((response) => {
      console.log(response);
      if (Object.keys(response).length != 0) {
        this._sharedService.handleSuccess(
          this.translate.instant('entityUpdateSuccessTitle_TC', { entity: project?.projectName })
        );
        this.showProjectModifier = false;
        this.clearProject();
        this.getProjectList();
      }
    })

  }

  clearProject() {
    this.project = {};
    this.setProjectFields();
    this.fileSelected = [];
    this.projectImages = [];
  }

  onUpload(event: any) {
    console.log('on upload files', event.length, event)
    if (event.length) {
      for (let i = 0; i < event.length; i++) {
        this.fileSelected = [...this.fileSelected, event[i]];
      }
    }
    console.log("file selected", this.fileSelected)
  }

  deleteFile(fileId: any) {
    if (Number.isInteger(fileId)) {
      this._projectService.removeProjectFileUpload(fileId).subscribe();
    }else if (typeof(fileId) === 'string') {
      this.fileSelected.forEach((element: any, index: any)=>{
        if(element.fileUpload==fileId) this.fileSelected.splice(index, 1);
      });
    }
    console.log('deleted file', this.fileSelected);
  }

  setProductMasterFields() {
    this.formProductFields = [
      {
        type: 'fieldset',
        headerText: this.translate.instant('productInfo_TC'),
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'productName',
            label: this.translate.instant('productName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('productName_TC') }),
            value: this.productMaster.productName,
            validation: {
              required: true,
              minlength: 1,
              maxlength: 100,
            },
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('productName_TC') }),
              minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('productName_TC'), char: this.translate.instant('one_number') }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('productName_TC'),
                char: this.translate.instant('hundred_number'),
              }),
            }
          },
          {
            type: 'text',
            name: 'hsn',
            label: this.translate.instant('hsn_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('hsn_TC') }),
            value: this.productMaster.hsn,
            validation: {
              required: true,
              maxlength: 30
            },
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('hsn_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('hsn_TC'), char: this.translate.instant('thirty_number') })
            },
          },
          {
            type: 'text',
            name: 'productCode',
            label: this.translate.instant('productCode_TC'),
            placeholder: this.translate.instant('autoGenerate_TC', { label: this.translate.instant('productCode_TC') }),
            value: this.productMaster.productCode,
            readonly: 'readonly',
            toolTip: 'Auto Generated',
            tooltipPosition: 'top',
          },
          {
            type: 'text',
            name: 'unitPrice',
            label: this.translate.instant('unit_price_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('unit_price_TC') }),
            value: this.productMaster.unitPrice,
            validation: {
              required: true
            },
            keyFilter: "num",
            errorText: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('unit_price_TC') }),
          },
          {
            type: 'dropdown',
            name: 'currencyType',
            label: this.translate.instant('currencyType_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('currencyType_TC') }),
            value: this.productMaster.currencyType,
            validation: {
              required: true
            },
            options: this.appSettingsArray,
            optionLabel: "name",
            optionValue: "id",
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('currencyType_TC') })
            }
          },
        ]
      },
    ]
  }

  getProductFields() {
    return this.formProductFields;
  }

  saveProductMaster(productMaster: productMaster) {
    console.log('create product master', productMaster);
    this._productMasterService.saveProductMaster(productMaster).subscribe(
      (response) => {
        console.log('product master save', response);
        if (Object.keys(response).length != 0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', { entity: productMaster?.productName })
          )
          this.getProductList();
          // this.formInitialiseForDialogue = {
          //   product: response?.id,
          //   batch_no: '',
          //   expiry_date: '',
          //   quantity: '',
          //   hs_code: productMaster?.hsn,
          //   net_weight: '',
          //   unit_value: productMaster?.unitPrice.toString(),
          //   total_value: '',
          //   currency_type: productMaster?.currencyType
          // };
          // const id = this.tableRowObject.id;
          // let item: any = {};
          // Object.assign(item, this.formInitialiseForDialogue)
          // item.id = id;
          // let array = [];
          // array = 
          this.formFields[6].dataSource.forEach((element: any) => {
            if (element.id == this.tableRowObject.id) {
              element.product = response?.id;
              element.hs_code = productMaster?.hsn;
              element.unit_value = productMaster?.unitPrice.toString();
              element.currency_type = productMaster?.currencyType;
            }
          });
          console.log('formInitialise', this.formFields[6].dataSource);
        }
        // this.productMaster = {};
        // this.setProductMasterFields();
        // this.getProductFields();
        // console.log('check product', this.formProductFields);
      }
    )
    this.handleDialogue(false);
  }

  getTableRowID(event: any) {
    this.tableRowObject = event;
    console.log('Table row id', this.tableRowObject);
  }

  closeData() {
    this.productMaster = {};
    this.setProductMasterFields();
  }

  generateUniqueId() {
    return Math.floor(1000 + Math.random() * 9000);
  }

  setPartyMasterFields() {
    this.partyMasterFields = [
      {
        type: 'fieldset',
        headerText: this.translate.instant('partyProfileInfo_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'partyType',
            label: this.translate.instant('pmPartyType_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmPartyType_TC') }),
            value: this.partyMaster.partyType,
            validation: {
              required: true,
              maxlength: 100,
            },
            options: [
              { id: 'Hospitals', name: 'Hospitals' },
              { id: 'Sponsor', name: 'Sponsor' },
              { id: 'Clinics', name: 'Clinics' },
              { id: 'Patients', name: 'Patients' },
              { id: 'Direct customers', name: 'Direct customers' },
              { id: 'Nurses', name: 'Nurses' },
              { id: 'company', name: 'company' },
              { id: 'Logistic', name: 'Logistic' },
              { id: 'CONSIGNEE', name: 'CONSIGNEE' },
            ],
            optionLabel: "name",
            optionValue: "id",
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmPartyType_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmPartyType_TC'), char: this.translate.instant('hundred_number') }),
            }
          },
          {
            type: 'text',
            name: 'partyCode',
            label: this.translate.instant('PartyCode_TC'),
            placeholder: this.translate.instant('autoGenerate_TC', { label: this.translate.instant('PartyCode_TC') }),
            value: this.partyMaster.partyCode,
            readonly: 'readonly',
          },

          {
            type: 'dropdown',
            name: 'status',
            label: this.translate.instant('pmStatus_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmStatus_TC') }),
            value: this.partyMaster.status,
            validation: {
              required: true,
              maxlength: 100,
            },
            options: [
              { id: 'Active', name: 'Active' },
              { id: 'Suspended', name: 'Suspended' },
              { id: 'Inactive', name: 'Inactive' },
              { id: 'Under Inspection', name: 'Under Inspection' }
            ],
            optionLabel: "name",
            optionValue: "id",
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmOrgType_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmOrgType_TC'), char: this.translate.instant('hundred_number') }),
            }
          },
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('companydetails_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'partyName',
            label: this.translate.instant('company_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('company_TC') }),
            value: this.partyMaster.partyName,
            validation: {
              required: true,
              minlength: 1,
              maxlength: 100,
            },
            prefixGroupBy: true,
            prefixGroupByIcon: 'pi-user',
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('company_TC') }),
              minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('company_TC'), char: this.translate.instant('one_number') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('company_TC'), char: this.translate.instant('hundred_number') }),
            }
          },
          {
            type: 'text',
            name: 'phoneNumber',
            label: this.translate.instant('pmPhoneNumber_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmPhoneNumber_TC') }),
            value: this.partyMaster.phoneNumber,
            validation: {
              required: true,
              maxlength: 50
            },
            prefixGroupBy: true,
            prefixGroupByIcon: 'pi-user',
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmPhoneNumber_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmPhoneNumber_TC'), char: this.translate.instant('fifty_number') }),
            }
          },
          {
            type: 'text',
            name: 'email',
            label: this.translate.instant('pmEmail_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmEmail_TC') }),
            value: this.partyMaster.email,
            validation: {
              email: true,
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$",
              minlength: 1,
              maxlength: 50
            },
            suffixGroupBy: true,
            suffixGroupByIcon: 'pi-google',
            errorText: {
              email: this.translate.instant("formValidationError_SC", { label: this.translate.instant('pmEmail_TC') }),
              pattern: this.translate.instant("formPatternError_SC", { label: this.translate.instant('pmEmail_TC') }),
              minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('pmEmail_TC'), char: this.translate.instant('one_number') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmEmail_TC'), char: this.translate.instant('fifty_number') })
            }
          },
          {
            type: 'text',
            name: 'state',
            label: this.translate.instant('pmState_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmState_TC') }),
            value: this.partyMaster.state,
            validation: {
              minlength: 1,
              maxlength: 250,
            },
            errorText: {
              minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('pmState_TC'), char: this.translate.instant('one_number') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmState_TC'), char: this.translate.instant('two_fifty_number') }),
            }
          },
          {
            type: 'text',
            name: 'stateCode',
            label: this.translate.instant('pmStateCode_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmStateCode_TC') }),
            value: this.partyMaster.stateCode,
            validation: {
              required: true,
              maxlength: 250,
            },
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmStateCode_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmStateCode_TC'), char: this.translate.instant('two_fifty_number') }),
            }
          },
          {
            type: 'dropdown',
            name: 'country',
            label: this.translate.instant('countryName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('countryName_TC') }),
            value: this.partyMaster.country,
            options: this.countryCode,
            optionLabel: 'name',
            optionValue: 'name',
            validation: {
              minlength: 1,
              maxlength: 250,
              required: true,
            },
            prefixGroupBy: true,
            prefixGroupByIcon: 'pi-user',
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('countryName_TC') }),
              minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('countryName_TC'), char: this.translate.instant('one_number') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('countryName_TC'), char: this.translate.instant('two_fifty_number') }),
            },
            onValueChange: this.onChangeCountryName.bind(this),
          },
          {
            type: 'text',
            name: 'countryCode',
            label: this.translate.instant('countryCode_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('countryCode_TC') }),
            value: this.partyMaster.countryCode,
            validation: {
              required: true,
              maxlength: 250,
            },
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('countryCode_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('countryCode_TC'), char: this.translate.instant('two_fifty_number') }),
            }
          },
          {
            type: 'text',
            name: 'taxNo',
            label: this.translate.instant('pmTaxNo_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmTaxNo_TC') }),
            value: this.partyMaster.taxNo,
            validation: {
              required: true,
              maxlength: 50
            },
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmTaxNo_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmTaxNo_TC'), char: this.translate.instant('fifty_number') }),
            }
          },
          {
            type: 'text',
            name: 'companyAddress',
            label: this.translate.instant('companyAddress_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('companyAddress_TC') }),
            value: this.partyMaster.companyAddress,
            multiline: true,
            validation: {
              required: true,
              maxlength: 250
            },
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('companyAddress_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('companyAddress_TC'), char: this.translate.instant('two_fifty_number') }),
            }
          },
          {
            type: 'text',
            name: 'zipCode',
            label: this.translate.instant('zipCode_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('zipCode_TC') }),
            value: this.partyMaster.zipCode,
            validation: {
              maxlength: 50
            },
            errorText: {
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('zipCode_TC'), char: this.translate.instant('fifty_number') }),
            }
          },
        ]
      },
      {
        type: 'tab',
        headerTextArray: [this.translate.instant('pmPointOfContact_TC'), this.translate.instant('pmShippingAddress_TC')],
        fields: [
          {
            type: 'table',
            name: 'POC',
            // label: this.translate.instant('pmBillingAddress_TC'),
            formInitialise: { personName: '', personEmailID: '', personAddress: '' },
            columnSchema: ['personName_TC', 'PersonEmailID_TC', 'PersonAddress_TC'],
            onCancelForm: this.resetRow.bind(this),
            formSchema: [
              {
                name: 'personName',
                type: 'input',
              },
              {
                name: 'personEmailID',
                type: 'input',
              },
              {
                name: 'personAddress',
                type: 'input',
              },
            ],
            dataKey: 'id',

            dataSource: this.partyMaster?.POC ? this.POC : [],

          },
          {
            type: 'table',
            name: 'shippingAddress',
            // label: this.translate.instant('pmShippingAddress_TC'),
            formInitialise: { address: '', state: '', shippingGSTNo: '' },
            columnSchema: ['address_TC', 'stateNameLabel_TC', 'shippingGSTNo_TC'],
            onCancelForm: this.resetRow.bind(this),
            formSchema: [
              {
                name: 'address',
                type: 'input',
              },
              {
                name: 'state',
                type: 'input',
              },
              {
                name: 'shippingGSTNo',
                type: 'input',
              },
            ],
            dataKey: 'id',
            dataSource: this.partyMaster?.shippingAddress ? this.shippingAddress : [],
          },
        ]
      },
      {
        type: 'dropdown',
        name: 'approvalStatus',
        label: this.translate.instant('pmApprovalStatus_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmApprovalStatus_TC') }),
        value: this.partyMaster.approvalStatus,
        validation: {
          required: true,
          maxlength: 100,
        },
        options: [
          { id: 'Active', name: 'Active' },
          { id: 'Suspended', name: 'Suspended' },
          { id: 'Inactive', name: 'Inactive' },
          { id: 'Under Inspection', name: 'Under Inspection' },
        ],
        optionLabel: "name",
        optionValue: "id",
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmApprovalStatus_TC') }),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmApprovalStatus_TC'), char: this.translate.instant('hundred_number') }),
        }
      },
      {
        type: 'text',
        name: 'approvalBy',
        label: this.translate.instant('pmApprovalBy_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmApprovalBy_TC') }),
        value: this.partyMaster.approvalBy,
        validation: {
          required: true,
          maxlength: 100,
        },
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmApprovalBy_TC') }),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmApprovalBy_TC'), char: this.translate.instant('hundred_number') }),
        }
      },
      {
        type: 'date',
        name: 'approvalDate',
        label: this.translate.instant('pmApprovalDate_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmApprovalDate_TC') }),
        value: this.partyMaster.approvalDate,
        validation: {
          required: true,
          maxlength: 100,
        },
        selectionMode: 'single',
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmApprovalDate_TC') }),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmApprovalDate_TC'), char: this.translate.instant('hundred_number') }),
        }
      },
    ]
  }

  getPartyMasterFields() {
    return this.partyMasterFields;
  }

  onChangeCountryName(prevValue: any, value: any, formValue: any) {
    const formValueUpdated: any = {};
    let country_code: string = '';
    // if (formValue) {
    //   Object.assign(formValueUpdated, formValue);
    // }
    if (value) {
      country_code = this.countryCode.filter(e => e.name == value);
      formValueUpdated.countryCode = country_code[0]['code'];
    }
    // console.log(formValueUpdated);
    return formValueUpdated;
  }

  savePartyMaster(partyMaster: PartyMaster, formValue: any) {
    partyMaster.shippingAddress = JSON.stringify(partyMaster.shippingAddress);
    partyMaster.POC = JSON.stringify(partyMaster.POC);
    console.log("check party master", partyMaster)
    this._pratyService.partyModifier(partyMaster).subscribe(
      (response) => {
        console.log(response);
        if (Object.keys(response).length != 0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', { entity: partyMaster?.partyName })
          );
          console.log("party master project", this.formFields);
          console.log('formValue', formValue)
          this.getPartyLists();
          this.updatePartyValue(response, this.fieldName, formValue);
          this.handleDialogue(false);
        }
      }
    )
  }

  // let object = this.partyList.filter(e => e.id === response.id)[0];
  // console.log('object', object);
  // if (this.fieldName = 'fromName') {
  //   console.log('occur');
  //   this.formFields[1].fields[0].value = object.id;
  //   this.formFields[1].fields[1].value = object.companyAddress;
  //   this.formFields[1].fields[2].value = object.zipCode;
  //   this.project.formName = object.id;
  //   this.project.fromAddress = object.companyAddress;
  //   this.project.zipCode = object.zipCode;
  // } else {
  //   this.formFields[2].fields[0].value = object.id;
  //   this.formFields[2].fields[1].value = object.companyAddress;
  //   this.formFields[2].fields[2].value = object.zipCode;
  // }
  // console.log(this.formFields);
  
  getFieldName(event: any) {
    this.fieldName = event
    console.log('party field', this.fieldName);
  }

  getId(event: any) {
    this.partyMasterId = event;
    console.log('id', event);
  }

  updatePartyValue(event: any, fieldName: any, formValue: any) {
    console.log("form value", formValue);

    if (fieldName == 'fromName') {
      formValue.fromName = event.id;
      formValue.zipcode = event.zipCode;
      formValue.fromAddress = event.companyAddress;
      formValue.contactNo = event.phoneNumber;
      formValue.email = event.email;
    } else if (fieldName == 'toName') {
      formValue.toName = event.id ;
      formValue.toZipcode = event.zipCode;
      formValue.toAddress = event.companyAddress;
    } else {
      return 
    }

    Object.assign(this.project, formValue);
    this.setProjectFields();
  }

  getPartyLists() {
    this._pratyService.getPartyMasterList().subscribe(
      (response) => {
        if (response?.results) {
          this.partyList = response?.results;
          console.log("party list", this.partyList);
          this.formFields[1].fields[0].options = this.partyList;
          this.formFields[2].fields[0].options = this.partyList;
        }
      }
    )
  }

  handleDialogue(event) {
    console.log('handle dialogue', event)
    this.setProductMasterFields();
    this.setPartyMasterFields();
    this.formFields[1].fields[0].dialogueFields = this.getPartyMasterFields();
    this.formFields[2].fields[0].dialogueFields = this.getPartyMasterFields();
    this.formFields[6].formSchema[0].dialogueFields = this.getProductFields();
    return event;
  }

}
