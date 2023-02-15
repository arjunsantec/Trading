import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { productMaster } from 'src/app/shared/models/product.model';
import { ProductMasterService } from 'src/app/master/modules/product-master-main-page/services/product-master.service';
import { ExpireDateChange, ExpireDateChangeDetails } from 'src/app/shared/models/studymanage.model';
import { ExpireDateChangeService } from './services/expire-date-change.service';
import { DatePipe } from '@angular/common';
import { ProjectCreation } from 'src/app/shared/models/project.model';
import { WareHouseCreation } from 'src/app/shared/models/wareshouse.model';
import { ProjectService } from 'src/app/project/modules/project-main-page/services/project.service';
import { WareshouseCreationService } from 'src/app/wareshouse/modules/warehouse-creation/services/wareshouse-creation.service';

@Component({
  selector: 'app-expire-date-change',
  templateUrl: './expire-date-change.component.html',
  styleUrls: ['./expire-date-change.component.scss']
})
export class ExpireDateChangeComponent implements OnInit {

  expireDateChange: ExpireDateChange | any = {};
  expireDateChangeList: ExpireDateChange[] = new Array<ExpireDateChange>();
  selectedExpireDateChange: ExpireDateChange[] = new Array<ExpireDateChange>();
  showExpireDateChangeModifier: boolean = false;
  expire_date_change_list: ExpireDateChangeDetails[] = new Array<ExpireDateChangeDetails>();
  product_list: productMaster[] = new Array<productMaster>();
  columns: any = [];
  formFields: any = [];

  showExpireDateChangePrintModifier: boolean = false;
  printFields: any = [];
  expireDateChangeObject = {};
  projectList: ProjectCreation[] = new Array<ProjectCreation>();
  wareHouseList: WareHouseCreation[] = new Array<WareHouseCreation>();

  constructor(public translate: TranslateService,
    private _sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private _productSerive: ProductMasterService,
    private _expireDateChangeService: ExpireDateChangeService,
    private _projectService: ProjectService,
    private _wareHouseService: WareshouseCreationService,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.getExpireDateChangeList();
    this.getProductList();
    this.setExpireDateChangeTable();
    this.setExpireDateChangeCreationFields();
    this.getProjectList();
    this.getWareHouseCreationList();
    console.log(this.formFields);
  }

