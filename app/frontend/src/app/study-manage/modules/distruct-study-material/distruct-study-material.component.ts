import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { productMaster } from 'src/app/shared/models/product.model';
import { ProductMasterService } from 'src/app/master/modules/product-master-main-page/services/product-master.service';
import { PartyMaster } from 'src/app/shared/models/party.model';
import { PartyMasterService } from 'src/app/master/modules/party-master-main-page/services/party-master.service';
import { StudyMaterialDestruction, study_material_destruction_list } from 'src/app/shared/models/studymanage.model';
import { DistructStudyMaterialService } from './services/distruct-study-material.service';
import { DatePipe } from '@angular/common';
import { ProjectCreation } from 'src/app/shared/models/project.model';
import { ProjectService } from 'src/app/project/modules/project-main-page/services/project.service';

@Component({
  selector: 'app-distruct-study-material',
  templateUrl: './distruct-study-material.component.html',
  styleUrls: ['./distruct-study-material.component.scss']
})
export class DistructStudyMaterialComponent implements OnInit {

  materialDistruction: StudyMaterialDestruction | any = {};
  materialDistructionList: StudyMaterialDestruction[] = new Array<StudyMaterialDestruction>();
  selectedMaterialDistruction: StudyMaterialDestruction[] = new Array<StudyMaterialDestruction>();
  showStudyMaterialDistructionModifier: boolean = false;
  study_material_destruction_list: study_material_destruction_list[] = new Array<study_material_destruction_list>();
  product_list: productMaster[] = new Array<productMaster>();
  columns: any = [];
  formFields: any = [];
  partyList: PartyMaster[] = new Array<PartyMaster>();

  showStudyMaterialDistructionPrintModifier: boolean = false;
  printFields: any = [];
  studyMaterialDistructionObject = {};
  projectList: ProjectCreation[] = new Array<ProjectCreation>();

  constructor(public translate: TranslateService,
    private _sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private _productSerive: ProductMasterService,
    private _materialDistructionService: DistructStudyMaterialService,
    private _pratyService: PartyMasterService,
    private _projectService: ProjectService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.setMaterialDistructionCreationFields();
    this.setMaterialDistructionTable();
    this.getMaterialDistructionList();
    this.getPartyList();
    this.getProductList();
    this.getProjectList();
    // console.log(this.formFields);
  }

