import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { productMaster } from 'src/app/shared/models/product.model';
import { ProductMasterService } from 'src/app/master/modules/product-master-main-page/services/product-master.service';
import { StudyMaterialExported, study_material_exported_list } from 'src/app/shared/models/studymanage.model';
import { ExportedStudyMaterialService } from './services/exported-study-material.service';
import { PartyMaster } from 'src/app/shared/models/party.model';
import { PartyMasterService } from 'src/app/master/modules/party-master-main-page/services/party-master.service';
import { DatePipe } from '@angular/common';
import { ProjectCreation } from 'src/app/shared/models/project.model';
import { WareHouseCreation } from 'src/app/shared/models/wareshouse.model';
import { ProjectService } from 'src/app/project/modules/project-main-page/services/project.service';
import { WareshouseCreationService } from 'src/app/wareshouse/modules/warehouse-creation/services/wareshouse-creation.service';

@Component({
  selector: 'app-exported-study-material',
  templateUrl: './exported-study-material.component.html',
  styleUrls: ['./exported-study-material.component.scss']
})
export class ExportedStudyMaterialComponent implements OnInit {

  studyMaterialExported: StudyMaterialExported | any = {};
  studyMaterialExportedList: StudyMaterialExported[] = new Array<StudyMaterialExported>();
  selectedStudyMaterialExported: StudyMaterialExported[] = new Array<StudyMaterialExported>();
  showStudyMaterialExportedModifier: boolean = false;
  study_material_exported_list: study_material_exported_list[] = new Array<study_material_exported_list>();
  product_list: productMaster[] = new Array<productMaster>();
  partyList: PartyMaster[] = new Array<PartyMaster>();

  columns: any = [];
  formFields: any = [];

  showStudyMaterialExportedPrintModifier: boolean = false;
  printFields: any = [];
  studyMaterialExportedObject = {};
  projectList: ProjectCreation[] = new Array<ProjectCreation>();
  wareHouseList: WareHouseCreation[] = new Array<WareHouseCreation>();

  constructor(public translate: TranslateService,
    private _sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private _productSerive: ProductMasterService,
    private _pratyService: PartyMasterService,
    private _studyMaterialExportedService: ExportedStudyMaterialService,
    private _projectService: ProjectService,
    private _wareHouseService: WareshouseCreationService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getProductList();
    this.getStudyMaterialExportedList();
    this.setMaterialDeliveryTable();
    this.setMaterialDeliveryCreationFields();
    this.getPartyList();
    this.getWareHouseCreationList();
    this.getProjectList();
  }

