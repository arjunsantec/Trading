import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ProductMasterService } from 'src/app/master/modules/product-master-main-page/services/product-master.service';
import { productMaster } from 'src/app/shared/models/product.model';
import { ProformaKitCreation, ProformaKitCreationDetails, ProjectCreation } from 'src/app/shared/models/project.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProjectService } from '../project-main-page/services/project.service';
import { KitCreationService } from './services/kit-creation.service';

@Component({
  selector: 'app-proforma-kit-creation',
  templateUrl: './proforma-kit-creation.component.html',
  styleUrls: ['./proforma-kit-creation.component.scss']
})
export class ProformaKitCreationComponent implements OnInit {
  columns: any = [];
  formFields: any = [];
  proformaKitCreation: ProformaKitCreation | any = {};
  proformaKitCreationList: ProformaKitCreation[] = new Array<ProformaKitCreation>();
  proformaKitCreationDetails: ProformaKitCreationDetails[] = new Array<ProformaKitCreationDetails>();
  showproformaKitCreationModifier: boolean = false;
  selectedproformaKitCreation: ProformaKitCreation[] = new Array<ProformaKitCreation>();
  projectList: ProjectCreation[] = new Array<ProjectCreation>();
  productList: productMaster[] = new Array<productMaster>();

  totalUnits: number = 0.0;
  grandTotal: number = 0.0;


  constructor(public translate: TranslateService,
    private _sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private _kitCreationService: KitCreationService,
    private _projectService: ProjectService,
    private _productService: ProductMasterService,) { }

  ngOnInit(): void {
    this.getProjectList();
    this.setKitCreationTable();
    this.getKitCreationList();
    this.setProformaKitCreationFields();
    this.getProductList();
  }


