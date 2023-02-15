import { HttpClient } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { UnitMaster } from 'src/app/shared/models/party.model';
import { Images, ProductCategory, productMaster, ProductSubCategory } from 'src/app/shared/models/product.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { ProductCategoryService } from '../product-category-main-page/services/product-category.service';
import { ProductSubCategoryService } from '../product-subcategory-main-page/services/product-sub-category.service';
import { UnitMasterService } from '../unit-master-main-page/services/unit-master.service';
import { ProductMasterService } from './services/product-master.service';
import { AcceptanceOfGoodsService } from 'src/app/wareshouse/modules/acceptance-of-goods/services/acceptance-of-goods.service';
import { AppSettingsService } from 'src/app/company/modules/app-settings-main-page/services/app-settings.service';
import { AppSettings } from 'src/app/shared/models/company.model';

@Component({
  selector: 'app-product-master-main-page',
  templateUrl: './product-master-main-page.component.html',
  styleUrls: ['./product-master-main-page.component.scss']
})
export class ProductMasterMainPageComponent implements OnInit {

  productMaster: productMaster | any = {};
  productMasterList: productMaster[] = new Array<productMaster>();
  selectedProductMasters: productMaster[] = new Array<productMaster>();
  showProductMasterModifier: boolean = false;
  technical_specification: any[] = [];

  formFields: any = [];
  columns: any = []
  col: any=[];

  categoryList: ProductCategory[] = new Array<ProductCategory>();
  subCategoryList: ProductSubCategory[] = new Array<ProductSubCategory>();
  filteredSubCategoryList: ProductSubCategory[] = new Array<ProductSubCategory>();
  unitMasterList: UnitMaster[] = new Array<UnitMaster>();
  gstCalculationForm: any;

  countryCode: any = [];

  show:boolean =false;
  prod_code:any;
  receipt_list: any =[];

  appSettingsList: AppSettings[] = new Array<AppSettings>();
  appSettingsArray: any = [];

  productImages: Images[] = new Array<Images>();
  fileSelected: any = [];


  constructor(private http: HttpClient,
    private _productMasterService: ProductMasterService,
    private _categoryList: ProductCategoryService,
    private _subCategoryList: ProductSubCategoryService,
    private _unitMasterList: UnitMasterService,
    public translate: TranslateService,
    private _sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private _appSettingsService: AppSettingsService,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.setProductMasterTable();
    this.setProductSecondTable();
    this.setProductMasterFields();
    this.getProductMasterList();
    // this.getMaterialReceiptDetails();
    this.getCategoryList();
    this.getSubCategoryList();
    this.getUnitMasterList();
    this.getCountryDetails();
    this.getAppSettingsList();
  }

  getCountryDetails() {
    this.http.get('assets/countryDetails/country.json').subscribe( 
      country => {
        this.countryCode = country['country'];
        console.log('country code', this.countryCode);
        this.setProductMasterFields();
      }
    )
  }

  setProductSecondTable(){
    this.col = [
      { field: 'productName', label: 'productName_TC' },
      // { field: 'productCode', label: 'productCode_TC' },
      { field: 'trc_no', label: 'trc_no_TC' },
      { field: 'trc_date', label: 'trc_date_TC' },
      { field: 'kit_no', label: 'kit_no_TC' },
      { field: 'batch_no', label: 'batch_no_TC' },
      { field: 'serial_number', label: 'serial_number_TC' },
      { field: 'available_qty', label: 'recevied_qty_TC' },
      { field: 'wareHouseName', label: 'ware_house_TC' },
      { field: 'zoneName', label: 'zone_TC' },
      { field: 'rackName', label: 'rack_TC' },
      { field: 'shelfName', label: 'shelf_TC' },
    ]
  }

