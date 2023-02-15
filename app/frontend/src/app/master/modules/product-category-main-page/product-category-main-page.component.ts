import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ProductCategory } from 'src/app/shared/models/product.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProductCategoryService } from './services/product-category.service';

@Component({
  selector: 'app-product-category-main-page',
  templateUrl: './product-category-main-page.component.html',
  styleUrls: ['./product-category-main-page.component.scss']
})
export class ProductCategoryMainPageComponent implements OnInit {

  productCategory: ProductCategory | any = {};
  productCategoryList: ProductCategory[] = new Array<ProductCategory>();
  selectedCompanies: ProductCategory[] = new Array<ProductCategory>();
  showProductCategoryModifier: boolean = false;
  fileSelected: any = '';
  formFields: any = [];
  columns: any = [];

  constructor(private _productCategoryService: ProductCategoryService,
    private _sharedService: SharedService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getProductCategoryList();
    this.setProductCategoryTable();
    this.setProductCategoryFields();
  }

  setProductCategoryTable() {
    this.columns = [
      { field: 'categoryName', label: 'categoryNameLabel_TC' },
      // {field: 'images', label: 'imagesLabel_TC'},
      { field: 'categoryCode', label: 'categoryCodeLabel_TC' },
      // {field: 'categoryDescriptions', label: 'categoryDescriptionsLabel_TC'},
      {field: 'created', label: 'created_TC'},
      {field: 'modified', label: 'modified_TC'},
    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('productCategory_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('productCategory_TC') })
  }

  setProductCategoryFields() {
    this.formFields = [
      {
        type: 'text',
        name: 'categoryName',
        label: this.translate.instant('categoryNameLabel_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('categoryNameLabel_TC') }),
        value: this.productCategory.categoryName,
        validation: {
          required: true,
          minlength: 1,
          maxlength: 100,
        },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('categoryNameLabel_TC') }),
          minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('categoryNameLabel_TC'), char: this.translate.instant('one_number') }),
          maxlength: this.translate.instant('formMaxLengthError_SC', { label: this.translate.instant('categoryNameLabel_TC'),
            char: this.translate.instant('hundred_number'),
          }),
        }
      },
      {
        type: 'text',
        name: 'categoryCode',
        label: this.translate.instant('categoryCodeLabel_TC'),
        placeholder: this.translate.instant('autoGenerate_TC', { label: this.translate.instant('categoryCodeLabel_TC') }),
        value: this.productCategory.categoryCode,
        readonly: 'readonly',
        // validation: {
        //   required: true,
        //   minlength: 1
        // },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        // errorText: {
        //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('categoryCodeLabel_TC')}),
        //   minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('categoryCodeLabel_TC'), char: this.translate.instant('one_number')}),
        // }
      },
      {
        type: 'text',
        name: 'categoryDescription',
        label: this.translate.instant('categoryDescriptionsLabel_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('categoryDescriptionsLabel_TC') }),
        value: this.productCategory.categoryDescription,
        // validation: {
        //   // required: true,
        //   minlength: 1
        // },
        multiline: true,
        // errorText: {
        //   // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('categoryDescriptionsLabel_TC') }),
        //   minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('categoryDescriptionsLabel_TC'), char: this.translate.instant('one_number') })
        // }
      },
      {
        type: 'file',
        name: 'images',
        label: this.translate.instant('imagesLabel_TC'),
        value: this.productCategory.images,
        fileType: 'image/*',
        onUpload: this.onUpload.bind(this),
      },
    ];

  }

  getFields() {
    return this.formFields;
  }

  getProductCategoryList() {
    this._productCategoryService.getProductCategoryList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.productCategoryList = response?.results;
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('productCategory_TC')})
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
  //     message: this.translate.instant('entityDeleteSelectedItems_SC', {entity: this.translate.instant('productCategories_TC')}),
  //     header: this.translate.instant('confirm_TC'),
  //     icon: 'pi pi-exclamation-triangle',
  //     key: 'deleteSelectedItem',
  //     accept: () => {
  //       this._productCategoryService.removeProductCategory('productCategory.categoryName').subscribe(
  //         (response) => {
  //           console.log(response);
  //           if (response?.results) {
  //             this.productCategoryList = response?.results;
  //             this._sharedService.handleSuccess(
  //               this.translate.instant('entityDeleteSelectedCompaniesSuccessTitle_TC', {entity: this.translate.instant('productCategories_TC')})
  //             );
  //           }
  //         }
  //       )
  //     }
  //   });
  // }

  editProductCategory(productCategory: ProductCategory) {
    this.productCategory = { ...productCategory };
    this.setProductCategoryFields();
    this.showProductCategoryModifier = true;
  }

  deleteProductCategory(event: Event, productCategory: ProductCategory) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', { entity: productCategory?.categoryName }),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._productCategoryService.removeProductCategory(productCategory?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', { entity: productCategory?.categoryName })
            );
            this.getProductCategoryList();
          }
        )
      }
    });
  }

  saveProductCategory(productCategory: ProductCategory) {
    console.log(productCategory);

    const formData = new FormData();
    // if (productCategory?.categoryName) {
      formData.append("categoryName", productCategory?.categoryName);
      formData.append("categoryCode", productCategory?.categoryCode);
    // }
    // if (productCategory?.descriptions) {
      formData.append("categoryDescription", productCategory?.categoryDescription);
    // }
    // if(this.fileSelected) {
      formData.append("images", this.fileSelected);
    // }
    if (this.productCategory?.id) {
      productCategory.id = this.productCategory?.id;
      formData.append("id", this.productCategory?.id);
    }
    this._productCategoryService.productCategoryModifier(formData).subscribe(
      (response) => {
        console.log(response);
        if (Object.keys(response).length != 0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', { entity: productCategory?.categoryName })
          );
          this.showProductCategoryModifier = false;
          this.clearProductCategory();
          this.fileSelected = '';
          this.getProductCategoryList();
        }
      }
    )
  }

  onUpload(event: any) {
    if (event) {
      this.fileSelected = event[0];
    }
  }

  clearProductCategory() {
    this.productCategory = {};
    this.setProductCategoryFields();
  }

}
