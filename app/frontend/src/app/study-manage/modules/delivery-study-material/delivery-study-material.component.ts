import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { productMaster } from 'src/app/shared/models/product.model';
import { ProductMasterService } from 'src/app/master/modules/product-master-main-page/services/product-master.service';
import { PartyMaster } from 'src/app/shared/models/party.model';
import { PartyMasterService } from 'src/app/master/modules/party-master-main-page/services/party-master.service';
import { DeliveryStudyMaterialService } from './services/delivery-study-material.service';
import { StudyMaterialDelivery, study_material_delivery_list } from 'src/app/shared/models/studymanage.model';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';
import { ProjectCreation } from 'src/app/shared/models/project.model';
import { ProjectService } from 'src/app/project/modules/project-main-page/services/project.service';
import { WareHouseCreation } from 'src/app/shared/models/wareshouse.model';
import { WareshouseCreationService } from 'src/app/wareshouse/modules/warehouse-creation/services/wareshouse-creation.service';

@Component({
  selector: 'app-delivery-study-material',
  templateUrl: './delivery-study-material.component.html',
  styleUrls: ['./delivery-study-material.component.scss']
})
export class DeliveryStudyMaterialComponent implements OnInit {

  materialDelivery: StudyMaterialDelivery | any = {};
  materialDeliveryList: StudyMaterialDelivery[] = new Array<StudyMaterialDelivery>();
  selectedMaterialDelivery: StudyMaterialDelivery[] = new Array<StudyMaterialDelivery>();
  showStudyMaterialDeliveryModifier: boolean = false;
  study_material_Delivery_list: study_material_delivery_list[] = new Array<study_material_delivery_list>();
  product_list: productMaster[] = new Array<productMaster>();
  columns: any = [];
  formFields: any = [];
  partyList: PartyMaster[] = new Array<PartyMaster>();

  showStudyMaterialDeliveryPrintModifier: boolean = false;
  printFields: any = [];
  studyMaterialDeliveryObject = {};
  projectList: ProjectCreation[] = new Array<ProjectCreation>();
  wareHouseList: WareHouseCreation[] = new Array<WareHouseCreation>();

  constructor(public translate: TranslateService,
    private _sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private _productSerive: ProductMasterService,
    private _materialDeliveryService: DeliveryStudyMaterialService,
    private _pratyService: PartyMasterService,
    private _projectService: ProjectService,
    private _wareHouseService: WareshouseCreationService,
    private datePipe: DatePipe) { }
    

  ngOnInit(): void {
    this.getPartyList();
    this.getProductList();
    this.getStudyMaterialDeliveryList();
    this.setMaterialDeliveryTable();
    this.setMaterialDeliveryCreationFields();
    this.getProjectList();
    this.getWareHouseCreationList();
  }

