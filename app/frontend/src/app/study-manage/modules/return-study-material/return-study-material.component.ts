import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { StudyMaterialReturn, study_material_return_list } from 'src/app/shared/models/studymanage.model';
import { productMaster } from 'src/app/shared/models/product.model';
import { ProductMasterService } from 'src/app/master/modules/product-master-main-page/services/product-master.service';
import { PartyMaster } from 'src/app/shared/models/party.model';
import { PartyMasterService } from 'src/app/master/modules/party-master-main-page/services/party-master.service';
import { ReturnStudyMaterialService } from './services/return-study-material.service';
import { DatePipe } from '@angular/common';
import { ProjectCreation } from 'src/app/shared/models/project.model';
import { ProjectService } from 'src/app/project/modules/project-main-page/services/project.service';

@Component({
  selector: 'app-return-study-material',
  templateUrl: './return-study-material.component.html',
  styleUrls: ['./return-study-material.component.scss']
})
export class ReturnStudyMaterialComponent implements OnInit {

  studyMaterial: StudyMaterialReturn | any = {};
  studyMaterialList: StudyMaterialReturn[] = new Array<StudyMaterialReturn>();
  selectedStudyMaterial: StudyMaterialReturn[] = new Array<StudyMaterialReturn>();
  showStudyMaterialReturnModifier: boolean = false;
  study_material_return_list: study_material_return_list[] = new Array<study_material_return_list>();
  product_list: productMaster[] = new Array<productMaster>();
  columns: any = [];
  formFields: any = [];
  partyList: PartyMaster[] = new Array<PartyMaster>();
  showmaterialReceiptPrintModifier: boolean = false;
  printFields: any = [];
  studyMaterialObject = {};
  projectList: ProjectCreation[] = new Array<ProjectCreation>();

  constructor(public translate: TranslateService,
    private _sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private _productSerive: ProductMasterService,
    private _studyMaterialReturnService: ReturnStudyMaterialService,
    private _pratyService: PartyMasterService,
    private _projectService: ProjectService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.setStudyMaterialReturnCreationFields();
    this.setStudyMaterialReturnTable();
    this.getStudyMaterialReturnList();
    this.getProductList();
    this.getPartyList();
    this.getProjectList();

  }

