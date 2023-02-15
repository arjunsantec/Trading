import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { SiteToSite, site_to_site_list } from 'src/app/shared/models/studymanage.model';
import { SiteToSiteService } from './services/site-to-site.service';
import { ProductMasterService } from 'src/app/master/modules/product-master-main-page/services/product-master.service';
import { productMaster } from 'src/app/shared/models/product.model';
import { PartyMaster } from 'src/app/shared/models/party.model';
import { PartyMasterService } from 'src/app/master/modules/party-master-main-page/services/party-master.service';
import { DatePipe } from '@angular/common';
import { ProjectCreation } from 'src/app/shared/models/project.model';
import { ProjectService } from 'src/app/project/modules/project-main-page/services/project.service';

@Component({
  selector: 'app-site-to-site',
  templateUrl: './site-to-site.component.html',
  styleUrls: ['./site-to-site.component.scss']
})
export class SiteToSiteComponent implements OnInit {

  siteToSite: SiteToSite | any = {};
  siteToSiteList: SiteToSite[] = new Array<SiteToSite>();
  selectedSiteToSite: SiteToSite[] = new Array<SiteToSite>();
  showSiteToSiteModifier: boolean = false;
  site_to_site_list: site_to_site_list[] = new Array<site_to_site_list>();
  product_list: productMaster[] = new Array<productMaster>();
  partyList: PartyMaster[] = new Array<PartyMaster>();

  columns: any = [];
  formFields: any = [];

  showSiteToSitePrintModifier: boolean = false;
  printFields: any = [];
  siteToSiteObject = {};
  projectList: ProjectCreation[] = new Array<ProjectCreation>();

  constructor(public translate: TranslateService,
    private _sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private _productSerive: ProductMasterService,
    private _siteToSiteService: SiteToSiteService,
    private _pratyService: PartyMasterService,
    private _projectService: ProjectService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.setSiteToSiteTable();
    this.setSiteToSiteCreationFields();
    this.getProductList();
    this.getSiteToSiteList();
    this.getPartyList();
    this.getProjectList();
    // console.log(this.formFields);
  }