  setKitCreationTable() {
    this.columns = [
      { field: 'projectName', label: 'projectName_TC' },
      { field: 'kitName', label: 'kitName_TC' },
      { field: 'kitQTY', label: 'kitQTY_TC' },
      { field: 'kitValue', label: 'kitValue_TC' },

    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('proformKitCreation_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('proformKitCreation_TC') })
  }

  setProformaKitCreationFields() {
    this.formFields = [
      {
        type: 'text',
        name: 'kitName',
        label: this.translate.instant('kitName_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('kitName_TC') }),
        value: this.proformaKitCreation.kitName,
        validation: {
          required: true,
          maxlength: 150,
        },
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('kitName_TC') }),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('kitName_TC'), char: this.translate.instant('one_fifty_number') }),
        }
      },
      {
        type: 'text',
        name: 'kitQTY',
        label: this.translate.instant('kitQTY_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('kitQTY_TC') }),
        value: this.proformaKitCreation.kitQTY,
        validation: {
          required: true,
        },
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('kitQTY_TC') }),
        }
      },
      {
        type: 'text',
        name: 'kitValue',
        label: this.translate.instant('kitValue_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('kitValue_TC') }),
        value: this.proformaKitCreation.kitValue,
        validation: {
          required: true,
        },
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('kitValue_TC') }),
        }
      },
      {

        type: 'dropdown',
        name: 'project',
        label: this.translate.instant('projectName_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('projectName_TC') }),
        value: this.proformaKitCreation.project,
        validation: {
          required: true,
          maxlength: 50,
        },
        options: this.projectList,
        optionLabel: "projectName",
        optionValue: "id",
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('projectName_TC') }),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('projectName_TC'), char: this.translate.instant('fifty_number') }),
        }
      },
      {
        type: 'table',
        name: 'productList',
        label: this.translate.instant('addProducts_TC'),
        formInitialise: { product: '', productCode: '', unit: '', unitPrice: '', price: '' },
        columnSchema: ['productName_TC', 'productCode_TC', 'pcs/unit_TC', 'unit_price_TC', 'price_TC'],
        onValueChange: this.onChangeTableValue.bind(this),
        footerInitialise: [
          {
            name: ''
          },
          {
            name: 'Total'
          },
          {
            name: this.totalUnits
          },
          {
            name: ''
          },
          {
            name: this.grandTotal
          },
          {
            name: ''
          },
        ],
        tableFooter: true,
        onCancelForm: this.resetRow.bind(this),
        formSchema: [
          {
            type: 'dropdown',
            name: 'product',
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
            name: 'unit',
            type: 'number',
            onValueChange: this.onChangeUnitValue.bind(this),
          },
          {
            name: 'unitPrice',
            type: 'number'
          },
          {
            name: 'price',
            type: 'number'
          }

        ],
        dataKey: 'id',
        dataSource: this.proformaKitCreation.productList || [],


      },
      {
        type: 'text',
        name: 'totalUnits',
        label: this.translate.instant('documentNo_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('documentNo_TC') }),
        value: this.proformaKitCreation.totalUnits,
        hidden: true,
      },
      {
        type: 'text',
        name: 'totalPrice',
        label: this.translate.instant('documentNo_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('documentNo_TC') }),
        value: this.proformaKitCreation.totalPrice,
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

  getProjectList() {
    this._projectService.getProjectList().subscribe((response) => {
      if (response?.results) {
        this.projectList = response?.results;
        this.setProformaKitCreationFields();
      }
    })
  }

  clearKitCreation() {
    this.proformaKitCreation = {};
    this.setProformaKitCreationFields();
  }

  getKitCreationList() {
    this._kitCreationService.getKitCreationList().subscribe(
      (response) => {
        console.log("get list",response);
        if (response?.results) {
          this.proformaKitCreationList = response?.results;
        }
      }
    )
  }

  editKitCreation(kitCreation: ProformaKitCreation) {
    this.proformaKitCreation = { ...kitCreation };
    this.setProformaKitCreationFields();
    console.log("kit creation",kitCreation)
    this.onChangeTableValue(0, kitCreation.productList, kitCreation)
    this.showproformaKitCreationModifier = true;
  }

  deleteKitCreation(event: Event, kitCreation: ProformaKitCreation) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', { entity: kitCreation?.kitName }),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._kitCreationService.removeKitCreation(kitCreation?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', { entity: kitCreation?.kitName })
            );
            this.getKitCreationList();
          }
        )
      }
    });
  }

  saveProformaKitCreation(kitCreation: ProformaKitCreation) {
    if (this.proformaKitCreation?.id) {
      kitCreation.id = this.proformaKitCreation?.id;
    }
    this._kitCreationService.kitCreationModifier(kitCreation).subscribe(
      (response) => {
        console.log(response);
        if (Object.keys(response).length != 0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', { entity: kitCreation?.kitName })
          );
          this.showproformaKitCreationModifier = false;
          this.getKitCreationList();
          this.clearKitCreation();
        }
      }
    )
  }

  getProductList() {
    this._productService.getProductMasterList().subscribe(
      (response) => {
        console.log("check products", response);
        if (response?.results) {
          this.productList = response?.results;
          console.log("form fields", this.formFields)
          this.formFields[4].formSchema[0].options = this.productList
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
      tableValueUpdated.productCode = this.productList.filter(e => e.id === value)[0]?.productCode;
      tableValueUpdated.unitPrice = this.productList.filter(e => e.id === value)[0]?.unitPrice;
      tableValueUpdated.price = this.productList.filter(e => e.id === value)[0]?.unitPrice;
    }
    return tableValueUpdated;
  }

  onChangeTableValue(value: any, tableValue: any, formValue: any) {
    const formValueUpdated: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    console.log('form value', formValue);
    console.log('product list ', tableValue)

    tableValue.forEach(element => {
      this.totalUnits += Number(element.unit)
      this.grandTotal += Number(element.price)
    });
    this.formFields[4].footerInitialise = [
      {
        name: ''
      },
      {
        name: 'Total'
      },
      {
        name: this.totalUnits
      },
      {
        name: ''
      },
      {
        name: this.grandTotal
      },
      {
        name: ''
      },
    ]

    formValueUpdated.totalUnits = this.totalUnits;
    formValueUpdated.totalPrice = this.grandTotal;
    this.totalUnits = 0
    this.grandTotal = 0
    return formValueUpdated;
  }

  //row calculation 
  onChangeUnitValue(value: any, tableValue: any) {
    console.log('unit value', value);
    console.log("unit table value", tableValue)
    const tableValueUpdated: any = {};
    if (tableValue) {
      Object.assign(tableValueUpdated, tableValue);
    }

    if (value) {
      tableValueUpdated.price = tableValueUpdated.unit * tableValueUpdated.unitPrice;
    }
    return tableValueUpdated;
  }


}