  setMaterialDeliveryTable() {
    this.columns = [
      { field: 'sender', label: 'senderName_TC' },
      // { field: 'senderAddress', label: 'address_TC' },
      // { field: 'senderPhone', label: 'phone_TC' },
      { field: 'recipient', label: 'recipientName_TC' },
      // { field: 'recipientAddress', label: 'address_TC' },
      // { field: 'recipientPhone', label: 'phone_TC' },
      { field: 'localInvoice', label: 'localInvoice_TC' },
      { field: 'AWB', label: 'awb_TC' },
      // { field: 'Sponsor', label: 'sponsor_TC' },
      { field: 'projectName', label: 'project_TC' },
      { field: 'Weight', label: 'weights_TC' },
      { field: 'Size', label: 'size_TC' },
      // { field: 'study_material_exported_list', label: 'studyMaterialExportedList_TC' },
    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('exportedStudyMaterialCreation_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('exportedStudyMaterialCreation_TC') })
  }

  setMaterialDeliveryCreationFields() {
    this.formFields = [
      {
        type: 'fieldset',
        headerText: this.translate.instant('senderDetails_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'senderName',
            label: this.translate.instant('name_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('name_TC'),
            }),
            value: this.studyMaterialExported.senderName,
            validation: {
              required: true,
            },
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            onValueChange: this.onChangeSenderPartyValue.bind(this),
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('name_TC') }),
            }
          },
          {
            type: 'text',
            name: 'senderPhone',
            label: this.translate.instant('phone_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('phone_TC'),
            }),
            value: this.studyMaterialExported.senderPhone,
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
            name: 'senderAddress',
            label: this.translate.instant('address_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('address_TC'),
            }),
            value: this.studyMaterialExported.senderAddress,
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

        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('recipientDetailsCreation_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'recipientName',
            label: this.translate.instant('name_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('name_TC'),
            }),
            value: this.studyMaterialExported.recipientName,
            validation: {
              required: true,
            },
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            onValueChange: this.onChangeRecipientPartyValue.bind(this),
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('name_TC') }),
            }
          },
          {
            type: 'text',
            name: 'recipientPhone',
            label: this.translate.instant('phone_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('phone_TC'),
            }),
            value: this.studyMaterialExported.recipientPhone,
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
            name: 'recipientAddress',
            label: this.translate.instant('address_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('address_TC'),
            }),
            value: this.studyMaterialExported.recipientAddress,
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
            name: 'localInvoice',
            label: this.translate.instant('localInvoice_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('localInvoice_TC'),
            }),
            value: this.studyMaterialExported.localInvoice,
            validation: {
              required: true,
              maxlength: 50,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('localInvoice_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('localInvoice_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'AWB',
            label: this.translate.instant('awb_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('awb_TC'),
            }),
            value: this.studyMaterialExported.AWB,
            validation: {
              // required: true,
              maxlength: 50,
            },
            errorText: {
              // required: this.translate.instant('formRequiredError_SC', {
              //   label: this.translate.instant('awb_TC'),
              // }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('awb_TC'),
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
          //   value: this.studyMaterialExported.Sponsor,
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
            value: this.studyMaterialExported.sponsor,
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
          // {
          //   type: 'text',
          //   name: 'Project',
          //   label: this.translate.instant('project_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('project_TC'),
          //   }),
          //   value: this.studyMaterialExported.Project,
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
            value: this.studyMaterialExported.project,
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
            value: this.studyMaterialExported.Weight,
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
            value: this.studyMaterialExported.Size,
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
            name: 'Courier',
            label: this.translate.instant('courier_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('courier_TC'),
            }),
            value: this.studyMaterialExported.Courier,
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
          // {
          //   type: 'text',
          //   name: 'wareHouse',
          //   label: this.translate.instant('waresHouseCreation_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('waresHouseCreation_TC'),
          //   }),
          //   value: this.studyMaterialExported.wareHouse,
          //   validation: {
          //     maxlength: 50,
          //   },
          //   errorText: {
          //     maxlength: this.translate.instant('formMaxLengthError_SC', {
          //       label: this.translate.instant('waresHouseCreation_TC'),
          //       char: this.translate.instant('fifty_number'),
          //     }),
          //   },
          // },
          {
            type: 'dropdown',
            name: 'warehouse',
            label: this.translate.instant('ware_house_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('ware_house_TC'),
            }),
            value: this.studyMaterialExported.warehouse,
            // validation: {
            //   required: true,
            // },
            options: this.wareHouseList,
            optionLabel: "wareHouseName",
            optionValue: "id",
            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('ware_house_TC') }),
            // }
          },
          {
            type: 'date',
            name: 'withdrawalDate',
            label: this.translate.instant('withdrawalDate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('withdrawalDate_TC'),
            }),
            value: this.studyMaterialExported.withdrawalDate,
            validation: {
              required: true,
            },
            showTime: true,
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('withdrawalDate_TC'),
              }),
            },
          },
          {
            type: 'text',
            name: 'Verification',
            label: this.translate.instant('verification_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('verification_TC'),
            }),
            value: this.studyMaterialExported.Verification,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('verification_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          }
        ],
      },
      {
        type: 'table',
        name: 'study_material_exported_list',
        label: this.translate.instant('exportedStudyMaterialList_TC'),
        formInitialise: { product: '', product_code: '', quantity: '', batch_no: '', serial_no: '', validity: '', temp: '', export_date: '', comment: '' },
        columnSchema: ['productName_TC', 'productCode_TC', 'Quantity_TC', 'batch_no_TC', 'serial_number_TC', 'Validity_TC', 'temperature_TC', 'exportDate_TC', 'comment_TC'],
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
            name: 'batch_no',
            type: 'input',
          },
          {
            name: 'serial_no',
            type: 'input'
          },
          {
            name: 'validity',
            type: 'date'
          },
          {
            name: 'temp',
            type: 'input'
          },
          {
            name: 'export_date',
            type: 'date'
          },
          {
            name: 'comment',
            type: 'input'
          }
        ],
        dataKey: 'id',
        dataSource: this.studyMaterialExported.study_material_exported_list || [],
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
        this.setMaterialDeliveryCreationFields();
      }
    })
  }

  getWareHouseCreationList() {
    this._wareHouseService.getWareHouseCreationList().subscribe(
      (response) => {
        if (response?.results) {
          this.wareHouseList = response?.results;
          console.log("warehouse list",this.wareHouseList)
          this.setMaterialDeliveryCreationFields();
        }
      }
    )
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
          this.setMaterialDeliveryCreationFields();
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

  onChangeSenderPartyValue(prevValue: any, value: any, formValue: any) {
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
      console.log('Sender Object', object);
      formValueUpdated.senderPhone = object.phoneNumber;
      formValueUpdated.senderAddress = object.companyAddress;
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
      console.log('Recipient Object', object);
      formValueUpdated.recipientAddress = object.companyAddress;
      formValueUpdated.recipientPhone = object.phoneNumber;
    }
    return formValueUpdated;
  }

  getStudyMaterialExportedList() {
    this._studyMaterialExportedService.getStudyMaterialExportedList()
      .subscribe((response) => {
        console.log(response);
        if (response?.results) {
          this.studyMaterialExportedList = response?.results;
          console.log("check study material exported",this.studyMaterialExportedList)
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('exportedStudyMaterialCreation_TC')})
          // );
        }
      });
  }

  deleteStudyMaterialExported(event: Event, studyMaterialExported: StudyMaterialExported) {
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
        this._studyMaterialExportedService.removeStudyMaterialExported(studyMaterialExported?.id)
          .subscribe((response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {
                entity: '',
              })
            );
            this.getStudyMaterialExportedList();
          });
      },
    });
  }

  editStudyMaterialExported(studyMaterialExported: StudyMaterialExported) {
    console.log("studyMaterialExported object", studyMaterialExported)
    this.studyMaterialExported = { ...studyMaterialExported };
    this.setMaterialDeliveryCreationFields();
    this.showStudyMaterialExportedModifier = true;
  }

  saveStudyMaterialExported(studyMaterialExported: StudyMaterialExported) {
    console.log(studyMaterialExported)
    if (this.studyMaterialExported?.id) {
      studyMaterialExported.id = this.studyMaterialExported?.id;
    }
    this._studyMaterialExportedService.studyMaterialExportedModifier(studyMaterialExported).subscribe((response) => {
        console.log(response);
        if (Object.keys(response).length != 0) {
          console.log('response', response);
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {
              entity: '',
            })
          );
          this.showStudyMaterialExportedModifier = false;
          this.clearStudyMaterialExported();
          this.getStudyMaterialExportedList();
        }
      });
  }

  clearStudyMaterialExported() {
    this.studyMaterialExported = {};
    this.setMaterialDeliveryCreationFields();
  }

  generateFields() {
    this.printFields = [
      // {
      //   type: 'header',
      //   label_1: 'ფორმა 050_ექსპორტირებული სასწავლო მასალის მიწოდების ფორმა',
      //   label_2: 'Form 050_Delivery Receipt Form of Exported Study Materials',
      // },
      {
        type: 'studymaterialexported',
        value: this.studyMaterialExportedObject,
      },
      // {
      //   type: 'footerheader',
      //   label_1: `ინვოისი / Invoice - ${this.studyMaterialExportedObject['localInvoice']}`,
      //   label_2: 'დამატებითი ინფორმაცია / Additional Information',
      // },
      // {
      //   type: 'footerbody',
      //   label_1: `<div  style='margin-bottom: 1px'>
      //   <p ><b>კურიერი / Courier :</b> &emsp;${this.studyMaterialExportedObject['Courier']} , <b>ხელმოწერა / Signature : ________________________</b></p>
      //   <p><b>საწყობი / Warehouse :</b> &emsp;${this.studyMaterialExportedObject['WareHouse'] ? this.studyMaterialExportedObject['WareHouse'] : ''} <b>, ხელმოწერა / Signature : ________________________</b></p>
      //   <p><b>გატანა თარიღი / Withdrawal date :</b> &emsp;${this.datePipe.transform(this.studyMaterialExportedObject['withdrawalDate'], 'yyyy-MM-dd')} <b>, დრო/Time :</b>&emsp;${this.datePipe.transform(this.studyMaterialExportedObject['withdrawalDate'], 'hh:mm:ss a')}</p>
      //   <p><b>გადამოწმება / Verification :</b> &emsp;${this.studyMaterialExportedObject['Verification']} <b>, ხელმოწერა / Signature :</b>________________________</p>

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
      //   სსპ/SOP-02, ვერსია/Version-02, ფორმა/Form-050
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

  printStudyMaterialExported(studyMaterialExported: StudyMaterialExported) {
    this.studyMaterialExportedObject = studyMaterialExported;
    this.showStudyMaterialExportedPrintModifier = true;
    this.generateFields();
  }

}
