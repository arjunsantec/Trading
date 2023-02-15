import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ProductCategory, ProductSubCategory } from 'src/app/shared/models/product.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProductCategoryService } from '../product-category-main-page/services/product-category.service';
import { ProductSubCategoryService } from './services/product-sub-category.service';

@Component({
  selector: 'app-product-subcategory-main-page',
  templateUrl: './product-subcategory-main-page.component.html',
  styleUrls: ['./product-subcategory-main-page.component.scss']
})
export class ProductSubcategoryMainPageComponent implements OnInit {

  productSubCategory: ProductSubCategory | any = {};
  productSubCategoryList: ProductSubCategory[] = new Array<ProductSubCategory>();
  selectedCompanies: ProductSubCategory[] = new Array<ProductSubCategory>();
  showProductSubCategoryModifier: boolean = false;

  productCategoryList: ProductCategory[] = new Array<ProductCategory>();

  fileSelected: any = '';

  formFields: any = [];
  columns: any = [];

  constructor(private _productCategoryService: ProductCategoryService,
    private _productSubCategoryService: ProductSubCategoryService,
    private _sharedService: SharedService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getProductCategoryList();
    this.getProductSubCategoryList();
    this.setProductSubCategoryTable();
    this.setProductSubCategoryFields();
  }

  setProductSubCategoryTable() {
    this.columns = [
      {field: 'categoryName', label: 'productCategoryLabel_TC'},
      {field: 'subCategoryName', label: 'subcat_nameLabel_TC'},
      {field: 'subCategoryCode', label: 'subcat_codeLabel_TC'},
      // {field: 'subcat_descriptions', label: 'subcat_descriptionsLabel_TC'},
      // {field: 'subcat_images', label: 'subcat_images_TC'},
      {field: 'created', label: 'created_TC'},
      {field: 'modified', label: 'modified_TC'},
    ]
  }