  setProductMasterTable() {
    this.columns = [
      // { field: 'productCategory', label: 'productCategory_TC' },
      // { field: 'productSubCategory', label: 'productSubCategory_TC' },
      // { field: 'units', label: 'units_TC' },
      { field: 'productName', label: 'productName_TC' },
      { field: 'productCode', label: 'productCode_TC' },
      { field: 'usageType', label: 'usageType_TC' },
      { field: 'safetyStockLevel', label: 'safetyStockLevel_TC' },
      // { field: 'product_images', label: 'productImages_TC' },
      // { field: 'priceMethod', label: 'priceMethod_TC' },
      // { field: 'basePrice', label: 'basePrice_TC' },
      // { field: 'taxGst', label: 'taxGst_TC' },
      // { field: 'totalPrice', label: 'totalPrice_TC' },
      // { field: 'salesMargin', label: 'salesMargin_TC' },
      // { field: 'typeBasePrice', label: 'typeBasePrice_TC' },
      // { field: 'salesBasePrice', label: 'salesBasePrice_TC' },
      // { field: 'salesGst', label: 'salesGst_TC' },
      // { field: 'salesPrice', label: 'salesPrice_TC' },
      // { field: 'maxPerDis', label: 'maxPerDis_TC' },
      // { field: 'maxAmtDis', label: 'maxAmtDis_TC' },
      // { field: 'type', label: 'type_TC' },
      // { field: 'country', label: 'country_TC' },
      // { field: 'countryCode', label: 'countryCode_TC' },
      // { field: 'technical_specification', label: 'technical_specification_TC' },
      // { field: 'hsn', label: 'hsn_TC' },
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
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('productMaster_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('productMaster_TC') })
  }

  getCategoryList() {
    this._categoryList.getProductCategoryList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.categoryList = response?.results;
          this.setProductMasterFields();
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', { entity: this.translate.instant('productCategory_TC') })
          // );
        }
      }
    )
  }

  getSubCategoryList() {
    this._subCategoryList.getProductSubCategoryList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.filteredSubCategoryList = response?.results;
          this.subCategoryList = response?.results;
          this.setProductMasterFields();
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', { entity: this.translate.instant('productSubCategory_TC') })
          // );
        }
      }
    )
  }

  getUnitMasterList() {
    this._unitMasterList.getUnitMasterList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.unitMasterList = response?.results;         
          // this.unitMasterList[0].symbol = '='
          this.setProductMasterFields();
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', { entity: this.translate.instant('unitMaster_TC') })
          // );
        }
      }
    )
  }

  getAppSettingsList() {
    // console.log('fields', this.formFields)
    this._appSettingsService.getAppSettingsList().subscribe(
      (response) => {
        console.log('App Settings List', response?.results);
        // if (response?.results) {
          this.appSettingsList = response?.results;
        // }
        let currencyArray: any;
        currencyArray = this.appSettingsList.filter(e => e.appKey == 'CURRENCY_TYPES');
        const currencyValue = currencyArray[0]['appValue'].split(",");
        const finalArray = [];
        currencyValue.forEach((element: any) => {
          // console.log('element', element)
          finalArray.push({ id: element, name: element });
        });
        this.appSettingsArray = finalArray;
        console.log('final Value', finalArray)
        this.formFields[2].fields[1].options = finalArray;
      }
    )
  }

  setProductMasterFields() {
    this.formFields = [
      {
        type: 'fieldset',
        headerText: this.translate.instant('productInfo_TC'),
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'productName',
            label: this.translate.instant('productName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('productName_TC') }),
            value: this.productMaster.productName,
            validation: {
              required: true,
              minlength: 1,
              maxlength: 100,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('productName_TC') }),
              minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('productName_TC'), char: this.translate.instant('one_number') }),
              maxlength: this.translate.instant('formMaxLengthError_SC', { label: this.translate.instant('productName_TC'),
              char: this.translate.instant('hundred_number'),
            }),
            }
          },
          {
            type: 'text',
            name: 'hsn',
            label: this.translate.instant('hsn_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('hsn_TC') }),
            value: this.productMaster.hsn,
            validation: {
              required: true,
              maxlength: 30
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('hsn_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('hsn_TC'), char: this.translate.instant('thirty_number') })
            },
          },
          {
            type: 'text',
            name: 'productCode',
            label: this.translate.instant('productCode_TC'),
            placeholder: this.translate.instant('autoGenerate_TC', { label: this.translate.instant('productCode_TC') }),
            value: this.productMaster.productCode,
            readonly:'readonly',
            toolTip: 'Auto Generated',
            tooltipPosition: 'top',
            // validation: {
            //   required: true,
            //   minlength: 1
            // },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('productCode_TC') }),
            //   minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('productCode_TC'), char: this.translate.instant('one_number') })
            // }
          },
          {
            type: 'dropdown',
            name: 'units',
            label: this.translate.instant('units_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('units_TC') }),
            value: this.productMaster.units,
            // validation: {
            //   required: true
            // },
            options: this.unitMasterList,
            optionLabelList: ["PrimaryUnit", "SecondaryUnit", "ConversionFactors", "ConversionTotal"],
            optionValue: "id",
            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('units_TC') })
            // }
          },
          {
            type: 'dropdown',
            name: 'type',
            label: this.translate.instant('type_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('type_TC') }),
            value: this.productMaster.type,
            // validation: {
            //   required: true
            // },
            options: [
              { id: 'Product', name: 'Product' },
              { id: 'Service', name: 'Service' },
            ],
            optionLabel: "name",
            optionValue: "id",
            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('type_TC') })
            // }
          },
          {
            type: 'dropdown',
            name: 'usageType',
            label: this.translate.instant('usageType_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('usageType_TC') }),
            value: this.productMaster.usageType,
            // validation: {
            //   required: true
            // },
            options: [
              { id: 'Direct Use', name: 'Direct Use' },
              { id: 'Indirect Use', name: 'Indirect Use' },
              { id: 'Fixed Assets', name: 'Fixed Assets' },
              { id: 'Finished Goods', name: 'Finished Goods' },
              { id: 'Service', name: 'Service' },
            ],
            optionLabel: "name",
            optionValue: "id",
            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('usageType_TC') })
            // }
          },
          {
            type: 'text',
            name: 'safetyStockLevel',
            label: this.translate.instant('safetyStockLevel_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('safetyStockLevel_TC') }),
            value: this.productMaster.safetyStockLevel,
            validation: {
              // required: true,
              minlength: 1
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('safetyStockLevel_TC') }),
              minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('safetyStockLevel_TC'), char: this.translate.instant('one_number') })
            }
          }
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('productDetails_TC'),
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'productCategory',
            label: this.translate.instant('productCategory_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('productCategory_TC') }),
            value: this.productMaster.productCategory,
            // validation: {
            //   required: true
            // },
            options: this.categoryList,
            optionLabel: "categoryName",
            optionValue: "id",
            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('productCategory_TC') })
            // }
            onValueChange: this.onChangeProductCategoryValue.bind(this)
          },
          {
            type: 'dropdown',
            name: 'productSubCategory',
            label: this.translate.instant('productSubCategory_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('productSubCategory_TC') }),
            value: this.productMaster.productSubCategory,
            // validation: {
            //   required: true
            // },
            options: this.filteredSubCategoryList,
            optionLabel: "subCategoryName",
            optionValue: "id",
            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('productSubCategory_TC') })
            // }
          },
          {
            type: 'dropdown',
            name: 'country',
            label: this.translate.instant('country_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('country_TC'),
            }),
            value: this.productMaster.country,
            options: this.countryCode,
            optionLabel: 'name',
            optionValue: 'name',
            validation: {
              maxlength: 100,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('country_TC'),
                char: this.translate.instant('hundred_number'),
              }),
            },
            onValueChange: this.onChangeCountryName.bind(this),
          },
          {
            type: 'text',
            name: 'countryCode',
            label: this.translate.instant('countryCode_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('countryCode_TC') }),
            value: this.productMaster.countryCode,
            validation: {
              maxlength: 30
            },
            errorText: {
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('countryCode_TC'), char: this.translate.instant('thirty_number') })
            }
          },
          {
            type: 'text',
            name: 'minTemp',
            label: this.translate.instant('minTemp_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('minTemp_TC') }),
            value: this.productMaster.minTemp,
            // validation: {
            //   required: true,
            //   minlength: 1
            // },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('safetyStockLevel_TC') }),
            //   minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('safetyStockLevel_TC'), char: this.translate.instant('one_number') })
            // }
          },
          {
            type: 'text',
            name: 'maxTemp',
            label: this.translate.instant('maxTemp_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('maxTemp_TC') }),
            value: this.productMaster.maxTemp,
            // validation: {
            //   required: true,
            //   minlength: 1
            // },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('maxTemp_TC') }),
            //   minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('maxTemp_TC'), char: this.translate.instant('one_number') })
            // }
          },
          {
            type: 'file',
            name: 'images',
            label: this.translate.instant('productImages_TC'),
            value: this.productImages,
            multiple: true,
            fileType: 'image/*',
            onUpload: this.onUpload.bind(this),
            downloadButton: true,
            labelOnDownload: this.translate.instant('download_TC'),
            deleteFile: this.deleteFile.bind(this),
          },
        ]
      },
      //  field set disabled for now
      // {
      //   type: 'fieldset',
      //   headerText: 'Price Details',
      //   fillScreen: false,
      //   fields: [
      //     {
      //       type: 'dropdown',
      //       name: 'priceMethod',
      //       label: this.translate.instant('priceMethod_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('priceMethod_TC') }),
      //       value: this.productMaster.priceMethod,
      //       validation: {
      //         required: true
      //       },
      //       options: [
      //         { id: 'Weighted Average Method', name: 'Weighted Average Method' },
      //         // { id: 'FIFO Method', name: 'FIFO Method' },
      //       ],
      //       optionLabel: "name",
      //       optionValue: "id",
      //       errorText: {
      //         required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('priceMethod_TC') })
      //       }
      //     },
      //     {
      //       type: 'dropdown',
      //       name: 'typeBasePrice',
      //       label: this.translate.instant('typeBasePrice_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('typeBasePrice_TC') }),
      //       value: this.productMaster.typeBasePrice,
      //       validation: {
      //         required: true
      //       },
      //       options: [
      //         { id: 'On Base Price', name: 'On Base Price' },
      //         { id: 'On Total Purchase Price', name: 'On Total Purchase Price' },
      //       ],
      //       optionLabel: "name",
      //       optionValue: "id",
      //       errorText: {
      //         required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('typeBasePrice_TC') })
      //       }
      //     },
      //     {
      //       type: 'text',
      //       name: 'basePrice',
      //       label: this.translate.instant('basePrice_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('basePrice_TC') }),
      //       value: this.productMaster.basePrice,
      //       onValueChange: this.onChangeBasePriceValue.bind(this),
      //       validation: {
      //         required: true
      //       },
      //       keyFilter: "num",
      //       errorText: this.translate.instant("formIntegerError_SC", { label: this.translate.instant('basePrice_TC') }),
      //     },
      //     {
      //       type: 'text',
      //       name: 'taxGst',
      //       label: this.translate.instant('taxGst_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('taxGst_TC') }),
      //       value: this.productMaster.taxGst,
      //       onValueChange: this.onChangeTaxGstValue.bind(this),
      //       validation: {
      //         required: true
      //       },
      //       keyFilter: "int",
      //       errorText: this.translate.instant("formIntegerError_SC", { label: this.translate.instant('taxGst_TC') }),
      //     },
      //     {
      //       type: 'text',
      //       name: 'totalPrice',
      //       label: this.translate.instant('totalPrice_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('totalPrice_TC') }),
      //       value: this.productMaster.totalPrice,
      //       validation: {
      //         required: true
      //       },
      //       keyFilter: "num",
      //       errorText: this.translate.instant("formIntegerError_SC", { label: this.translate.instant('totalPrice_TC') }),
      //     },
      //     {
      //       type: 'text',
      //       name: 'salesMargin',
      //       label: this.translate.instant('salesMargin_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('salesMargin_TC') }),
      //       value: this.productMaster.salesMargin,
      //       onValueChange: this.onChangeSalesMarginValue.bind(this),
      //       validation: {
      //         required: true
      //       },
      //       keyFilter: "int",
      //       errorText: this.translate.instant("formIntegerError_SC", { label: this.translate.instant('salesMargin_TC') }),
      //     },
      //     {
      //       type: 'text',
      //       name: 'salesBasePrice',
      //       label: this.translate.instant('salesBasePrice_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('salesBasePrice_TC') }),
      //       value: this.productMaster.salesBasePrice,
      //       onValueChange: this.onChangeSalesBasePriceValue.bind(this),
      //       validation: {
      //         required: true
      //       },
      //       keyFilter: "num",
      //       errorText: this.translate.instant("formIntegerError_SC", { label: this.translate.instant('salesBasePrice_TC') }),
      //     },
      //     {
      //       type: 'text',
      //       name: 'salesGst',
      //       label: this.translate.instant('salesGst_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('salesGst_TC') }),
      //       value: this.productMaster.salesGst,
      //       onValueChange: this.onChangeSalesGstValue.bind(this),
      //       validation: {
      //         required: true
      //       },
      //       keyFilter: "int",
      //       errorText: this.translate.instant("formIntegerError_SC", { label: this.translate.instant('salesGst_TC') }),
      //     },
      //     {
      //       type: 'text',
      //       name: 'salesPrice',
      //       label: this.translate.instant('salesPrice_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('salesPrice_TC') }),
      //       value: this.productMaster.salesPrice,
      //       validation: {
      //         required: true
      //       },
      //       keyFilter: "num",
      //       errorText: this.translate.instant("formIntegerError_SC", { label: this.translate.instant('salesPrice_TC') }),
      //     },
      //     {
      //       type: 'text',
      //       name: 'maxPerDis',
      //       label: this.translate.instant('maxPerDis_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('maxPerDis_TC') }),
      //       value: this.productMaster.maxPerDis,
      //       validation: {
      //         required: true
      //       },
      //       keyFilter: "int",
      //       errorText: this.translate.instant("formIntegerError_SC", { label: this.translate.instant('maxPerDis_TC') }),
      //     },
      //     {
      //       type: 'text',
      //       name: 'maxAmtDis',
      //       label: this.translate.instant('maxAmtDis_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('maxAmtDis_TC') }),
      //       value: this.productMaster.maxAmtDis,
      //       validation: {
      //         required: true
      //       },
      //       keyFilter: "num",
      //       errorText: this.translate.instant("formIntegerError_SC", { label: this.translate.instant('maxAmtDis_TC') }),
      //     }
      //   ]
      // },
      {
        type: 'fieldset',
        headerText: this.translate.instant('priceDetails_TC'),
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'unitPrice',
            label: this.translate.instant('unit_price_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('unit_price_TC') }),
            value: this.productMaster.unitPrice,
            validation: {
              required: true
            },
            keyFilter: "num",
            errorText: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('unit_price_TC') }),
          },
          {
            type: 'dropdown',
            name: 'currencyType',
            label: this.translate.instant('currencyType_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('currencyType_TC') }),
            value: this.productMaster.currencyType,
            validation: {
              required: true
            },
            options: this.appSettingsArray,
            optionLabel: "name",
            optionValue: "id",
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('currencyType_TC') })
            }
          },
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('technicalSpecification_TC'),
        fillScreen: false,
        fields: [
          // {
          //   type: 'text',
          //   name: 'technical_specification',
          //   label: this.translate.instant('technical_specification_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('technical_specification_TC') }),
          //   value: this.productMaster.technical_specification,
          //   validation: {
          //     required: true,
          //   },
          //   // prefixGroupBy: true,
          //   // prefixGroupByIcon: 'pi-user',
          //   errorText: {
          //     required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('technical_specification_TC') }),
          //   }
          // }
          {
            type: 'table',
            name: 'technical_specification',
            label: this.translate.instant('technical_specification_TC'),
            formInitialise: {type: '', quantity: ''},
            // columnSchema: ['address_TC', 'stateNameLabel_TC'],
            formSchema: [
              {
                name:'type',
                type: 'input',
              },
              {
                name:'quantity',
                type: 'input',
              },
            ],
            dataKey: 'id',
            dataSource: this.productMaster.technical_specification ? this.technical_specification : [],
          },
        ]
      }
    ]
  }

  getFields() {
    return this.formFields;
  }

  getGoodsAcceptanceDetails(){
    this._productMasterService.getAcceptanceDetailsList(this.prod_code).subscribe(
      (response)=>{
        if (response?.results) {
          console.log("check grn details results",response?.results)
          this.receipt_list = response?.results;
          console.log("check receipt list",this.receipt_list)
          // this.productMasterList = response?.results;
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('productMaster_TC')})
          // );
        }

      }
    )

  }

  getProductMasterList() {
    this._productMasterService.getProductMasterList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.productMasterList = response?.results;
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('productMaster_TC')})
          // );
        }
      }
    )
  }

  onChangeCountryName(prevValue: any, value: any, formValue: any) {
    const formValueUpdated: any = {};
    let country_code: string = '';
    // if (formValue) {
    //   Object.assign(formValueUpdated, formValue);
    // }
    if (value) {
      country_code = this.countryCode.filter(e => e.name == value);
      formValueUpdated.countryCode = country_code[0]['code'];
    }
    console.log(formValueUpdated);
    return formValueUpdated;
  }

  editProductMaster(productMaster: productMaster) {
    this.technical_specification = JSON.parse(productMaster.technical_specification)
    this.productMaster = { ...productMaster };
    console.log("check product details",this.productMaster)
    // const _ = require('lodash');
    // var result =_.map(productMaster.images, 'image');
    // console.log("on edit image",result)
    this.productImages = productMaster.images;
    this.setProductMasterFields();
    this.showProductMasterModifier = true;
    this.show = true;
    this.prod_code = productMaster.id;
    console.log('product code', this.prod_code)
    this.getGoodsAcceptanceDetails();
  }

  deleteProductMaster(event: Event, productMaster: productMaster) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', {entity: productMaster?.productName}),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._productMasterService.removeProductMaster(productMaster?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {entity: productMaster?.productName})
            );
            this.getProductMasterList();
          }
        )
      }
    });
  }

  saveProductMaster(productMaster: productMaster) {
    const formData = new FormData();
      formData.append('productCategory', productMaster?.productCategory.toString());
      formData.append('productSubCategory', productMaster?.productSubCategory.toString());
      formData.append('units', productMaster?.units.toString());
      formData.append('productName', productMaster?.productName);
      formData.append('productCode', productMaster?.productCode);
      formData.append('usageType', productMaster?.usageType);
      formData.append('safetyStockLevel', productMaster?.safetyStockLevel);
      formData.append('currencyType', productMaster?.currencyType);
      formData.append('unitPrice', productMaster?.unitPrice.toString());
      // formData.append('priceMethod', productMaster?.priceMethod);
      // formData.append('basePrice', productMaster?.basePrice.toString());
      // formData.append('taxGst', productMaster?.taxGst.toString());
      // formData.append('totalPrice', productMaster?.totalPrice.toString());
      // formData.append('salesMargin', productMaster?.salesMargin.toString());
      // formData.append('typeBasePrice', productMaster?.typeBasePrice);
      // formData.append('salesBasePrice', productMaster?.salesBasePrice.toString());
      // formData.append('salesGst', productMaster?.salesGst.toString());
      // formData.append('salesPrice', productMaster?.salesPrice.toString());
      // formData.append('maxPerDis', productMaster?.maxPerDis.toString());
      // formData.append('maxAmtDis', productMaster?.maxAmtDis.toString());
      formData.append('type', productMaster?.type);
      formData.append('country', productMaster?.country);
      formData.append('countryCode', productMaster?.countryCode);
      formData.append('technical_specification', JSON.stringify(productMaster?.technical_specification));
      formData.append('hsn', productMaster?.hsn);
      formData.append('maxTemp', productMaster?.maxTemp);
      formData.append('minTemp', productMaster?.minTemp);
      for  (var i =  0; i <  this.fileSelected.length; i++)  {  
        formData.append("images",  this.fileSelected[i]);
      } 
      console.log(formData)

      if (this.productMaster?.id) {
        productMaster.id = this.productMaster?.id;
        formData.append('id', this.productMaster?.id)

      }
      this._productMasterService.productMasterModifier(formData).subscribe(
        (response) => {
          console.log(response);
          if (Object.keys(response).length!=0) {
            this._sharedService.handleSuccess(
              this.translate.instant('entityUpdateSuccessTitle_TC', {entity: productMaster?.productName})
            )
            this.showProductMasterModifier = false;
            this.clearProductMaster();
            // this.fileSelected = '';
            this.getProductMasterList();
          } 
          // else {
          //   this.showProductMasterModifier = true;
          // }
        }
      )
  }

  onChangeTaxGstValue(prevValue:any, value: any, formValue: any) {
    const formValueUpdated: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      formValueUpdated.taxGst = value;
    }
    if (value && parseFloat(value) > 0 && formValueUpdated?.basePrice > 0) {
      formValueUpdated.totalPrice = this.getTotalPrice(formValueUpdated?.basePrice , parseFloat(value)); 
    } else {
      formValueUpdated.totalPrice = formValueUpdated?.basePrice > 0 ? formValueUpdated?.basePrice : 0;
    }
    return formValueUpdated;
  }

  onChangeBasePriceValue(prevValue:any, value: any, formValue: any) {
    const formValueUpdated: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      formValueUpdated.basePrice = value;
    }
    if (value && parseFloat(value) > 0 && formValueUpdated?.taxGst > 0) {
      formValueUpdated.totalPrice = this.getTotalPrice(parseFloat(value) , formValueUpdated.taxGst); 
    } else {
      formValueUpdated.totalPrice = parseFloat(value);
    }
    if (value && parseFloat(value) > 0 && formValueUpdated?.salesMargin > 0) {
      formValueUpdated.salesBasePrice = this.getTotalPrice(parseFloat(value) , formValueUpdated.salesMargin); 
    } else {
      formValueUpdated.salesBasePrice = parseFloat(value);
    }
    return formValueUpdated;
  }

  onChangeSalesMarginValue(prevValue:any, value: any, formValue: any) {
    const formValueUpdated: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      formValueUpdated.salesMargin = value;
    }
    if (value && parseFloat(value) > 0 && formValueUpdated?.basePrice > 0) {
      formValueUpdated.salesBasePrice = this.getTotalPrice(formValueUpdated?.basePrice , parseFloat(value)); 
    } else {
      formValueUpdated.salesBasePrice = formValueUpdated?.basePrice > 0 ? formValueUpdated?.basePrice : 0;
    }
    return formValueUpdated;
  }

  onChangeSalesBasePriceValue(prevValue:any, value: any, formValue: any) {
    const formValueUpdated: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      formValueUpdated.salesBasePrice = value;
    }
    if (value && parseFloat(value) > 0 && formValueUpdated?.salesGst > 0) {
      formValueUpdated.salesPrice = this.getTotalPrice(parseFloat(value) , formValueUpdated.salesGst); 
    } else {
      formValueUpdated.salesPrice = parseFloat(value);
    }
    return formValueUpdated;
  }

  onChangeSalesGstValue(prevValue:any, value: any, formValue: any) {
    const formValueUpdated: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      formValueUpdated.salesGst = value;
    }
    if (value && parseFloat(value) > 0 && formValueUpdated?.salesBasePrice > 0) {
      formValueUpdated.salesPrice = this.getTotalPrice(formValueUpdated?.salesBasePrice , parseFloat(value)); 
    } else {
      formValueUpdated.salesPrice = formValueUpdated?.salesBasePrice > 0 ? formValueUpdated?.salesBasePrice : 0;
    }
    return formValueUpdated;
  }

  getTotalPrice(basePrice: number, taxGst: number) {
    let price = (basePrice * taxGst) / 100;
    let totalPrice = Number.parseFloat(basePrice.toString()) + Number.parseFloat(price.toFixed(2));
    return Number.parseFloat(totalPrice.toFixed(2));
  }

  onChangeProductCategoryValue(prevValue:any, value: any, formValue: any) {
    if (value) {
      this.filteredSubCategoryList = this.subCategoryList.filter(e => e.productCategory === value);
    } else {
      this.filteredSubCategoryList = this.subCategoryList;
    }
    this.updateSubcategoryFields();
    return formValue;
  }

  updateSubcategoryFields() {
    this.formFields[1].fields[1].options = this.filteredSubCategoryList;
  }

  clearProductMaster() {
    this.productMaster = {};
    this.setProductMasterFields();
    this.receipt_list = [];
    this.fileSelected = [];
    this.productImages = [];
  }

  onUpload(event: any) {
    console.log('on upload files', event)
    if (event.length) {
      for (let i = 0; i < event.length; i++) {
        this.fileSelected = [...this.fileSelected, event[i]];
      }
    }
  }

  deleteFile(fileId: any) {
    if (Number.isInteger(fileId)) {
      this._productMasterService.removeProductFile(fileId).subscribe();
    }else if (typeof(fileId) === 'string') {
      this.fileSelected.forEach((element: any, index: any)=>{
        if(element.fileUpload==fileId) this.fileSelected.splice(index, 1);
      });
    }
    console.log('deleted file', this.fileSelected);
  }


}