  setSiteToSiteTable() {
    this.columns = [
      { field: 'fromSiteName', label: 'fromName_TC' },
      // { field: 'fromAddress', label: 'address_TC' },
      // { field: 'fromPhone', label: 'phone_TC' },
      { field: 'toSiteName', label: 'toName_TC' },
      // { field: 'toAddress', label: 'address_TC' },
      // { field: 'toPhone', label: 'phone_TC' },
      // { field: 'Document', label: 'document_TC' },
      // { field: 'Sponsor', label: 'sponsor_TC' },
      // { field: 'Protocol', label: 'portocol_TC' },
      { field: 'projectName', label: 'project_TC' },
      { field: 'Weight', label: 'weights_TC' },
      { field: 'Size', label: 'size_TC' },
      { field: 'boxQuantity', label: 'boxQuantity_TC' },
      // { field: 'site_to_site_list', label: 'site_to_site_list_TC' },
    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('siteToSiteCreation_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('siteToSiteCreation_TC') })
  }

  setSiteToSiteCreationFields() {
    this.formFields = [
      {
        type: 'fieldset',
        headerText: this.translate.instant('fromSite_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'fromName',
            label: this.translate.instant('name_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('name_TC'),
            }),
            value: this.siteToSite.fromName,
            validation: {
              required: true,
            },
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            onValueChange: this.onChangeFromSitePartyValue.bind(this),
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('name_TC') }),
            }
          },
          {
            type: 'text',
            name: 'fromPhone',
            label: this.translate.instant('phone_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('phone_TC'),
            }),
            value: this.siteToSite.fromPhone,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('phone_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'fromAddress',
            label: this.translate.instant('address_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('address_TC'),
            }),
            value: this.siteToSite.fromAddress,
            multiline: true,
            validation: {
              required: true,
              maxlength: 500,
            },
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('address_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('address_TC'),
                char: this.translate.instant('five_hundred_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'fromCourier',
            label: this.translate.instant('courier_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('courier_TC'),
            }),
            value: this.siteToSite.fromCourier,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('courier_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'date',
            name: 'transferDate',
            label: this.translate.instant('transferDate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('transferDate_TC'),
            }),
            value: this.siteToSite.transferDate,
            // validation: {
            //   required: true,
            // },
            // required: true,
            showTime: true,
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('transferDate_TC'),
              }),
            },
          },
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('toSite_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'toName',
            label: this.translate.instant('name_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('name_TC'),
            }),
            value: this.siteToSite.toName,
            validation: {
              required: true,
            },
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            onValueChange: this.onChangeToSitePartyValue.bind(this),
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('name_TC') }),
            }
          },
          {
            type: 'text',
            name: 'toPhone',
            label: this.translate.instant('phone_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('phone_TC'),
            }),
            value: this.siteToSite.toPhone,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('phone_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'toAddress',
            label: this.translate.instant('address_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('address_TC'),
            }),
            value: this.siteToSite.toAddress,
            multiline: true,
            disabled: false,
            validation: {
              required: true,
              maxlength: 500,
            },
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('address_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('address_TC'),
                char: this.translate.instant('five_hundred_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'toCourier',
            label: this.translate.instant('courier_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('courier_TC'),
            }),
            value: this.siteToSite.toCourier,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('courier_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'date',
            name: 'deliveryDate',
            label: this.translate.instant('deliveryDate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('deliveryDate_TC'),
            }),
            value: this.siteToSite.deliveryDate,
            // validation: {
            //   required: true,
            // },
            // required: true,
            showTime: true,
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('deliveryDate_TC'),
              }),
            },
          },
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('technicalSpecification_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'Document',
            label: this.translate.instant('document_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('document_TC'),
            }),
            value: this.siteToSite.Document,
            validation: {
              // required: true,
              maxlength: 50,
            },
            errorText: {
              // required: this.translate.instant('formRequiredError_SC', {
              //   label: this.translate.instant('document_TC'),
              // }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('document_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          // {
          //   type: 'text',
          //   name: 'Sponsor',
          //   label: this.translate.instant('sponsor_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('sponsor_TC'),
          //   }),
          //   value: this.siteToSite.Sponsor,
          //   validation: {
          //     maxlength: 50,
          //   },
          //   errorText: {
          //     maxlength: this.translate.instant('formMaxLengthError_SC', {
          //       label: this.translate.instant('sponsor_TC'),
          //       char: this.translate.instant('fifty_number'),
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
            value: this.siteToSite.sponsor,
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
            name: 'Protocol',
            label: this.translate.instant('portocol_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('portocol_TC'),
            }),
            value: this.siteToSite.Protocol,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('portocol_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          // {
          //   type: 'text',
          //   name: 'Project',
          //   label: this.translate.instant('project_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('project_TC'),
          //   }),
          //   value: this.siteToSite.Project,
          //   validation: {
          //     maxlength: 50,
          //   },
          //   errorText: {
          //     maxlength: this.translate.instant('formMaxLengthError_SC', {
          //       label: this.translate.instant('project_TC'),
          //       char: this.translate.instant('fifty_number'),
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
            value: this.siteToSite.project,
            // required: true,
            // validation: {
            //   required: true,
            // },
            options: this.projectList,
            optionLabel: "projectName",
            optionValue: "id",
          },
          {
            type: 'text',
            name: 'Weight',
            label: this.translate.instant('weights_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('weights_TC'),
            }),
            value: this.siteToSite.Weight,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('weights_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'Size',
            label: this.translate.instant('size_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('size_TC'),
            }),
            value: this.siteToSite.Size,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('size_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'boxQuantity',
            label: this.translate.instant('boxQuantity_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('boxQuantity_TC'),
            }),
            value: this.siteToSite.boxQuantity,
            validation: {
              maxlength: 500,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('boxQuantity_TC'),
                char: this.translate.instant('five_hundred_number'),
              }),
            },
          },
        ],
      },
      {
        type: 'table',
        name: 'site_to_site_list',
        label: this.translate.instant('siteToSiteTransferList_TC'),
        formInitialise: { product: '', product_code: '', quantity: '', kit_number: '', batch_no: '', serial_no: '', temp: '', note: '' },
        columnSchema: ['productName_TC', 'productCode_TC', 'Quantity_TC', 'kit_no_TC', 'batch_no_TC', 'serial_TC', 'temperature_TC', 'note_TC'],
        onCancelForm: this.resetRow.bind(this),
        formSchema: [
          {
            type: 'dropdown',
            name: 'product',
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('productName_TC') }),
            options: this.product_list,
            optionLabel: "productName",
            optionValue: "id",
            onValueChange: this.onChangeProductValue.bind(this),
          },
          {
            type: 'input',
            name: 'product_code',
          },
          {
            name: 'quantity',
            type: 'input'
          },
          {
            name: 'kit_number',
            type: 'input'
          },
          {
            name: 'batch_no',
            type: 'input',
          },
          {
            name: 'serial_no',
            type: 'input'
          },
          {
            name: 'temp',
            type: 'input'
          },
          {
            name: 'note',
            type: 'input'
          },
        ],
        dataKey: 'id',
        dataSource: this.siteToSite.site_to_site_list || [],
      },
    ]
  }

  getFields() {
    return this.formFields;
  }

  resetRow(prevValue: any, tableValue: any) {
    return prevValue;
  }

  getProjectList() {
    this._projectService.getProjectList().subscribe((response) => {
      console.log('project list', response);
      if (response?.results) {
        this.projectList = response?.results;
        console.log('project list', this.projectList);
        this.setSiteToSiteCreationFields();
      }
    })
  }

  getProductList() {
    this._productSerive.getProductMasterList().subscribe(
      (response) => {
        console.log("check products", response);
        if (response?.results) {
          this.product_list = response?.results;
          console.log("product list", this.product_list)
          this.formFields[3].formSchema[0].options  = this.product_list
        }
      }
    )
  }

  getPartyList() {
    this._pratyService.getPartyMasterList().subscribe(
      (response) => {
        console.log("check results", response)
        if (response?.results) {
          this.partyList = response?.results;
          console.log("party list", this.partyList)
          this.setSiteToSiteCreationFields();
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
      tableValueUpdated.product_code = this.product_list.filter(e => e.id === value)[0]?.productCode;
    }
    return tableValueUpdated;
  }

  onChangeFromSitePartyValue(prevValue: any, value: any, formValue: any) {
    // console.log("check prevalue", prevValue)
    console.log("check value", value)
    // console.log("check formValue", formValue)
    console.log(this.formFields);
    const formValueUpdated: any = {};
    let object: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      object = this.partyList.filter(e => e.id === value)[0];
      console.log('From Site Object', object);
      formValueUpdated.fromPhone = object.phoneNumber;
      formValueUpdated.fromAddress = object.companyAddress;
    }
    return formValueUpdated;
  }

  onChangeToSitePartyValue(prevValue: any, value: any, formValue: any) {
    console.log("value", value)
    const formValueUpdated: any = {};
    let object: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      object = this.partyList.filter(e => e.id === value)[0];
      console.log('To Site Object', object);
      formValueUpdated.toAddress = object.companyAddress;
      formValueUpdated.toPhone = object.phoneNumber;
    }
    return formValueUpdated;
  }

  getSiteToSiteList() {
    this._siteToSiteService.getSiteToSiteList()
      .subscribe((response) => {
        console.log(response);
        if (response?.results) {
          this.siteToSiteList = response?.results;
          console.log("check site to site transfer",this.siteToSiteList)
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('siteToSiteCreation_TC')})
          // );
        }
      });
  }

  deleteSiteToSite(event: Event, siteToSite: SiteToSite) {
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
        this._siteToSiteService.removeSiteToSite(siteToSite?.id)
          .subscribe((response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {
                entity: '',
              })
            );
            this.getSiteToSiteList();
          });
      },
    });
  }

  editSiteToSite(siteToSite: SiteToSite) {
    console.log("siteToSite object", siteToSite)
    this.siteToSite = { ...siteToSite };
    this.setSiteToSiteCreationFields();
    this.showSiteToSiteModifier = true;
  }

  saveSiteToSite(siteToSite: SiteToSite) {
    console.log(siteToSite)
    if (this.siteToSite?.id) {
      siteToSite.id = this.siteToSite?.id;
    }
    this._siteToSiteService.siteToSiteModifier(siteToSite).subscribe((response) => {
        console.log(response);
        if (Object.keys(response).length != 0) {
          console.log('response', response);
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {
              entity: '',
            })
          );
          this.showSiteToSiteModifier = false;
          this.clearSiteToSite();
          this.getSiteToSiteList();
        }
      });
  }

  clearSiteToSite() {
    this.siteToSite = {};
    this.setSiteToSiteCreationFields();
  }

  generateFields() {
    this.printFields = [
      // {
      //   type: 'header',
      //   label_1: 'ფორმა 052_გადარიცხვები საიტიდან საიტზე',
      //   label_2: 'Form 052_Transfers from Site to Site',
      // },
      {
        type: 'sitetosite',
        value: this.siteToSiteObject,
      },
      // {
      //   type: 'footerheader',
      //   label_1: `დოკუმენტი / Document - ${this.siteToSiteObject['Document']}`,
      //   label_2: 'დამატებითი ინფორმაცია / Additional Information',
      // },
      // {
      //   type: 'footerbody',
      //   label_1: `<div  style='margin-bottom: 1px'>
      //   <p ><b>კურიერი / Courier :</b> &emsp;${this.siteToSiteObject['fromCourier']}  , <b>ხელმოწერა / Signature : ________________________</b></p>
      //   <p><b>საიტიდან / From Site : &emsp;</b>${this.siteToSiteObject['fromSiteName']} </p>
      //   <p><b>გადაცემის თარიღი / Transfer date :</b> &emsp;${this.siteToSiteObject['transferDate'] ? this.datePipe.transform(this.siteToSiteObject['transferDate'], 'yyyy-MM-dd') : ''} <b>, 
      //   დრო/Time :</b> &emsp;${this.siteToSiteObject['transferDate'] ? this.datePipe.transform(this.siteToSiteObject['transferDate'], 'hh:mm:ss a') : ''}</p>

      //   <p ><b>კურიერი / Courier :</b> &emsp;${this.siteToSiteObject['toCourier']}  , <b>ხელმოწერა / Signature : ________________________</b></p>
      //   <p><b>საიტზე / To Site : &emsp;</b>${this.siteToSiteObject['toSiteName']} </p>
      //   <p><b>Მიღების თარიღი / Delivery date :</b> &emsp;${this.siteToSiteObject['deliveryDate'] ? this.datePipe.transform(this.siteToSiteObject['deliveryDate'], 'yyyy-MM-dd') : ''} <b>, დრო/Time :</b> 
      //   &emsp;${this.siteToSiteObject['deliveryDate'] ? this.datePipe.transform(this.siteToSiteObject['deliveryDate'], 'hh:mm:ss a') : ''}</p>


      //   მიღებული პროდუქტი დაზიანებულია? (დიახ/არა) თუ „დიახ“ აღწერეთ/Is received product damaged?(Yes/No) if 'Yes' Describe:
      //   <hr>
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
      //   სსპ/SOP-25, ვერსია/Version-03, ფორმა/Form-052
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
    return this.printFields;
  }

  printSiteToSite(siteToSite: SiteToSite) {
    this.siteToSiteObject = siteToSite;
    this.showSiteToSitePrintModifier = true;
    this.generateFields();
  }

}
