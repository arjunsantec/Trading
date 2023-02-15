import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { productMaster } from 'src/app/shared/models/product.model';
import { ProductMasterService } from 'src/app/master/modules/product-master-main-page/services/product-master.service';
import { DeliverySitePatient, delivery_site_patient_list } from 'src/app/shared/models/studymanage.model';
import { DeliverySiteToPatientService } from './services/delivery-site-to-patient.service';
import { DatePipe } from '@angular/common';
import { PartyMaster } from 'src/app/shared/models/party.model';
import { PartyMasterService } from 'src/app/master/modules/party-master-main-page/services/party-master.service';
import { ProjectCreation } from 'src/app/shared/models/project.model';
import { ProjectService } from 'src/app/project/modules/project-main-page/services/project.service';

@Component({
  selector: 'app-delivery-site-to-patient',
  templateUrl: './delivery-site-to-patient.component.html',
  styleUrls: ['./delivery-site-to-patient.component.scss']
})
export class DeliverySiteToPatientComponent implements OnInit {

  deliverySiteToPatient: DeliverySitePatient | any = {};
  deliverySiteToPatientList: DeliverySitePatient[] = new Array<DeliverySitePatient>();
  selectedDeliverySiteToPatient: DeliverySitePatient[] = new Array<DeliverySitePatient>();
  showDeliverySiteToPatientModifier: boolean = false;
  delivery_site_patient_list: delivery_site_patient_list[] = new Array<delivery_site_patient_list>();
  product_list: productMaster[] = new Array<productMaster>();
  partyList: PartyMaster[] = new Array<PartyMaster>();

  columns: any = [];
  formFields: any = [];

  showDeliverySiteToPatientPrintModifier: boolean = false;
  printFields: any = [];
  deliverySiteToPatientObject = {};
  projectList: ProjectCreation[] = new Array<ProjectCreation>();

  constructor(public translate: TranslateService,
    private _sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private _productSerive: ProductMasterService,
    private _deliverySiteToPatientService: DeliverySiteToPatientService,
    private _pratyService: PartyMasterService,
    private _projectService: ProjectService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.setDeliverySiteToPatientTable();
    this.getProductList();
    this.setDeliverySiteToPatientCreationFields();
    this.getDeliverySiteToPatientList();
    this.getPartyList();
    this.getProjectList();
    // console.log(this.formFields);
  }