  setExpireDateChangeTable() {
    this.columns = [
      { field: 'Document', label: 'document_TC' },
      { field: 'projectName', label: 'project_TC' },
      // { field: 'expire_date_change_list', label: 'expire_date_change_list_TC' },
    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('expireDateChangeCreation_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('expireDateChangeCreation_TC') })
  }

  setExpireDateChangeCreationFields() {
    this.formFields = [
      {
        type: 'text',
        name: 'Document',
        label: this.translate.instant('document_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', {
          label: this.translate.instant('document_TC'),
        }),
        value: this.expireDateChange.Document,
        validation: {
          maxlength: 50,
        },
        errorText: {
          maxlength: this.translate.instant('formMaxLengthError_SC', {
            label: this.translate.instant('document_TC'),
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
      //   value: this.expireDateChange.Project,
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
        value: this.expireDateChange.project,
        // required: true,
        // validation: {
        //   required: true,
        // },
        options: this.projectList,
        optionLabel: "projectName",
        optionValue: "id",
        onValueChange: this.onChangeProjectValue.bind(this),
      },
      // {
      //   type: 'text',
      //   name: 'wareHouse',
      //   label: this.translate.instant('waresHouseCreation_TC'),
      //   placeholder: this.translate.instant('formPlaceholder_SC', {
      //     label: this.translate.instant('waresHouseCreation_TC'),
      //   }),
      //   value: this.expireDateChange.wareHouse,
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
        value: this.expireDateChange.warehouse,
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
        name: 'movingDate',
        label: this.translate.instant('movingDate_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', {
          label: this.translate.instant('movingDate_TC'),
        }),
        value: this.expireDateChange.movingDate,
        validation: {
          required: true,
        },
        showTime: true,
        selectionMode: 'single',
        errorText: {
          required: this.translate.instant('formRequiredError_SC', {
            label: this.translate.instant('movingDate_TC'),
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
        value: this.expireDateChange.Verification,
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
      {
        type: 'table',
        name: 'expire_date_change_list',
        label: this.translate.instant('expire_date_change_list_TC'),
        formInitialise: { product: '', product_code: '', kit_number: '', batch_no: '', serial_no: '', quantity: '', existent_date: '', project: '', updated_date: '', comment: '' },
        columnSchema: ['productName_TC', 'productCode_TC', 'kit_no_TC', 'batch_no_TC', 'serial_number_TC', 'Quantity_TC', 'existentExpiryDate_TC', 'project_TC', 'updatedExpiryDate_TC', 'comment_TC'],
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
            name: 'existent_date',
            type: 'date'
          },
          // {
          //   type: 'dropdown',
          //   name: 'project',
          //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('project_TC') }),
          //   options: this.projectList,
          //   optionLabel: "projectName",
          //   optionValue: "id",
          // },
          {
            name: 'project',
            type: 'input'
          },
          {
            name: 'updated_date',
            type: 'date'
          },
          {
            name: 'comment',
            type: 'input'
          }
        ],
        dataKey: 'id',
        dataSource: this.expireDateChange.expire_date_change_list || [],
      },
    ]
  }

  getFields() {
    return this.formFields;
  }

  resetRow(prevValue: any, tableValue: any) {
    return prevValue;
  }

  getProductList() {
    this._productSerive.getProductMasterList().subscribe(
      (response) => {
        console.log("check products", response);
        if (response?.results) {
          this.product_list = response?.results;
          console.log("product list", this.product_list)
          this.formFields[5].formSchema[0].options = this.product_list
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
        this.setExpireDateChangeCreationFields();
      }
    })
  }

  getWareHouseCreationList() {
    this._wareHouseService.getWareHouseCreationList().subscribe(
      (response) => {
        if (response?.results) {
          this.wareHouseList = response?.results;
          console.log("warehouse list",this.wareHouseList)
          this.setExpireDateChangeCreationFields();
        }
      }
    )
  }

  onChangeProjectValue(prevValue: any, value: any, formValue: any) {
    console.log("value", value)
    if (value) {
      this._projectService.getProjectById(value).subscribe((response) => {
        console.log('project object', response.projectName);
        this.formFields[5].formInitialise.project = response.projectName;
        this.formFields[5].dataSource.forEach((element: any) => {
          element.project = response.projectName;
        });
      })

    }
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

  getExpireDateChangeList() {
    this._expireDateChangeService.getExpireDateChangeList()
      .subscribe((response) => {
        console.log(response);
        if (response?.results) {
          this.expireDateChangeList = response?.results;
          console.log("Expire Date Change",this.expireDateChangeList)
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('expireDateChangeCreation_TC')})
          // );
        }
      });
  }

  deleteExpireDateChange(event: Event, expireDateChange: ExpireDateChange) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', {
        entity: expireDateChange?.Document,
      }),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._expireDateChangeService.removeExpireDateChange(expireDateChange?.id)
          .subscribe((response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {
                entity: expireDateChange?.Document,
              })
            );
            this.getExpireDateChangeList();
          });
      },
    });
  }

  editExpireDateChange(expireDateChange: ExpireDateChange) {
    console.log("expireDateChange object", expireDateChange)
    this.expireDateChange = { ...expireDateChange };
    this.setExpireDateChangeCreationFields();
    this._projectService.getProjectById(expireDateChange.project.toString()).subscribe((response) => {
      console.log('project object', response.projectName);
      this.formFields[5].formInitialise.project = response.projectName;
    })
    this.showExpireDateChangeModifier = true;
  }

  saveExpireDateChange(expireDateChange: ExpireDateChange) {
    console.log(expireDateChange)
    if (this.expireDateChange?.id) {
      expireDateChange.id = this.expireDateChange?.id;
    }
    this._expireDateChangeService.expireDateChangeModifier(expireDateChange).subscribe((response) => {
        console.log(response);
        if (Object.keys(response).length != 0) {
          console.log('response', response);
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {
              entity: expireDateChange?.Document,
            })
          );
          this.showExpireDateChangeModifier = false;
          this.clearExpireDateChange();
          this.getExpireDateChangeList();
        }
      });
  }

  clearExpireDateChange() {
    this.expireDateChange = {};
    this.setExpireDateChangeCreationFields();
  }

  generateFields() {
    this.printFields = [
      // {
      //   type: 'header',
      //   label_1: 'ფორმა 067_ეტიკეტირება ვადის გასვლის თარიღის შეცვლის გამო',
      //   label_2: 'Form 067_Relabeling due to the Expire Date changing',
      // },
      {
        type: 'expiredatechange',
        value: this.expireDateChangeObject,
      },
      // {
      //   type: 'footerheader',
      //   label_1: `დოკუმენტი / Document - ${this.expireDateChangeObject['Document']}`,
      //   label_2: 'დამატებითი ინფორმაცია / Additional Information',
      // },
      // {
      //   type: 'footerbody',
      //   label_1: `<div  style='margin-bottom: 1px'>
      //   <p><b>საწყობი / Warehouse :</b> &emsp;${this.expireDateChangeObject['WareHouse'] ? this.expireDateChangeObject['WareHouse'] : ''} <b>, ხელმოწერა / Signature : ________________________</b></p>
      //   <p><b>გადაადგილების თარიღი / Moving date :</b> &emsp;${this.datePipe.transform(this.expireDateChangeObject['movingDate'], 'yyyy-MM-dd')}</p>
      //   <p><b>გადამოწმება / Verification :</b> &emsp;${this.expireDateChangeObject['Verification']} <b>, ხელმოწერა / Signature : ________________________</b></p>
      //   <p style="word-spacing:1px; font-size: medium;">
      //   სსპ/SOP-33, ვერსია/Version-01, ფორმა/Form-067
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

  printExpireDateChange(expireDateChange: ExpireDateChange) {
    this.expireDateChangeObject = expireDateChange;
    this.showExpireDateChangePrintModifier = true;
    this.generateFields();
  }

}