  setStudyMaterialReturnTable() {
    this.columns = [
      { field: 'supplier', label: 'supplierName_TC' },
      { field: 'recipient', label: 'recipientName_TC' },
      { field: 'Invoice', label: 'Invoice_TC' },
      { field: 'Weight', label: 'weights_TC' },
      { field: 'Size', label: 'size_TC' },
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
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('studymaterialreturnCreation_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('studymaterialreturnCreation_TC') })
  }

  setStudyMaterialReturnCreationFields() {
    this.formFields = [
      {
        type: 'fieldset',
        headerText: this.translate.instant('supplierDetailsCreation_TC'),
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
            value: this.studyMaterial.supplierName,
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
          {
            type: 'text',
            name: 'supplierPhone',
            label: this.translate.instant('supplierPhone_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('supplierPhone_TC'),
            }),
            value: this.studyMaterial.supplierPhone,
            readonly: false,
            validation: {
              maxlength: 30,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('supplierPhone_TC'),
                char: this.translate.instant('ten_number'),
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
            value: this.studyMaterial.supplierAddress,
            multiline: true,
            disabled: false,
            validation: {
              required: true,
            },
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('supplierAddress_TC'),
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
            label: this.translate.instant('recipientName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('recipientName_TC'),
            }),
            value: this.studyMaterial.recipientName,
            readonly: false,
            validation: {
              required: true,
            },
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            onValueChange: this.onChangeRecipientPartyValue.bind(this),
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('supplierName_TC') }),
            }
          },
          {
            type: 'text',
            name: 'recipientPhone',
            label: this.translate.instant('recipientPhone_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('recipientPhone_TC'),
            }),
            value: this.studyMaterial.recipientPhone,
            readonly: false,
            validation: {
              maxlength: 30,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('recipientPhone_TC'),
                char: this.translate.instant('ten_number'),
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
            value: this.studyMaterial.recipientAddress,
            multiline: true,
            disabled: false,
            validation: {
              required: true,
            },
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('recipientAddress_TC'),
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
            name: 'Invoice',
            label: this.translate.instant('Invoice_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('Invoice_TC'),
            }),
            value: this.studyMaterial.Invoice,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('Invoice_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('recipientName_TC'),
                char: this.translate.instant('one_number'),
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
            value: this.studyMaterial.numberOfPlace,
           
            disabled: false,
            validation: {
              required: true,
            },
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('noOfPlace_TC'),
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
          //   value: this.studyMaterial.Sponser,
          //   readonly: false,
          //   validation: {
          //     maxlength: 30,
          //   },
          //   // prefixGroupBy: true,
          //   // prefixGroupByIcon: 'pi-user',
          //   errorText: {
          //     maxlength: this.translate.instant('formMaxLengthError_SC', {
          //       label: this.translate.instant('sponsor_TC'),
          //       char: this.translate.instant('ten_number'),
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
            value: this.studyMaterial.sponsor,
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
            name: 'Weight',
            label: this.translate.instant('weight_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('weight_TC'),
            }),
            value: this.studyMaterial.Weight,
            readonly: false,
            validation: {
              maxlength: 30,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('weight_TC'),
                char: this.translate.instant('ten_number'),
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
            value: this.studyMaterial.Size,
            readonly: false,
            validation: {
              maxlength: 30,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('size_TC'),
                char: this.translate.instant('ten_number'),
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
          //   value: this.studyMaterial.Project,
          //   readonly: false,
          //   validation: {
          //     maxlength: 30,
          //   },
          //   // prefixGroupBy: true,
          //   // prefixGroupByIcon: 'pi-user',
          //   errorText: {
          //     maxlength: this.translate.instant('formMaxLengthError_SC', {
          //       label: this.translate.instant('project_TC'),
          //       char: this.translate.instant('ten_number'),
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
            value: this.studyMaterial.project,
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
            value: this.studyMaterial.Protocol,
            readonly: false,
            validation: {
              maxlength: 30,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('portocol_TC'),
                char: this.translate.instant('ten_number'),
              }),
            },
          },
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('additionalinformationCreation_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'Courier',
            label: this.translate.instant('courier_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('courier_TC'),
            }),
            value: this.studyMaterial.Courier,
            readonly: false,
            validation: {
              required: true,
              minlength: 1,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('courier_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('courier_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          // {
          //   type: 'text',
          //   name: 'Recipient',
          //   label: this.translate.instant('recipient_tc'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('recipient_tc'),
          //   }),
          //   value: this.studyMaterial.Recipient,
            
          //   disabled: false,
          //   validation: {
          //     required: true,
          //   },
          //   selectionMode: 'single',
          //   errorText: {
          //     required: this.translate.instant('formRequiredError_SC', {
          //       label: this.translate.instant('recipient_tc'),
          //     }),
          //   },
          // },
          {
            type: 'date',
            name: 'pickUpDate',
            label: this.translate.instant('pickUpDate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('pickUpDate_TC'),
            }),
            value: this.studyMaterial.pickUpDate,
            showTime: true,
            validation: {
              required: true,
              maxlength: 30,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('pickUpDate_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('pickUpDate_TC'),
                char: this.translate.instant('thirty_number'),
              }),
            },
          },
          // {
          //   type: 'date',
          //   name: 'pickUpTime',
          //   label: this.translate.instant('pickUpTime_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('pickUpTime_TC'),
          //   }),
          //   value: this.studyMaterial.pickUpTime,
          //   readonly: false,
          //   showTime: true,
          //   timeOnly:true,
          //   validation: {
          //     maxlength: 30,
          //   },
          //   // prefixGroupBy: true,
          //   // prefixGroupByIcon: 'pi-user',
          //   errorText: {
          //     maxlength: this.translate.instant('formMaxLengthError_SC', {
          //       label: this.translate.instant('pickUpTime_TC'),
          //       char: this.translate.instant('ten_number'),
          //     }),
          //   },
          // },
          {
            type: 'date',
            name: 'incomeDate',
            label: this.translate.instant('incomeDate_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('incomeDate_TC'),
            }),
            value: this.studyMaterial.incomeDate,
            showTime: true,
            validation: {
              required: true,
              maxlength: 30,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('incomeDate_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('incomeDate_TC'),
                char: this.translate.instant('thirty_number'),
              }),
            },
          },
          // {
          //   type: 'date',
          //   name: 'incomeTime',
          //   label: this.translate.instant('incomeTime_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('incomeTime_TC'),
          //   }),
          //   value: this.studyMaterial.incomeTime,
          //   readonly: false,
          //   timeOnly:true,
          //   showTime: true,
          //   validation: {
          //     maxlength: 30,
          //   },
          //   // prefixGroupBy: true,
          //   // prefixGroupByIcon: 'pi-user',
          //   errorText: {
          //     maxlength: this.translate.instant('formMaxLengthError_SC', {
          //       label: this.translate.instant('incomeTime_TC'),
          //       char: this.translate.instant('ten_number'),
          //     }),
          //   },
          // },
        ]
      },
      // {
      //   type: 'dropdown',
      //   name: 'storageZone',
      //   label: this.translate.instant('zoneName_TC'),
      //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('zoneName_TC') }),
      //   value: this.studyMaterial.storageZone,
      //   validation: {
      //     required: true,
      //     maxlength: 50,
      //   },
      //   onValueChange: this.onChangeStorageZoneValue.bind(this),
      //   options: this.storageZoneCreationList,
      //   optionLabel: "zoneName",
      //   optionValue: "id",
      //   errorText: {
      //     required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('zoneName_TC') }),
      //     maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('zoneName_TC'), char: this.translate.instant('fifty_number') }),
      //   }
      // },
      {
        type: 'table',
        name: 'study_material_return_list',
        label: this.translate.instant('returnStudyMaterialList_TC'),
        formInitialise: { study_product: '', product_code: '', kit_number: '', batch_no: '', serial_no: '', quantity: '', type: '', date: '', comment: '' },
        columnSchema: ['productName_TC', 'productCode_TC', 'kit_no_TC', 'batch_no_TC', 'serial_number_TC', 'Quantity_TC', 'type_TC', 'date_tc', 'comment_TC'],
        onCancelForm: this.resetRow.bind(this),
        formSchema: [
          {
            type: 'dropdown',
            name: 'study_product',
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
          },
          {
            name: 'type',
            type: 'input'
          },
          {
            name: 'date',
            type: 'date'
          },
          {
            name: 'comment',
            type: 'input'
          }
        ],
        dataKey: 'id',
        // dataSource: this.studyMaterial?.study_material_return_list ? this.study_material_return_list : [],
        dataSource: this.studyMaterial.study_material_return_list || [],

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
        this.setStudyMaterialReturnCreationFields();
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
          this.formFields[4].formSchema[0].options  = this.product_list
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
          this.setStudyMaterialReturnCreationFields();
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

  getStudyMaterialReturnList() {
    this._studyMaterialReturnService.getStudyMaterialReturnList()
      .subscribe((response) => {
        console.log(response);
        if (response?.results) {
          this.studyMaterialList = response?.results;
          console.log("check study material",this.studyMaterialList)
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('materialReceipt_TC')})
          // );
        }
      });
  }

  deleteStudyMaterialReturn(event: Event, studyMaterial: StudyMaterialReturn) {
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
        this._studyMaterialReturnService
          .removeStudyMaterialReturn(studyMaterial?.id)
          .subscribe((response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {
                entity: '',
              })
            );
            this.getStudyMaterialReturnList();
          });
      },
    });
  }

  editMaterialReturn(studyMaterial: StudyMaterialReturn) {
    console.log("material reciept", studyMaterial)
    // this.getShelfCreationList(zoneLevelID)
    // this.getZoneLevelCreationList(storageZoneID)
    // this.getStorageZoneCreationList(wareHouseID)
    this.studyMaterial = { ...studyMaterial };
    this.setStudyMaterialReturnCreationFields();
    // this.readOnly(this.studyMaterial.isApproved);
    this.showStudyMaterialReturnModifier = true;
  }

  saveStudyMaterialReturn(studyMaterial: StudyMaterialReturn) {
    console.log('study material return', studyMaterial);

    if (this.studyMaterial?.id) {
      studyMaterial.id = this.studyMaterial?.id;
    }
    this._studyMaterialReturnService.studyMaterialReturnModifier(studyMaterial).subscribe((response) => {
      
      
        console.log(response);
        if (Object.keys(response).length != 0) {
          console.log('response', response);
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {
              entity: '',
            })
          );
          this.showStudyMaterialReturnModifier = false;
          this.clearStudyMaterialReturn();
          this.getStudyMaterialReturnList();
        }
      });
  }

  clearStudyMaterialReturn() {
    this.studyMaterial = {};
    this.setStudyMaterialReturnCreationFields();
  }

  
  generateFields() {
    this.printFields = [
      // {
      //   type: 'header',
      //   label_1: 'ფორმა 051_სასწავლო მასალების დაბრუნება',
      //   label_2: 'Form 051_Return Of Study Materials',
      // },
      {
        type: 'studymaterialreturn',
        value: this.studyMaterialObject,
      },
      // {
      //   type: 'footerheader',
      //   label_1: `ინვოისი / Invoice - ${this.studyMaterialObject['Invoice']}`,
      //   // label_2: 'ადგილების რაოდ / No of Places -' + this.studyMaterialObject['numberOfPlace'],
      //   label_3: 'დამატებითი ინფორმაცია / Additional Information',
      // },
      // {
      //   type: 'footerbody',
      //   label_1: `<div  style='margin-bottom: 1px'>

      //   <p><b>კურიერი / Courier :</b> &emsp; ${this.studyMaterialObject['Courier']} , <b>ხელმოწერა / Signature : ________________________</b></p>
      //   <p><b>მიმღები / Recipient :</b> &emsp; ${this.studyMaterialObject['recipient']} , <b>ხელმოწერა / Signature : ________________________</b></p>
      //   <p><b>წამოღების თარიღი / Pickup date :</b> &emsp; ${this.datePipe.transform(this.studyMaterialObject['pickUpDate'], 'yyyy-MM-dd')}, <b>წამოღების დრო/Pickup Time : &emsp;${this.datePipe.transform(this.studyMaterialObject['pickUpDate'], 'hh:mm:ss a')}</b></p>
      //   <p><b>მიღების თარიღი / Income date :</b> &emsp; ${this.datePipe.transform(this.studyMaterialObject['incomeDate'], 'yyyy-MM-dd')}, <b>მიღების დრო/Income Time :  &emsp; ${this.datePipe.transform(this.studyMaterialObject['incomeDate'], 'hh:mm:ss a')}</b></p>
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
      //   სსპ/SOP-07, ვერსია/Version-04, ფორმა/Form-051
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
  printmaterialReceipt(studyMaterial: StudyMaterialReturn) {
    this.studyMaterialObject = studyMaterial;
    this.showmaterialReceiptPrintModifier = true;
    this.generateFields();
  }

}
