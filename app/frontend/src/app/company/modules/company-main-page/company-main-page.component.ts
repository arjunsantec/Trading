import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { Company } from 'src/app/shared/models/company.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CompanyService } from './services/company.service';

@Component({
  selector: 'app-company-main-page',
  templateUrl: './company-main-page.component.html',
  styleUrls: ['./company-main-page.component.scss'],
})
export class CompanyMainPageComponent implements OnInit {
  company: Company | any = {};
  companyList: Company[] = new Array<Company>();
  selectedCompanies: Company[] = new Array<Company>();
  showCompanyModifier: boolean = false;

  formFields: any = [];
  columns: any = [];
  fileSelected: any='';
  countryCode: any = [];

  constructor(
    private http: HttpClient,
    private _companyService: CompanyService,
    private _sharedService: SharedService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.getCompanyList();
    this.setCompanyTable();
    this.setCompanyFields();
    this.getCountryDetails();
  }

  getCountryDetails() {
    this.http.get('assets/countryDetails/country.json').subscribe( 
      country => {
        this.countryCode = country['country'];
        console.log('country code', this.countryCode);
        this.setCompanyFields();
      }
    )
  }

  setCompanyTable() {
    this.columns = [
      { field: 'companyName', label: 'companyNameLabel_TC' },
      // { field: 'city', label: 'cityLabel_TC' },
      { field: 'pinCode', label: 'pinCodeLabel_TC' },
      // { field: 'stateCode', label: 'stateCodeLabel_TC' },
      // { field: 'stateName', label: 'stateNameLabel_TC' },
      // { field: 'countryCode', label: 'countryCode_TC' },
      // { field: 'countryName', label: 'countryName_TC' },
      // { field: 'taxNo', label: 'gstNoLabel_TC' },
      // { field: 'panNo', label: 'panNoLabel_TC' },
      // { field: 'vatNo', label: 'cinNoLabel_TC' },
      // { field: 'email', label: 'emailLabel_TC' },
      // { field: 'phoneNo', label: 'phoneNoLabel_TC' },
      { field: 'isHeadOffice', label: 'isHeadOfficeLabel_TC' },
      // {field: 'registeredAddress', label: 'registeredAddressLabel_TC'},
      // {field: 'corporateAddress', label: 'corporateAddressLabel_TC'},
      // { field: 'organizationType', label: 'organizationTypeLabel_TC' },
      // { field: 'businessCategory', label: 'businessCategoryLabel_TC' },
      // {field: 'description', label: 'descriptionLabel_TC'},
      // { field: 'images', label: 'images_TC' },
      {field: 'created', label: 'created_TC'},
      {field: 'modified', label: 'modified_TC'},
    ];
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains');
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', {
      entity: this.translate.instant('company_TC'),
    });
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {
      entity: this.translate.instant('company_TC'),
    });
  }

  setCompanyFields() {
    this.formFields = [
      {
        type: 'fieldset',
        headerText: this.translate.instant('companyInfo_TC'),
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'companyName',
            label: this.translate.instant('companyNameLabel_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('companyNameLabel_TC') }),
            value: this.company.companyName,
            validation: {
              required: true,
              minlength: 1
            },
            prefixGroupBy: true,
            prefixGroupByIcon: 'pi-globe',
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('companyNameLabel_TC') }),
              minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('companyNameLabel_TC'), char: this.translate.instant('one_number') })
            }
          },
          {
            type: 'text',
            name: 'email',
            label: this.translate.instant('emailLabel_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('emailLabel_TC') }),
            value: this.company.email,
            validation: {
              // required: true,
              email: true,
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$",
              minlength: 1,
              maxlength: 50
            },
            suffixGroupBy: true,
            suffixGroupByIcon: 'pi-at',
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('emailLabel_TC') }),
              email: this.translate.instant("formValidationError_SC", { label: this.translate.instant('emailLabel_TC') }),
              pattern: this.translate.instant("formPatternError_SC", { label: this.translate.instant('emailLabel_TC') }),
              minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('emailLabel_TC'), char: this.translate.instant('one_number') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('emailLabel_TC'), char: this.translate.instant('fifty_number') })
            }
          },
          {
            type: 'text',
            name: 'phoneNo',
            label: this.translate.instant('phoneNoLabel_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('phoneNoLabel_TC') }),
            value: this.company.phoneNo,
            validation: {
              // required: true,
              minlength: 1
            },
            prefixGroupBy: true,
            prefixGroupByIcon: 'pi-hashtag',
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('phoneNoLabel_TC') }),
              minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('phoneNoLabel_TC'), char: this.translate.instant('one_number') })
            }
          },
          {
            type: 'text',
            name: 'taxNo',
            label: this.translate.instant('gstNoLabel_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('gstNoLabel_TC') }),
            value: this.company.taxNo,
            // validation: {
            //   required: true
            // },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('gstNoLabel_TC') }),
            // }
          },
        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('companyAddressInfo_TC'),
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'pinCode',
            label: this.translate.instant('pinCodeLabel_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('pinCodeLabel_TC'),
            }),
            value: this.company.pinCode,
            validation: {
              required: true,
              minlength: 1,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('pinCodeLabel_TC'),
              }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('pinCodeLabel_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'city',
            label: this.translate.instant('cityLabel_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('cityLabel_TC'),
            }),
            value: this.company.city,
            validation: {
              maxlength: 100,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('cityLabel_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'stateName',
            label: this.translate.instant('stateNameLabel_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('stateNameLabel_TC'),
            }),
            value: this.company.stateName,
            validation: {
              // required: true,
              minlength: 1,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              // required: this.translate.instant('formRequiredError_SC', {
              //   label: this.translate.instant('stateNameLabel_TC'),
              // }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('stateNameLabel_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'stateCode',
            label: this.translate.instant('stateCodeLabel_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('stateCodeLabel_TC'),
            }),
            value: this.company.stateCode,
            keyFilter: 'int',
            errorText: this.translate.instant('formIntegerError_SC', {
              label: this.translate.instant('stateCodeLabel_TC'),
            }),
          },
          {
            type: 'dropdown',
            name: 'countryName',
            label: this.translate.instant('countryName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('countryName_TC'),
            }),
            value: this.company.countryName,
            options: this.countryCode,
            optionLabel: 'name',
            optionValue: 'name',
            validation: {
              // required: true,
              minlength: 1,
            },
            errorText: {
              // required: this.translate.instant('formRequiredError_SC', {
              //   label: this.translate.instant('countryName_TC'),
              // }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('countryName_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
            onValueChange: this.onChangeCountryName.bind(this),
          },
          {
            type: 'text',
            name: 'countryCode',
            label: this.translate.instant('countryCode_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('countryCode_TC'),
            }),
            value: this.company.countryCode,
            validation: {
              // required: true,
              minlength: 1,
            },
            keyFilter: 'int',
            errorText: {
              // required: this.translate.instant('formRequiredError_SC', {
              //   label: this.translate.instant('countryCode_TC'),
              // }),
              minlength: this.translate.instant('formMinLengthError_SC', {
                label: this.translate.instant('countryCode_TC'),
                char: this.translate.instant('one_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'registeredAddress',
            label: this.translate.instant('registeredAddressLabel_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('registeredAddressLabel_TC') }),
            value: this.company.registeredAddress,
            // validation: {
            //   required: true,
            // },
            multiline: true,
            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('registeredAddressLabel_TC') })
            // }
          },
          {
            type: 'text',
            name: 'corporateAddress',
            label: this.translate.instant('corporateAddressLabel_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('corporateAddressLabel_TC') }),
            value: this.company.corporateAddress,
            // validation: {
            //   required: true
            // },
            multiline: true,
            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('corporateAddressLabel_TC') })
            // }
          },
        ]
      },
      // {
      //   type: 'text',
      //   name: 'panNo',
      //   label: this.translate.instant('panNoLabel_TC'),
      //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('panNoLabel_TC')}),
      //   value: this.company.panNo,
      //   validation: {
      //     required: true
      //   },
      // },
      // {
      //   type: 'text',
      //   name: 'panNo',
      //   label: this.translate.instant('panNoLabel_TC'),
      //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('panNoLabel_TC')}),
      //   value: this.company.panNo,
      //   validation: {
      //     required: true
      //   },
      //   prefixGroupBy: true,
      //   prefixGroupByIcon: 'pi-user',
      //   errorText: {
      //     required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('panNoLabel_TC')})
      //   }
      // },
      {
        type: 'text',
        name: 'vatNo',
        label: this.translate.instant('cinNoLabel_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', {
          label: this.translate.instant('cinNoLabel_TC'),
        }),
        value: this.company.vatNo,
        // validation: {
        //   required: true,
        // },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        // errorText: {
        //   required: this.translate.instant('formRequiredError_SC', {
        //     label: this.translate.instant('cinNoLabel_TC'),
        //   }),
        // },
      },
      {
        type: 'dropdown',
        name: 'organizationType',
        label: this.translate.instant('organizationTypeLabel_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', {
          label: this.translate.instant('organizationTypeLabel_TC'),
        }),
        value: this.company.organizationType,
        // validation: {
        //   required: true,
        // },
        options: [
          { id: 'Retail', name: 'Retail' },
          { id: 'Distributor', name: 'Distributor' },
          { id: 'Manufacturing', name: 'Manufacturing' },
          { id: 'Service', name: 'Service' },
          { id: 'WholeSale', name: 'WholeSale' },
          { id: 'Others', name: 'Others' },
        ],
        optionLabel: 'name',
        optionValue: 'id',
        // errorText: {
        //   required: this.translate.instant('formRequiredError_SC', {
        //     label: this.translate.instant('organizationTypeLabel_TC'),
        //   }),
        // },
      },
      {
        type: 'file',
        name: 'images',
        label: this.translate.instant('images_TC'),
        value: this.company.images,
        fileType: 'image/*',
        onUpload: this.onUpload.bind(this)
      },
      {
        type: 'dropdown',
        name: 'businessCategory',
        label: this.translate.instant('businessCategoryLabel_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', {
          label: this.translate.instant('businessCategoryLabel_TC'),
        }),
        value: this.company.businessCategory,
        // validation: {
        //   required: true,
        // },
        options: [
          { id: 'Sole proprietorships', name: 'Sole proprietorships' },
          { id: 'Partnerships', name: 'Partnerships' },
          {
            id: 'Limited Liability companies(LLC)',
            name: 'Limited Liability companies(LLC)',
          },
          { id: 'Private Limited', name: 'Private Limited' },
          { id: 'Corporations', name: 'Corporations' },
        ],
        optionLabel: 'name',
        optionValue: 'id',
        // errorText: {
        //   required: this.translate.instant('formRequiredError_SC', {
        //     label: this.translate.instant('businessCategoryLabel_TC'),
        //   }),
        // },
      },
      {
        type: 'text',
        name: 'description',
        label: this.translate.instant('descriptionLabel_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', {
          label: this.translate.instant('descriptionLabel_TC'),
        }),
        value: this.company.description,
        multiline: true,
      },
      {
        type: 'boolean',
        name: 'isHeadOffice',
        label: this.translate.instant('isHeadOfficeLabel_TC'),
        value: this.company.isHeadOffice,
        // validation: {
        //   required: true,
        // },
        // errorText: {
        //   required: this.translate.instant('formRequiredError_SC', {
        //     label: this.translate.instant('isHeadOfficeLabel_TC'),
        //   }),
        // },
      },
    ];
  }

  getFields() {
    return this.formFields;
  }

  getCompanyList() {
    this._companyService.getCompanyList().subscribe((response) => {
      console.log(response);
      if (response?.results) {
        this.companyList = response?.results;
        // this._sharedService.handleSuccess(
        //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('company_TC')})
        // );
      }
    });
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

  // deleteSelectedCompanies(event: Event) {
  //   if (event.defaultPrevented) return;
  //   event.preventDefault();
  //   this.confirmationService.confirm({
  //     target: event.currentTarget || undefined,
  //     message: this.translate.instant('entityDeleteSelectedItems_SC', {entity: this.translate.instant('companies_TC')}),
  //     header: this.translate.instant('confirm_TC'),
  //     icon: 'pi pi-exclamation-triangle',
  //     key: 'deleteSelectedItem',
  //     accept: () => {
  //       this._companyService.removeCompany('company.companyName').subscribe(
  //         (response) => {
  //           console.log(response);
  //           if (response?.results) {
  //             this.companyList = response?.results;
  //             this._sharedService.handleSuccess(
  //               this.translate.instant('entityDeleteSelectedCompaniesSuccessTitle_TC', {entity: this.translate.instant('companies_TC')})
  //             );
  //           }
  //         }
  //       )
  //     }
  //   });
  // }

  editCompany(company: Company) {
    this.company = { ...company };
    this.setCompanyFields();
    this.showCompanyModifier = true;
  }

  deleteCompany(event: Event, company: Company) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', {
        entity: company?.companyName,
      }),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._companyService
          .removeCompany(company?.id)
          .subscribe((response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {
                entity: company?.companyName,
              })
            );
            this.getCompanyList();
          });
      },
    });
  }

  saveCompany(company: Company) {
    console.log(company);
    const formData = new FormData();
    formData.append('companyName', company?.companyName);
    formData.append('city', company?.city);
    formData.append('pinCode', company?.pinCode);
    formData.append('stateCode', company?.stateCode.toString());
    formData.append('stateName', company?.stateName);
    formData.append('taxNo', company?.taxNo);
    formData.append('vatNo', company?.vatNo);
    formData.append('email', company?.email);
    formData.append('phoneNo', company?.phoneNo);
    formData.append('isHeadOffice', company?.isHeadOffice);
    formData.append('registeredAddress', company?.registeredAddress);
    formData.append('corporateAddress', company?.corporateAddress);
    formData.append('organizationType', company?.organizationType);
    formData.append('businessCategory', company?.businessCategory);
    formData.append('description', company?.description);
    formData.append('images', this.fileSelected);
    formData.append('countryCode', company?.countryCode);
    formData.append('countryName', company?.countryName);
    if (this.company?.id) {
      company.id = this.company?.id;
      formData.append("id", this.company?.id)
    }
    this._companyService.companyModifier(formData).subscribe((response) => {
      console.log("response",response);
      if (Object.keys(response).length!=0) {
        this._sharedService.handleSuccess(
          this.translate.instant('entityUpdateSuccessTitle_TC', {
            entity: company?.companyName,
          })
        );
        this.showCompanyModifier = false;
        this.clearCompany();
        this.fileSelected = '';
        this.getCompanyList();
      }
      else{
        this.showCompanyModifier=true;
      }
    });
  }

  clearCompany() {
    this.company = {};
    this.setCompanyFields();
  }

  onUpload(event: any) {
    if (event) {
      this.fileSelected = event[0];
    }
  }



}