  setDeliverySiteToPatientTable() {
    this.columns = [
      { field: 'site', label: 'siteName_TC' },
      // { field: 'siteAddress', label: 'siteAddress_TC' },
      // { field: 'sitePhone', label: 'sitePhone_TC' },
      { field: 'patient', label: 'patientName_TC' },
      // { field: 'patientAddress', label: 'patientAddress_TC' },
      // { field: 'patientPhone', label: 'patientPhone_TC' },
      { field: 'Document', label: 'document_TC' },
      // { field: 'Sponsor', label: 'sponsor_TC' },
      // { field: 'Protocol', label: 'portocol_TC' },
      { field: 'projectName', label: 'project_TC' },
      { field: 'Weight', label: 'weights_TC' },
      { field: 'Size', label: 'size_TC' },
      { field: 'boxQuantity', label: 'boxQuantity_TC' },
      // { field: 'delivery_site_patient_list', label: 'delivery_site_patient_list_TC' },
    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('deliverySiteToPatient_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('deliverySiteToPatient_TC') })
  }

  setDeliverySiteToPatientCreationFields() {
    this.formFields = [
      {
        type: 'fieldset',
        headerText: this.translate.instant('siteDetails_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'siteName',
            label: this.translate.instant('siteName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('siteName_TC'),
            }),
            value: this.deliverySiteToPatient.siteName,
            validation: {
              required: true,
            },
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            onValueChange: this.onChangeSitePartyValue.bind(this),
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('siteName_TC') }),
            }
          },
          {
            type: 'text',
            name: 'sitePhone',
            label: this.translate.instant('sitePhone_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('sitePhone_TC'),
            }),
            value: this.deliverySiteToPatient.sitePhone,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('sitePhone_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'siteAddress',
            label: this.translate.instant('siteAddress_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('siteAddress_TC'),
            }),
            value: this.deliverySiteToPatient.siteAddress,
            multiline: true,
            validation: {
              required: true,
              maxlength: 500,
            },
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('siteAddress_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('siteAddress_TC'),
                char: this.translate.instant('five_hundred_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'siteCourier',
            label: this.translate.instant('courier_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('courier_TC'),
            }),
            value: this.deliverySiteToPatient.siteCourier,
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
            value: this.deliverySiteToPatient.transferDate,
            showTime: true,
            selectionMode: 'single',
          },
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('patientDetails_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'patientName',
            label: this.translate.instant('patientName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('patientName_TC'),
            }),
            value: this.deliverySiteToPatient.patientName,
            validation: {
              required: true,
            },
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            onValueChange: this.onChangePatientPartyValue.bind(this),
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('patientName_TC') }),
            }
          },
          {
            type: 'text',
            name: 'patientPhone',
            label: this.translate.instant('patientPhone_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('patientPhone_TC'),
            }),
            value: this.deliverySiteToPatient.patientPhone,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('patientPhone_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'patientAddress',
            label: this.translate.instant('patientAddress_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('patientAddress_TC'),
            }),
            value: this.deliverySiteToPatient.patientAddress,
            multiline: true,
            disabled: false,
            validation: {
              required: true,
              maxlength: 500,
            },
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('patientAddress_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('patientAddress_TC'),
                char: this.translate.instant('five_hundred_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'patientCourier',
            label: this.translate.instant('courier_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('courier_TC'),
            }),
            value: this.deliverySiteToPatient.patientCourier,
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
            value: this.deliverySiteToPatient.deliveryDate,
            showTime: true,
            selectionMode: 'single',
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
            value: this.deliverySiteToPatient.Document,
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
          //   value: this.deliverySiteToPatient.Sponsor,
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
            value: this.deliverySiteToPatient.sponsor,
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
            value: this.deliverySiteToPatient.Protocol,
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
          //   value: this.deliverySiteToPatient.Project,
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
            value: this.deliverySiteToPatient.project,
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
            value: this.deliverySiteToPatient.Weight,
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
            value: this.deliverySiteToPatient.Size,
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
            value: this.deliverySiteToPatient.boxQuantity,
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
        name: 'delivery_site_patient_list',
        label: this.translate.instant('delivery_site_patient_list_TC'),
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
        dataSource: this.deliverySiteToPatient.delivery_site_patient_list || [],
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
        this.setDeliverySiteToPatientCreationFields();
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
          this.setDeliverySiteToPatientCreationFields();
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

  onChangeSitePartyValue(prevValue: any, value: any, formValue: any) {
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
      console.log('Site Object', object);
      formValueUpdated.sitePhone = object.phoneNumber;
      formValueUpdated.siteAddress = object.companyAddress;
    }
    return formValueUpdated;
  }

  onChangePatientPartyValue(prevValue: any, value: any, formValue: any) {
    console.log("value", value)
    const formValueUpdated: any = {};
    let object: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      object = this.partyList.filter(e => e.id === value)[0];
      console.log('Patient Object', object);
      formValueUpdated.patientAddress = object.companyAddress;
      formValueUpdated.patientPhone = object.phoneNumber;
    }
    return formValueUpdated;
  }

  getDeliverySiteToPatientList() {
    this._deliverySiteToPatientService.getDeliverySiteToPatientList()
      .subscribe((response) => {
        console.log(response);
        if (response?.results) {
          this.deliverySiteToPatientList = response?.results;
          console.log("check site to patient delivery",this.deliverySiteToPatientList)
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('deliverySiteToPatient_TC')})
          // );
        }
      });
  }

  deleteDeliverySiteToPatient(event: Event, deliverySiteToPatient: DeliverySitePatient) {
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
        this._deliverySiteToPatientService.removeDeliverySiteToPatient(deliverySiteToPatient?.id)
          .subscribe((response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {
                entity: '',
              })
            );
            this.getDeliverySiteToPatientList();
          });
      },
    });
  }

  editDeliverySiteToPatient(deliverySiteToPatient: DeliverySitePatient) {
    console.log("deliverySiteToPatient object", deliverySiteToPatient)
    this.deliverySiteToPatient = { ...deliverySiteToPatient };
    this.setDeliverySiteToPatientCreationFields();
    this.showDeliverySiteToPatientModifier = true;
  }

  saveDeliverySiteToPatient(deliverySiteToPatient: DeliverySitePatient) {
    console.log(deliverySiteToPatient)
    if (this.deliverySiteToPatient?.id) {
      deliverySiteToPatient.id = this.deliverySiteToPatient?.id;
    }
    this._deliverySiteToPatientService.deliverySiteToPatientModifier(deliverySiteToPatient).subscribe((response) => {
        console.log(response);
        if (Object.keys(response).length != 0) {
          console.log('response', response);
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {
              entity: '',
            })
          );
          this.showDeliverySiteToPatientModifier = false;
          this.clearDeliverySiteToPatient();
          this.getDeliverySiteToPatientList();
        }
      });
  }

  clearDeliverySiteToPatient() {
    this.deliverySiteToPatient = {};
    this.setDeliverySiteToPatientCreationFields();
  }

  generateFields() {
    this.printFields = [
      // {
      //   type: 'header',
      //   label_1: 'ფორმა 063_მიწოდება საიტიდან პაციენტამდე',
      //   label_2: 'Form 063_Delivery from Site to patient',
      // },
      {
        type: 'deliverysitetopatient',
        value: this.deliverySiteToPatientObject,
      },
      // {
      //   type: 'footerheader',
      //   label_1: `დოკუმენტი / Document - ${this.deliverySiteToPatientObject['Document']}`,
      //   label_2: 'დამატებითი ინფორმაცია / Additional Information',
      // },
      // {
      //   type: 'footerbody',
      //   label_1: `<div  style='margin-bottom: 1px'>
      //   <p ><b>კურიერი / Courier :</b> &emsp;${this.deliverySiteToPatientObject['siteCourier']}  , <b>ხელმოწერა / Signature : ________________________</b></p>
      //   <p><b>საიტიდან / From Site :</b>&emsp; ${this.deliverySiteToPatientObject['site']} </p>
      //   <p><b>გადაცემის თარიღი / Transfer date :</b> &emsp;
      //   ${this.deliverySiteToPatientObject['transferDate'] ? this.datePipe.transform(this.deliverySiteToPatientObject['transferDate'], 'yyyy-MM-dd') : ''} <b>, 
      //   დრო/Time :</b> &emsp;${this.deliverySiteToPatientObject['transferDate'] ? this.datePipe.transform(this.deliverySiteToPatientObject['transferDate'], 'hh:mm:ss a') : ''}</p>

      //   <p ><b>კურიერი / Courier :</b> &emsp;${this.deliverySiteToPatientObject['patientCourier']}  , <b>ხელმოწერა / Signature : ________________________</b></p>
      //   <p><b>მიმღები / Receiver :</b>&emsp; ${this.deliverySiteToPatientObject['patient']} </p>
      //   <p><b>Მიღების თარიღი / Delivery date :</b> &emsp;${this.deliverySiteToPatientObject['deliveryDate'] ? this.datePipe.transform(this.deliverySiteToPatientObject['deliveryDate'], 'yyyy-MM-dd') : ''} <b>, დრო/Time :</b> 
      //   &emsp;${this.deliverySiteToPatientObject['deliveryDate'] ? this.datePipe.transform(this.deliverySiteToPatientObject['deliveryDate'], 'hh:mm:ss a') : ''}</p>


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
      //   სსპ/SOP-31, ვერსია/Version-03, ფორმა/Form-063
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

  printDeliverySiteToPatient(deliverySiteToPatient: DeliverySitePatient) {
    this.deliverySiteToPatientObject = deliverySiteToPatient;
    this.showDeliverySiteToPatientPrintModifier = true;
    this.generateFields();
  }

}