  setMaterialDistructionTable() {
    this.columns = [
      { field: 'client', label: 'clientName_TC' },
      { field: 'serviceProvider', label: 'serviceProviderName_TC' },
      { field: 'Document', label: 'document_TC' },
      { field: 'fullWeight', label: 'fullWeight_TC' },
      { field: 'fullSize', label: 'fullSize_TC' },
      { field: 'Protocol', label: 'portocol_TC' },
      { field: 'projectName', label: 'project_TC' },
      // {field: 'zone_level_list', label: 'zone_level_list_TC'},
    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('studymaterialdistructCreation_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('studymaterialdistructCreation_TC') })
  }

  setMaterialDistructionCreationFields() {
    this.formFields = [
      {
        type: 'fieldset',
        headerText: this.translate.instant('clientdetails_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'clientName',
            label: this.translate.instant('clientName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('clientName_TC'),
            }),
            value: this.materialDistruction.clientName,
            validation: {
              required: true,
            },
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            onValueChange: this.onChangePartyValue.bind(this),
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('clientName_TC') }),
            }
          },
          {
            type: 'text',
            name: 'clientPhone',
            label: this.translate.instant('clientPhone_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('clientPhone_TC'),
            }),
            value: this.materialDistruction.clientPhone,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('supplierPhone_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'clientAddress',
            label: this.translate.instant('clientAddress_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('clientAddress_TC'),
            }),
            value: this.materialDistruction.clientAddress,
            multiline: true,
            validation: {
              required: true,
              maxlength: 500,
            },
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('clientAddress_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('supplierPhone_TC'),
                char: this.translate.instant('five_hundred_number'),
              }),
            },
          },

        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('serviceproviderdetails_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'serviceProviderName',
            label: this.translate.instant('serviceProviderName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('serviceProviderName_TC'),
            }),
            value: this.materialDistruction.serviceProviderName,
            validation: {
              required: true,
            },
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            onValueChange: this.onChangeRecipientPartyValue.bind(this),
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('serviceProviderName_TC') }),
            }
          },
          {
            type: 'text',
            name: 'serviceProviderPhone',
            label: this.translate.instant('serviceProviderPhone_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('serviceProviderPhone_TC'),
            }),
            value: this.materialDistruction.serviceProviderPhone,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('serviceProviderPhone_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'serviceProviderAddress',
            label: this.translate.instant('serviceProviderAddress_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('serviceProviderAddress_TC'),
            }),
            value: this.materialDistruction.serviceProviderAddress,
            multiline: true,
            disabled: false,
            validation: {
              required: true,
              maxlength: 500,
            },
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('serviceProviderAddress_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('supplierPhone_TC'),
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
            name: 'Document',
            label: this.translate.instant('document_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('document_TC'),
            }),
            value: this.materialDistruction.Document,
            validation: {
              required: true,
              maxlength: 50,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('document_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('recipientName_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'Site',
            label: this.translate.instant('site_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('site_TC'),
            }),
            value: this.materialDistruction.Site,
            validation: {
              required: true,
              maxlength: 50,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('site_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('site_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'numberOfPlace',
            label: this.translate.instant('noOfPlace_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('noOfPlace_TC'),
            }),
            value: this.materialDistruction.numberOfPlace,
            validation: {
              required: true,
              maxlength: 50,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('noOfPlace_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('noOfPlace_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          // {
          //   type: 'text',
          //   name: 'Sponser',
          //   label: this.translate.instant('sponsor_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('sponsor_TC'),
          //   }),
          //   value: this.materialDistruction.Sponser,
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
            value: this.materialDistruction.sponsor,
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
            name: 'fullWeight',
            label: this.translate.instant('fullWeight_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('fullWeight_TC'),
            }),
            value: this.materialDistruction.fullWeight,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('fullWeight_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'fullSize',
            label: this.translate.instant('fullSize_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('fullSize_TC'),
            }),
            value: this.materialDistruction.fullSize,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('fullSize_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          // {
          //   type: 'text',
          //   name: 'Project',
          //   label: this.translate.instant('projects_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('projects_TC'),
          //   }),
          //   value: this.materialDistruction.Project,
          //   validation: {
          //     maxlength: 50,
          //   },
          //   errorText: {
          //     maxlength: this.translate.instant('formMaxLengthError_SC', {
          //       label: this.translate.instant('projects_TC'),
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
            value: this.materialDistruction.project,
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
            name: 'Protocol',
            label: this.translate.instant('portocol_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('portocol_TC'),
            }),
            value: this.materialDistruction.Protocol,
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
          {
            type: 'text',
            name: 'testNote',
            label: this.translate.instant('testNote_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('testNote_TC'),
            }),
            value: this.materialDistruction.testNote,
            multiline: true,
            validation: {
              maxlength: 500,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('testNote_TC'),
                char: this.translate.instant('five_hundred_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'storageLogisticManager',
            label: this.translate.instant('storageLogisticManager_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('storageLogisticManager_TC'),
            }),
            value: this.materialDistruction.storageLogisticManager,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('storageLogisticManager_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'destructionProvider',
            label: this.translate.instant('destructionProvider_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('destructionProvider_TC'),
            }),
            value: this.materialDistruction.destructionProvider,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('destructionProvider_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'date',
            name: 'destructionDate',
            label: this.translate.instant('destructionDate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('destructionDate_TC'),
            }),
            value: this.materialDistruction.destructionDate,
            showTime: true,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('destructionDate_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
        ]
      },
      {
        type: 'table',
        name: 'study_material_destruction_list',
        label: this.translate.instant('destructStudyMaterialList_TC'),
        formInitialise: { destruction_product: '', product_code: '', kit_number: '', batch_no: '', serial_no: '', quantity: '', temp: '', expiry_date: '', note: '' },
        columnSchema: ['productName_TC', 'productCode_TC', 'kit_no_TC', 'batch_no_TC', 'serial_number_TC', 'Quantity_TC', 'temperature_TC', 'date_tc', 'comment_TC'],
        onCancelForm: this.resetRow.bind(this),
        formSchema: [
          {
            type: 'dropdown',
            name: 'destruction_product',
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
            name: 'quantity',
            type: 'input'
          }
          ,
          {
            name: 'temp',
            type: 'input'
          },
          {
            name: 'expiry_date',
            type: 'date'
          },
          {
            name: 'note',
            type: 'input'
          }
        ],
        dataKey: 'id',
        // dataSource: this.studyMaterial?.study_material_return_list ? this.study_material_return_list : [],
        dataSource: this.materialDistruction.study_material_destruction_list || [],

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
        this.setMaterialDistructionCreationFields();
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
          this.formFields[3].formSchema[0].options = this.product_list
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
          this.setMaterialDistructionCreationFields();
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
      formValueUpdated.clientPhone = object.phoneNumber;
      formValueUpdated.clientAddress = object.companyAddress;
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
      formValueUpdated.serviceProviderAddress = object.companyAddress;
      formValueUpdated.serviceProviderPhone = object.phoneNumber;
    }
    return formValueUpdated;

  }

  getMaterialDistructionList() {
    this._materialDistructionService.getStudyMaterialDistructionList()
      .subscribe((response) => {
        console.log(response);
        if (response?.results) {
          this.materialDistructionList = response?.results;
          console.log("check study material", this.materialDistructionList)
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('materialReceipt_TC')})
          // );
        }
      });
  }

  deleteMaterialDistruction(event: Event, materialDistruct: StudyMaterialDestruction) {
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
        this._materialDistructionService
          .removeStudyMaterialReturn(materialDistruct?.id)
          .subscribe((response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {
                entity: '',
              })
            );
            this.getMaterialDistructionList();
          });
      },
    });
  }

  editMaterialReturn(materialDistruct: StudyMaterialDestruction) {
    console.log("material reciept", materialDistruct)
    // this.getShelfCreationList(zoneLevelID)
    // this.getZoneLevelCreationList(storageZoneID)
    // this.getStorageZoneCreationList(wareHouseID)
    this.materialDistruction = { ...materialDistruct };
    this.setMaterialDistructionCreationFields();
    // this.readOnly(this.studyMaterial.isApproved);
    this.showStudyMaterialDistructionModifier = true;
  }

  saveStudyMaterialReturn(materialDistruct: StudyMaterialDestruction) {
    // console.log(materialReceipt)
    if (this.materialDistruction?.id) {
      materialDistruct.id = this.materialDistruction?.id;
    }
    this._materialDistructionService.studyMaterialReturnModifier(materialDistruct).subscribe(
      (response) => {
      console.log(response);
      if (Object.keys(response).length != 0) {
        console.log('response', response);
        this._sharedService.handleSuccess(
          this.translate.instant('entityUpdateSuccessTitle_TC', {
            entity: '',
          })
        );
        this.showStudyMaterialDistructionModifier = false;
        this.getMaterialDistructionList();
        this.clearStudyMaterialDistruct();
      }
    });
  }

  clearStudyMaterialDistruct() {
    this.materialDistruction = {};
    this.setMaterialDistructionCreationFields();
  }

  generateFields() {
    this.printFields = [
      // {
      //   type: 'header',
      //   label_1: 'ფორმა 053_სასწავლო მასალების განადგურება',
      //   label_2: 'Form 053_Destruction of Study Materials',
      // },
      {
        type: 'studymaterialdistruct',
        value: this.studyMaterialDistructionObject,
      },
      // {
      //   type: 'footerheader',
      //   label_1: `დოკუმენტი / Document - ${this.studyMaterialDistructionObject['Document']}`,
      //   label_2: 'დამატებითი ინფორმაცია / Additional Information',
      // },
      // {
      //   type: 'footerbody',
      //   label_1: `<div style='margin-bottom: 1px'>
      //   <p>შენახვის ლოგისტიკის მენეჯერი / Storage Logistic Manager : ${this.studyMaterialDistructionObject['storageLogisticManager']}</p>
      //   <p>განადგურების პროვაიდერი / Destruction provider : ${this.studyMaterialDistructionObject['destructionProvider']}</p>
      //   <p>განადგურების თარიღი / Destruction date : ${this.studyMaterialDistructionObject['destructionDate'] ? this.datePipe.transform(this.studyMaterialDistructionObject['destructionDate'], 'yyyy-MM-dd') : ''}</p>
      //   <p style="word-spacing:1px; font-size: medium;">
      //   სსპ / SOP-10 , ვერსია / Version-04, ფორმა / Form-053
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

  printMaterialDistruct(materialDistruct: StudyMaterialDestruction) {
    this.studyMaterialDistructionObject = materialDistruct;
    this.showStudyMaterialDistructionPrintModifier = true;
    this.generateFields();
  }

}