  globalSearch(event: any, dt: any){
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any){
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', {entity: this.translate.instant('productSubCategory_TC')})
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {entity: this.translate.instant('productSubCategory_TC')})
  }

  getProductCategoryList() {
    this._productCategoryService.getProductCategoryList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.productCategoryList = response?.results;
          this.setProductSubCategoryFields();
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('productCategory_TC')})
          // );
        }
      }
    )
  }

  setProductSubCategoryFields() {
    this.formFields = [
      {
        type: 'dropdown',
        name: 'productCategory',
        label: this.translate.instant('productCategoryLabel_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('productCategoryLabel_TC')}),
        value: this.productSubCategory.productCategory,
        validation: {
          required: true
        },
        options: this.productCategoryList,
        optionLabel: "categoryName",
        optionValue: "id",
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('productCategoryLabel_TC')})
        }
      },
      // {
      //   type: 'text',
      //   name: 'category',
      //   label: this.translate.instant('categoryLabel_TC'),
      //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('categoryLabel_TC')}),
      //   value: this.productSubCategory.category,
      //   validation: {
      //     required: true
      //   },
      //   keyFilter: "int",
      //   errorText: {
      //     required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('categoryLabel_TC')})
      //   }
      // },
      {
        type: 'text',
        name: 'subCategoryName',
        label: this.translate.instant('subcat_nameLabel_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('subcat_nameLabel_TC')}),
        value: this.productSubCategory.subCategoryName,
        validation: {
          required: true,
          maxlength: 100
        },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('subcat_nameLabel_TC')}),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('subcat_nameLabel_TC'), char: this.translate.instant('hundred_number')})
        }
      },
      {
        type: 'text',
        name: 'subCategoryCode',
        label: this.translate.instant('subcat_codeLabel_TC'),
        placeholder: this.translate.instant('autoGenerate_TC', { label: this.translate.instant('subcat_codeLabel_TC')}),
        value: this.productSubCategory.subCategoryCode,
        readonly:'readonly',
        // validation: {
        //   maxlength: 30
        // },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        // errorText: {
        //   maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('subcat_codeLabel_TC'), char: this.translate.instant('thirty_number')})
        // }
      },
      {
        type: 'text',
        name: 'subcat_descriptions',
        label: this.translate.instant('subcat_descriptionsLabel_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('subcat_descriptionsLabel_TC')}),
        value: this.productSubCategory.subcat_descriptions,
        multiline: true
      },
      {
        type: 'file',
        name: 'subcat_images',
        label: this.translate.instant('subcat_images_TC'),
        value: this.productSubCategory.subcat_images,
        fileType: 'image/*',
        onUpload: this.onUpload.bind(this)
      },
    ];
  }

  getFields() {
    return this.formFields;
  }

  getProductSubCategoryList() {
    this._productSubCategoryService.getProductSubCategoryList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.productSubCategoryList = response?.results;
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('productSubCategory_TC')})
          // );
        }
      }
    )
  }

  // deleteSelectedCompanies(event: Event) {
  //   if (event.defaultPrevented) return;
  //   event.preventDefault();
  //   this.confirmationService.confirm({
  //     target: event.currentTarget || undefined,
  //     message: this.translate.instant('entityDeleteSelectedItems_SC', {entity: this.translate.instant('productSubCategories_TC')}),
  //     header: this.translate.instant('confirm_TC'),
  //     icon: 'pi pi-exclamation-triangle',
  //     key: 'deleteSelectedItem',
  //     accept: () => {
  //       this._productSubCategoryService.removeProductSubCategory('productSubCategory.categoryName').subscribe(
  //         (response) => {
  //           console.log(response);
  //           if (response?.results) {
  //             this.productSubCategoryList = response?.results;
  //             this._sharedService.handleSuccess(
  //               this.translate.instant('entityDeleteSelectedCompaniesSuccessTitle_TC', {entity: this.translate.instant('productSubCategories_TC')})
  //             );
  //           }
  //         }
  //       )
  //     }
  //   });
  // }

  editProductSubCategory(productSubCategory: ProductSubCategory) {
    this.productSubCategory = { ...productSubCategory };
    this.setProductSubCategoryFields();
    this.showProductSubCategoryModifier = true;
  }

  deleteProductSubCategory(event: Event, productSubCategory: ProductSubCategory) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', {entity: productSubCategory?.subCategoryName}),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._productSubCategoryService.removeProductSubCategory(productSubCategory?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {entity: productSubCategory?.subCategoryName})
            );
            this.getProductSubCategoryList();
          }
        )
      }
    });
  }

  saveProductSubCategory(productSubCategory: ProductSubCategory) {
    // this.showProductSubCategoryModifier = false;
    const formData = new FormData();
    formData.append("productCategory", productSubCategory?.productCategory.toString());
    formData.append("subCategoryName", productSubCategory?.subCategoryName);
    formData.append("subCategoryCode", productSubCategory?.subCategoryCode);
    formData.append("subcat_descriptions", productSubCategory?.subcat_descriptions);
    formData.append("subcat_images", this.fileSelected);
    if(this.productSubCategory?.id) {
      productSubCategory.id = this.productSubCategory?.id;
      formData.append('id', this.productSubCategory?.id);
      // this.clearProductSubCategory();
    }
    this._productSubCategoryService.productSubCategoryModifier(formData).subscribe(
      (response) => {
        console.log(response);
        
          if (Object.keys(response).length != 0) { 
          
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {entity: productSubCategory?.subCategoryName})
          );
          this.showProductSubCategoryModifier = false;
          this.clearProductSubCategory();
          this.fileSelected = '';
          this.getProductSubCategoryList();
        }
      }
    )
  }

  onUpload(event: any) {
    if (event) {
      this.fileSelected = event[0];
    }
  }

  clearProductSubCategory() {
    this.productSubCategory = {};
    this.setProductSubCategoryFields();
  }
}