  setMaterialDeliveryTable() {
    this.columns = [
      { field: 'supplier', label: 'supplierName_TC' },
      // { field: 'supplierAddress', label: 'supplierAddress_TC' },
      // { field: 'supplierPhone', label: 'supplierPhone_TC' },
      { field: 'recipient', label: 'recipientName_TC' },
      // { field: 'recipientAddress', label: 'recipientAddress_TC' },
      // { field: 'recipientPhone', label: 'recipientPhone_TC' },
      { field: 'Invoice', label: 'Invoice_TC' },
      // { field: 'localInvoice', label: 'localInvoice_TC' },
      // { field: 'orderNumber', label: 'orderNumber_TC' },
      // { field: 'AWB: string;', label: 'awb_TC' },
      // { field: 'Sponsor', label: 'sponsor_TC' },
      // { field: 'Protocol', label: 'portocol_TC' },
      { field: 'projectName', label: 'project_TC' },
      { field: 'Weight', label: 'weights_TC' },
      { field: 'Size', label: 'size_TC' },
      { field: 'boxQuantity', label: 'boxQuantity_TC' },
      // { field: 'study_material_delivery_list', label: 'study_material_delivery_list_TC' },
    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('studyMaterialDelivery_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('studyMaterialDelivery_TC') })
  }

  setMaterialDeliveryCreationFields() {
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
            value: this.materialDelivery.supplierName,
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
            value: this.materialDelivery.supplierPhone,
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
            name: 'supplierAddress',
            label: this.translate.instant('supplierAddress_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('supplierAddress_TC'),
            }),
            value: this.materialDelivery.supplierAddress,
            multiline: true,
            validation: {
              required: true,
              maxlength: 500,
            },
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('supplierAddress_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('supplierAddress_TC'),
                char: this.translate.instant('five_hundred_number'),
              }),
            },
          },
          // 
          {
            type: 'text',
            name: 'supplierCourier',
            label: this.translate.instant('courier_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('courier_TC'),
            }),
            value: this.materialDelivery.supplierCourier,
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
          //   value: this.materialDelivery.wareHouse,
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
            value: this.materialDelivery.warehouse,
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
            value: this.materialDelivery.withdrawalDate,
            showTime: true,
            selectionMode: 'single',
          },
          {
            type: 'text',
            name: 'Verification',
            label: this.translate.instant('verification_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('verification_TC'),
            }),
            value: this.materialDelivery.Verification,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('verification_TC'),
                char: this.translate.instant('fifty_number'),
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
            value: this.materialDelivery.recipientName,
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
          {
            type: 'text',
            name: 'recipientPhone',
            label: this.translate.instant('recipientPhone_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('recipientPhone_TC'),
            }),
            value: this.materialDelivery.recipientPhone,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('recipientPhone_TC'),
                char: this.translate.instant('fifty_number'),
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
            value: this.materialDelivery.recipientAddress,
            multiline: true,
            disabled: false,
            validation: {
              required: true,
              maxlength: 500,
            },
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('recipientAddress_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('recipientAddress_TC'),
                char: this.translate.instant('five_hundred_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'recipientCourier',
            label: this.translate.instant('courier_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('courier_TC'),
            }),
            value: this.materialDelivery.recipientCourier,
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
            value: this.materialDelivery.deliveryDate,
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
            name: 'Invoice',
            label: this.translate.instant('Invoice_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('Invoice_TC'),
            }),
            value: this.materialDelivery.Invoice,
            validation: {
              required: true,
              maxlength: 50,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('Invoice_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('Invoice_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'localInvoice',
            label: this.translate.instant('localInvoice_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('localInvoice_TC'),
            }),
            value: this.materialDelivery.localInvoice,
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
            name: 'orderNumber',
            label: this.translate.instant('orderNumber_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('orderNumber_TC'),
            }),
            value: this.materialDelivery.orderNumber,
            validation: {
              required: true,
              maxlength: 50,
            },
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('orderNumber_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('orderNumber_TC'),
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
            value: this.materialDelivery.AWB,
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
          //   value: this.materialDelivery.Sponsor,
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
            value: this.materialDelivery.sponsor,
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
            value: this.materialDelivery.Protocol,
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
          //   name: 'project',
          //   label: this.translate.instant('project_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('project_TC'),
          //   }),
          //   value: this.materialDelivery.project,
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
            value: this.materialDelivery.project,
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
            value: this.materialDelivery.Weight,
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
            value: this.materialDelivery.Size,
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
            value: this.materialDelivery.boxQuantity,
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
        name: 'study_material_delivery_list',
        label: this.translate.instant('study_material_delivery_list_TC'),
        formInitialise: { study_product: '', product_code: '', kit_number: '', batch_no: '', serial_no: '', quantity: '', validity: '', temp: '', receive_date: '', comment: '' },
        columnSchema: ['productName_TC', 'productCode_TC', 'kit_no_TC', 'batch_no_TC', 'serial_number_TC', 'Quantity_TC', 'Validity_TC', 'temperature_TC', 'receiveDate_TC', 'comment_TC'],
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
            name: 'validity',
            type: 'date'
          },
          {
            name: 'temp',
            type: 'input'
          },
          {
            name: 'receive_date',
            type: 'date'
          },
          {
            name: 'comment',
            type: 'input'
          }
        ],
        dataKey: 'id',
        // dataSource: this.studyMaterial?.study_material_return_list ? this.study_material_return_list : [],
        dataSource: this.materialDelivery.study_material_delivery_list || [],
      },
    ]
  }

  getFields() {
    return this.formFields;
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

  resetRow(prevValue: any, tableValue: any) {
    return prevValue;
  }

  onChangePartyValue(prevValue: any, value: any, formValue: any) {
    console.log("check prevalue", prevValue)
    console.log("check value", value)
    console.log("check formValue", formValue)
    console.log(this.formFields);
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

  getStudyMaterialDeliveryList() {
    this._materialDeliveryService.getDeliveryStudyMaterialList()
      .subscribe((response) => {
        console.log(response);
        if (response?.results) {
          this.materialDeliveryList = response?.results;
          console.log("check study material",this.materialDeliveryList)
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('materialReceipt_TC')})
          // );
        }
      });
  }

  deleteStudyMaterialDelivery(event: Event, studyMaterialDelivery: StudyMaterialDelivery) {
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
        this._materialDeliveryService
          .removeDeliveryStudyMaterial(studyMaterialDelivery?.id)
          .subscribe((response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {
                entity: '',
              })
            );
            this.getStudyMaterialDeliveryList();
          });
      },
    });
  }

  editMaterialDelivery(studyMaterialDelivery: StudyMaterialDelivery) {
    console.log("studyMaterialDelivery object", studyMaterialDelivery)
    this.materialDelivery = { ...studyMaterialDelivery };
    this.setMaterialDeliveryCreationFields();
    this.showStudyMaterialDeliveryModifier = true;
  }

  saveStudyMaterialDelivery(studyMaterialDelivery: StudyMaterialDelivery) {
    console.log(studyMaterialDelivery)
    if (this.materialDelivery?.id) {
      studyMaterialDelivery.id = this.materialDelivery?.id;
    }
    this._materialDeliveryService.deliveryStudyMaterialModifier(studyMaterialDelivery).subscribe((response) => {
        console.log(response);
        if (Object.keys(response).length != 0) {
          console.log('response', response);
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {
              entity: '',
            })
          );
          this.showStudyMaterialDeliveryModifier = false;
          this.clearStudyMaterialDelivery();
          this.getStudyMaterialDeliveryList();
        }
      });
  }

  clearStudyMaterialDelivery() {
    this.materialDelivery = {};
    this.setMaterialDeliveryCreationFields();
  }

  generateFields() {
    this.printFields = [
      // {
      //   type: 'header',
      //   label_1: 'ფორმა 047_სასწავლო მასალების მიწოდება',
      //   label_2: 'Form 047_Delivery of Study Materials',
      // },
      {
        type: 'studymaterialdelivery',
        value: this.studyMaterialDeliveryObject,
      },
      // {
      //   type: 'footerheader',
      //   label_1: `ინვოისი / Invoice - ${this.studyMaterialDeliveryObject['Invoice']}`,
      //   label_2: 'დამატებითი ინფორმაცია / Additional Information',
      // },
      // {
      //   type: 'footerbody',
      //   label_1: `<div  style='margin-bottom: 1px'>
      //   <p><b>კურიერი / Courier :</b> &emsp; ${this.studyMaterialDeliveryObject['supplierCourier']} , <b>ხელმოწერა / Signature : ________________________</b></p>
      //   <p><b>საწყობი / Warehouse :</b> &emsp; ${this.studyMaterialDeliveryObject['WareHouse'] ? this.studyMaterialDeliveryObject['WareHouse'] : ''} , <b>ხელმოწერა / Signature : ________________________</b></p>
      //   <p><b>გატანა თარიღი / Withdrawal date :</b> &emsp; ${this.studyMaterialDeliveryObject['withdrawalDate'] ? this.datePipe.transform(this.studyMaterialDeliveryObject['withdrawalDate'], 'yyyy-MM-dd') : ''} , 
      //   <b>დრო/Time :</b> &emsp; ${this.studyMaterialDeliveryObject['withdrawalDate'] ? this.datePipe.transform(this.studyMaterialDeliveryObject['withdrawalDate'], 'hh:mm:ss a') : ''}</p>
      //   <p><b>გადამოწმება / Verification :</b> &emsp; ${this.studyMaterialDeliveryObject['Verification']} , <b>ხელმოწერა / Signature : ________________________</b></p>

      //   <p ><b>კურიერი / Courier :</b> &emsp; ${this.studyMaterialDeliveryObject['recipientCourier']}  , <b>ხელმოწერა / Signature : ________________________</b></p>
      //   <p><b>მიმღები / Recipient :</b> &emsp; ${this.studyMaterialDeliveryObject['recipient']} , <b>ხელმოწერა / Signature : ________________________</b></p>
      //   <p><b>Მიღების თარიღი / Delivery date :</b> &emsp; ${this.studyMaterialDeliveryObject['deliveryDate'] ? this.datePipe.transform(this.studyMaterialDeliveryObject['deliveryDate'], 'yyyy-MM-dd') : ''} , 
      //   <b>დრო/Time :</b> &emsp; ${this.studyMaterialDeliveryObject['deliveryDate'] ? this.datePipe.transform(this.studyMaterialDeliveryObject['deliveryDate'], 'h:mm:ss a') : ''}</p>


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
      //   სსპ/SOP-06, ვერსია/Version-04, ფორმა/Form-047
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

  printStudyMaterialDelivery(studyMaterialDelivery: StudyMaterialDelivery) {
    this.studyMaterialDeliveryObject = studyMaterialDelivery;
    this.showStudyMaterialDeliveryPrintModifier = true;
    this.generateFields();
  }

}
