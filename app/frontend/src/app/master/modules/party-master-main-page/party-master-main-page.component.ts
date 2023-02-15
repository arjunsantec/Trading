import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { CompanyService } from 'src/app/company/modules/company-main-page/services/company.service';
import { Company } from 'src/app/shared/models/company.model';
import { Bankdetails, Billingaddress, PartyMaster, POC, Shippingaddress } from 'src/app/shared/models/party.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PartyMasterService } from './services/party-master.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-party-master-main-page',
  templateUrl: './party-master-main-page.component.html',
  styleUrls: ['./party-master-main-page.component.scss']
})
export class PartyMasterMainPageComponent implements OnInit {

  partyMaster: PartyMaster | any = {};
  partyMasterList: PartyMaster[] = new Array<PartyMaster>();
  selectedPartyMasters: PartyMaster[] = new Array<PartyMaster>();
  showPartyMasterModifier: boolean = false;
  columns: any = [];
  partyMasterFields: any = [];
  countryCode: any = [];
  totalRecords = 0;
  page = 1;
  loading: boolean;

  companyList: Company[] = new Array<Company>();
  filteredCompanyList: Company[] = new Array<Company>();
  // billingAddress: Billingaddress[] = new Array<Billingaddress>(); 
  shippingAddress: Shippingaddress[] = new Array<Shippingaddress>();
  // bankDetails: Bankdetails[] = new Array<Bankdetails>();
  POC: POC[] = new Array<POC>();

  constructor(private http: HttpClient,
    public translate: TranslateService,
    private _partyMasterService: PartyMasterService,
    private _sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private _companyService: CompanyService,
    private route: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(p => {
      if (p['page']) {
        this.page = p['page'];
        this.getPartyMasterList(this.page);
      }
    });

    this.setPartyMasterFields();
    this.setPartyMasterTable();
    this.getPartyMasterList(this.page);
    this.getCountryDetails();
    this.getCompanyList();
  }

  getCountryDetails() {
    this.http.get('assets/countryDetails/country.json').subscribe(
      country => {
        this.countryCode = country['country'];
        console.log('country code', this.countryCode);
        this.setPartyMasterFields();
      }
    )
  }

  setPartyMasterTable() {
    this.columns = [
      { field: 'partyName', label: 'company_TC' },
      // {field: 'company', label: 'company_TC'},
      { field: 'partyCode', label: 'PartyCode_TC' },
      // {field: 'taxNo', label: 'pmTaxNo_TC'},
      { field: 'phoneNumber', label: 'pmPhoneNumber_TC' },
      { field: 'partyType', label: 'pmPartyType_TC' },
      // {field: 'orgType', label: 'pmOrgType_TC'},
      // {field: 'email', label: 'pmEmail_TC'},
      // {field: 'state', label: 'pmState_TC'},
      // {field: 'stateCode', label: 'pmStateCode_TC'},
      // { field: 'country', label: 'countryName_TC' },
      // { field: 'countryCode', label: 'countryCode_TC' },
      // {field: 'billingAddress', label: 'pmBillingAddress_TC'},
      // {field: 'shippingAddress', label: 'pmShippingAddress_TC'},
      // {field: 'bankDetails', label: 'pmBankDetails_TC'},
      // {field: 'creditLimit', label: 'pmCreditLimit_TC'},
      // {field: 'debitLimit', label: 'pmDebitLimit_TC'},
      // {field: 'creditAmount', label: 'pmCreditAmount_TC'},
      // {field: 'debitAmount', label: 'pmDebitAmount_TC'},
      { field: 'approvalStatus', label: 'pmApprovalStatus_TC' },
      { field: 'approvalBy', label: 'pmApprovalBy_TC' },
      { field: 'approvalDate', label: 'pmApprovalDate_TC' },
      { field: 'created', label: 'created_TC' },
      { field: 'modified', label: 'modified_TC' },
    ]
  }

  globalSearch(event: any, dt: any) {
    console.log("events", event.target.value, dt)
    // return dt.filterGlobal(event.target.value, 'contains');
    this._partyMasterService.getGlobalSearchList(event.target.value).subscribe((res) => {
      this.loading = false;
      this.totalRecords = res?.count;
      this.partyMasterList = res?.results;
    })
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('partyMaster_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('partyMaster_TC') })
  }

  setPartyMasterFields() {
    this.partyMasterFields = [
      {
        type: 'fieldset',
        headerText: this.translate.instant('partyProfileInfo_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          // {
          //   type: 'text',
          //   name: 'partyName',
          //   label: this.translate.instant('pmPartyNameLabel_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmPartyNameLabel_TC')}),
          //   value: this.partyMaster.partyName,
          //   validation: {
          //     required: true,
          //     minlength: 1,
          //     maxlength: 100,
          //   },
          //   prefixGroupBy: true,
          //   prefixGroupByIcon: 'pi-user',
          //   errorText: {
          //     required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmPartyNameLabel_TC')}),
          //     minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('pmPartyNameLabel_TC'), char: this.translate.instant('one_number')}),
          //     maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmPartyNameLabel_TC'), char: this.translate.instant('hundred_number')}),
          //   }
          // },
          {
            type: 'dropdown',
            name: 'partyType',
            label: this.translate.instant('pmPartyType_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmPartyType_TC') }),
            value: this.partyMaster.partyType,
            validation: {
              required: true,
              maxlength: 100,
            },
            options: [
              { id: 'Hospitals', name: 'Hospitals' },
              { id: 'Sponsor', name: 'Sponsor' },
              { id: 'Clinics', name: 'Clinics' },
              { id: 'Patients', name: 'Patients' },
              { id: 'Direct customers', name: 'Direct customers' },
              { id: 'Nurses', name: 'Nurses' },
              { id: 'company', name: 'company' },
              { id: 'Logistic', name: 'Logistic' },
              { id: 'CONSIGNEE', name: 'CONSIGNEE' },
            ],
            optionLabel: "name",
            optionValue: "id",
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmPartyType_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmPartyType_TC'), char: this.translate.instant('hundred_number') }),
            }
          },
          {
            type: 'text',
            name: 'partyCode',
            label: this.translate.instant('PartyCode_TC'),
            placeholder: this.translate.instant('autoGenerate_TC', { label: this.translate.instant('PartyCode_TC') }),
            value: this.partyMaster.partyCode,
            readonly: 'readonly',
            // keyFilter: "num",
            // validation: {
            //   required: true,
            // },
            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmDebitLimit_TC')}),   
            // }
          },

          {
            type: 'dropdown',
            name: 'status',
            label: this.translate.instant('pmStatus_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmStatus_TC') }),
            value: this.partyMaster.status,
            validation: {
              required: true,
              maxlength: 100,
            },
            options: [
              { id: 'Active', name: 'Active' },
              { id: 'Suspended', name: 'Suspended' },
              { id: 'Inactive', name: 'Inactive' },
              { id: 'Under Inspection', name: 'Under Inspection' }
            ],
            optionLabel: "name",
            optionValue: "id",
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmStatus_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmStatus_TC'), char: this.translate.instant('hundred_number') }),
            }
          },
          // 
          // 
          // {
          //   type: 'dropdown',
          //   name: 'orgType',
          //   label: this.translate.instant('pmOrgType_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmOrgType_TC')}),
          //   value: this.partyMaster.orgType,
          //   validation: {
          //     required: true,
          //     maxlength: 100,
          //   },
          //   options: [
          //     { id: 'Unregistred', name: 'Unregistred' },
          //     { id: 'Regular Business', name: 'Regular Business' },
          //     { id: 'Composition business', name: 'Composition business' },
          //   ],
          //   optionLabel: "name",
          //   optionValue: "id",
          //   errorText: {
          //     required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmOrgType_TC')}),
          //     maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmOrgType_TC'), char: this.translate.instant('hundred_number')}),
          //   }
          // },


        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('companydetails_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          // {
          //   type: 'dropdown',
          //   name: 'company',
          //   label: this.translate.instant('company_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('company_TC') }),
          //   value: this.partyMaster.company,
          //   onValueChange: this.onChangeCompanyValue.bind(this),
          //   validation: {
          //     required: true,
          //     // maxlength: 50,
          //   },
          //   options: this.companyList,
          //   optionLabel: "companyName",
          //   optionValue: "id",
          //   errorText: {
          //     required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('company_TC') }),
          //     // maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('zoneName_TC'), char: this.translate.instant('fifty_number') }),
          //   }
          // },
          {
            type: 'text',
            name: 'partyName',
            label: this.translate.instant('company_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('company_TC') }),
            value: this.partyMaster.partyName,
            validation: {
              required: true,
              minlength: 1,
              maxlength: 100,
            },
            prefixGroupBy: true,
            prefixGroupByIcon: 'pi-user',
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('company_TC') }),
              minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('company_TC'), char: this.translate.instant('one_number') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('company_TC'), char: this.translate.instant('hundred_number') }),
            }
          },
          {
            type: 'text',
            name: 'phoneNumber',
            label: this.translate.instant('pmPhoneNumber_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmPhoneNumber_TC') }),
            value: this.partyMaster.phoneNumber,
            validation: {
              required: true,
              maxlength: 50
            },
            prefixGroupBy: true,
            prefixGroupByIcon: 'pi-user',
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmPhoneNumber_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmPhoneNumber_TC'), char: this.translate.instant('fifty_number') }),
            }
          },
          {
            type: 'text',
            name: 'email',
            label: this.translate.instant('pmEmail_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmEmail_TC') }),
            value: this.partyMaster.email,
            validation: {
              email: true,
              pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$",
              minlength: 1,
              maxlength: 50
            },
            suffixGroupBy: true,
            suffixGroupByIcon: 'pi-google',
            errorText: {
              email: this.translate.instant("formValidationError_SC", { label: this.translate.instant('pmEmail_TC') }),
              pattern: this.translate.instant("formPatternError_SC", { label: this.translate.instant('pmEmail_TC') }),
              minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('pmEmail_TC'), char: this.translate.instant('one_number') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmEmail_TC'), char: this.translate.instant('fifty_number') })
            }
          },
          {
            type: 'text',
            name: 'state',
            label: this.translate.instant('pmState_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmState_TC') }),
            value: this.partyMaster.state,
            validation: {
              minlength: 1,
              maxlength: 250,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('pmState_TC'), char: this.translate.instant('one_number') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmState_TC'), char: this.translate.instant('two_fifty_number') }),
            }
          },
          {
            type: 'text',
            name: 'stateCode',
            label: this.translate.instant('pmStateCode_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmStateCode_TC') }),
            value: this.partyMaster.stateCode,
            validation: {
              required: true,
              maxlength: 250,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmStateCode_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmStateCode_TC'), char: this.translate.instant('two_fifty_number') }),
            }
          },
          {
            type: 'dropdown',
            name: 'country',
            label: this.translate.instant('countryName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('countryName_TC') }),
            value: this.partyMaster.country,
            options: this.countryCode,
            optionLabel: 'name',
            optionValue: 'name',
            validation: {
              minlength: 1,
              maxlength: 250,
              required: true,
            },
            prefixGroupBy: true,
            prefixGroupByIcon: 'pi-user',
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('countryName_TC') }),
              minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('countryName_TC'), char: this.translate.instant('one_number') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('countryName_TC'), char: this.translate.instant('two_fifty_number') }),
            },
            onValueChange: this.onChangeCountryName.bind(this),
          },
          {
            type: 'text',
            name: 'countryCode',
            label: this.translate.instant('countryCode_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('countryCode_TC') }),
            value: this.partyMaster.countryCode,
            validation: {
              required: true,
              maxlength: 250,
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('countryCode_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('countryCode_TC'), char: this.translate.instant('two_fifty_number') }),
            }
          },
          {
            type: 'text',
            name: 'taxNo',
            label: this.translate.instant('pmTaxNo_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmTaxNo_TC') }),
            value: this.partyMaster.taxNo,
            validation: {
              required: true,
              maxlength: 50
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmTaxNo_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmTaxNo_TC'), char: this.translate.instant('fifty_number') }),
            }
          },
          {
            type: 'text',
            name: 'companyAddress',
            label: this.translate.instant('companyAddress_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('companyAddress_TC') }),
            value: this.partyMaster.companyAddress,
            multiline: true,
            validation: {
              required: true,
              maxlength: 250
            },
            // prefixGroupBy: true,
            // prefixGroupByIcon: 'pi-user',
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('companyAddress_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('companyAddress_TC'), char: this.translate.instant('two_fifty_number') }),
            }
          },
          {
            type: 'text',
            name: 'zipCode',
            label: this.translate.instant('zipCode_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('zipCode_TC') }),
            value: this.partyMaster.zipCode,
            validation: {
              // required: true,
              maxlength: 50
            },
            errorText: {
              // required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('zipCode_TC') }),
              maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('zipCode_TC'), char: this.translate.instant('fifty_number') }),
            }
          },
        ]
      },
      // {
      //   type:'fieldset',
      //   headerText: this.translate.instant('contactInfo_TC'),
      //   footerText:'',
      //   fillScreen: false,
      //   fields:[
      //     {
      //       type: 'text',
      //       name: 'phoneNumber',
      //       label: this.translate.instant('pmPhoneNumber_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmPhoneNumber_TC')}),
      //       value: this.partyMaster.phoneNumber,
      //       validation: {
      //         required: true,
      //         maxlength: 50
      //       },
      //       prefixGroupBy: true,
      //       prefixGroupByIcon: 'pi-user',
      //       errorText: {
      //         required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmPhoneNumber_TC')}),
      //         maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmPhoneNumber_TC'), char: this.translate.instant('fifty_number')}),   
      //       }
      //     },
      //     {
      //       type: 'text',
      //       name: 'email',
      //       label: this.translate.instant('pmEmail_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmEmail_TC')}),
      //       value: this.partyMaster.email,
      //       validation: {
      //         email: true,
      //         pattern: "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$",
      //         minlength: 1,
      //         maxlength: 50
      //       },
      //       suffixGroupBy: true,
      //       suffixGroupByIcon: 'pi-google',
      //       errorText: {
      //         email: this.translate.instant("formValidationError_SC", { label: this.translate.instant('pmEmail_TC')}),
      //         pattern: this.translate.instant("formPatternError_SC", { label: this.translate.instant('pmEmail_TC')}),
      //         minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('pmEmail_TC'), char: this.translate.instant('one_number')}),
      //         maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmEmail_TC'), char: this.translate.instant('fifty_number')})
      //       }
      //     },
      //     {
      //       type: 'text',
      //       name: 'state',
      //       label: this.translate.instant('pmState_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmState_TC')}),
      //       value: this.partyMaster.state,
      //       validation: {
      //         minlength: 1,
      //         maxlength: 250,
      //       },
      //       prefixGroupBy: true,
      //       prefixGroupByIcon: 'pi-user',
      //       errorText: {
      //         minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('pmState_TC'), char: this.translate.instant('one_number')}),
      //         maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmState_TC'), char: this.translate.instant('two_fifty_number')}),
      //       }
      //     },
      //     {
      //       type: 'text',
      //       name: 'stateCode',
      //       label: this.translate.instant('pmStateCode_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmStateCode_TC')}),
      //       value: this.partyMaster.stateCode,
      //       validation: {
      //         required: true,
      //         maxlength: 250,
      //       },
      //       prefixGroupBy: true,
      //       prefixGroupByIcon: 'pi-user',
      //       errorText: {
      //         required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmStateCode_TC')}),
      //         maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmStateCode_TC'), char: this.translate.instant('two_fifty_number')}),   
      //       }
      //     },
      //     {
      //       type: 'dropdown',
      //       name: 'country',
      //       label: this.translate.instant('countryName_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('countryName_TC')}),
      //       value: this.partyMaster.country,
      //       options: this.countryCode,
      //       optionLabel: 'name',
      //       optionValue: 'name',
      //       validation: {
      //         minlength: 1,
      //         maxlength: 250,
      //       },
      //       prefixGroupBy: true,
      //       prefixGroupByIcon: 'pi-user',
      //       errorText: {
      //         minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('countryName_TC'), char: this.translate.instant('one_number')}),
      //         maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('countryName_TC'), char: this.translate.instant('two_fifty_number')}),
      //       },
      //       onValueChange: this.onChangeCountryName.bind(this),
      //     },
      //     {
      //       type: 'text',
      //       name: 'countryCode',
      //       label: this.translate.instant('countryCode_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('countryCode_TC')}),
      //       value: this.partyMaster.countryCode,
      //       validation: {
      //         required: true,
      //         maxlength: 250,
      //       },
      //       prefixGroupBy: true,
      //       prefixGroupByIcon: 'pi-user',
      //       errorText: {
      //         required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('countryCode_TC')}),
      //         maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('countryCode_TC'), char: this.translate.instant('two_fifty_number')}),   
      //       }
      //     },
      //   ]
      // },
      // {
      //   type:'fieldset',
      //   headerText: this.translate.instant('creditDebitInfo_TC'),
      //   footerText:'',
      //   fillScreen: false,
      //   fields: [
      //     {
      //       type: 'text',
      //       name: 'creditLimit',
      //       label: this.translate.instant('pmCreditLimit_TC'),
      //       placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmCreditLimit_TC')}),
      //       value: this.partyMaster.creditLimit,
      //       keyFilter: "num",
      //       validation: {
      //         required: true,
      //       },
      //       errorText: {
      //         required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmCreditLimit_TC')}),   
      //       }
      //     },

      //      {
      //   type: 'text',
      //   name: 'debitLimit',
      //   label: this.translate.instant('pmDebitLimit_TC'),
      //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmDebitLimit_TC')}),
      //   value: this.partyMaster.debitLimit,
      //   keyFilter: "num",
      //   validation: {
      //     required: true,
      //   },
      //   errorText: {
      //     required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmDebitLimit_TC')}),   
      //   }
      // },
      // {
      //   type: 'text',
      //   name: 'creditAmount',
      //   label: this.translate.instant('pmCreditAmount_TC'),
      //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmCreditAmount_TC')}),
      //   value: this.partyMaster.creditAmount,
      //   keyFilter: "num",
      //   validation: {
      //     required: true,
      //   },
      //   errorText: {
      //     required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmCreditAmount_TC')}),   
      //   }
      // },
      // {
      //   type: 'text',
      //   name: 'debitAmount',
      //   label: this.translate.instant('pmDebitAmount_TC'),
      //   placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmDebitAmount_TC')}),
      //   value: this.partyMaster.debitAmount,
      //   keyFilter: "num",
      //   validation: {
      //     required: true,
      //   },
      //   errorText: {
      //     required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmDebitAmount_TC')}),   
      //   }
      // },
      //   ]
      // },
      {
        type: 'tab',
        headerTextArray: [this.translate.instant('pmPointOfContact_TC'), this.translate.instant('pmShippingAddress_TC')],
        fields: [
          // {
          //   type: 'table',
          //   name: 'bankDetails',
          //   // label: this.translate.instant('pmBankDetails_TC'),
          //   formInitialise: {bankName: '', accNo: '', branch: '', ifsc: '', mirc: '', swift: ''},
          //   columnSchema: ['bankName_TC', 'accNo_TC', 'branch_TC', 'ifsc_TC', 'mirc_TC', 'swift_TC'],
          //   formSchema: [
          //     {
          //       name:'bankName',
          //       type: 'input',
          //     },
          //     {
          //       name:'accNo',
          //       type: 'input',
          //     },
          //     {
          //       name:'branch',
          //       type: 'input',
          //     },
          //     {
          //       name:'ifsc',
          //       type: 'input'  
          //     },
          //     {
          //       name:'mirc',
          //       type: 'input'  
          //     },
          //     {
          //       name:'swift',
          //       type: 'input'  
          //     }
          //   ],
          //   dataKey: 'id',
          //   dataSource: this.partyMaster?.bankDetails ? this.bankDetails : [],
          // },
          // {
          //   type: 'table',
          //   name: 'billingAddress',
          //   // label: this.translate.instant('pmBillingAddress_TC'),
          //   formInitialise: {address: '', state: '', country: '', pinCode: ''},
          //   columnSchema: ['address_TC', 'stateNameLabel_TC', 'country_TC', 'pinCodeLabel_TC'],
          //   formSchema: [
          //     {
          //       name:'address',
          //       type: 'input',
          //     },
          //     {
          //       name:'state',
          //       type: 'input',
          //     },
          //     {
          //       name:'country',
          //       type: 'input',
          //     },
          //     {
          //       name:'pinCode',
          //       type: 'input'  
          //     }
          //   ],
          //   dataKey: 'id',

          //   dataSource: this.partyMaster?.billingAddress ? this.billingAddress : [],

          // },
          {
            type: 'table',
            name: 'POC',
            // label: this.translate.instant('pmBillingAddress_TC'),
            formInitialise: { personName: '', personEmailID: '', personAddress: '' },
            columnSchema: ['personName_TC', 'PersonEmailID_TC', 'PersonAddress_TC'],
            onCancelForm: this.resetRow.bind(this),
            formSchema: [
              {
                name: 'personName',
                type: 'input',
              },
              {
                name: 'personEmailID',
                type: 'input',
              },
              {
                name: 'personAddress',
                type: 'input',
              },
            ],
            dataKey: 'id',
            
            dataSource: this.partyMaster?.POC ? this.POC : [],

          },
          {
            type: 'table',
            name: 'shippingAddress',
            // label: this.translate.instant('pmShippingAddress_TC'),
            formInitialise: { address: '', state: '', shippingGSTNo: '' },
            columnSchema: ['address_TC', 'stateNameLabel_TC', 'shippingGSTNo_TC'],
            onCancelForm: this.resetRow.bind(this),
            formSchema: [
              {
                name: 'address',
                type: 'input',
              },
              {
                name: 'state',
                type: 'input',
              },
              {
                name: 'shippingGSTNo',
                type: 'input',
              },
            ],
            dataKey: 'id',
            dataSource: this.partyMaster?.shippingAddress ? this.shippingAddress : [],

          },
        ]
      },
      {
        type: 'dropdown',
        name: 'approvalStatus',
        label: this.translate.instant('pmApprovalStatus_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmApprovalStatus_TC') }),
        value: this.partyMaster.approvalStatus,
        validation: {
          required: true,
          maxlength: 100,
        },
        options: [
          { id: 'Active', name: 'Active' },
          { id: 'Suspended', name: 'Suspended' },
          { id: 'Inactive', name: 'Inactive' },
          { id: 'Under Inspection', name: 'Under Inspection' },
        ],
        optionLabel: "name",
        optionValue: "id",
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmApprovalStatus_TC') }),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmApprovalStatus_TC'), char: this.translate.instant('hundred_number') }),
        }
      },
      {
        type: 'text',
        name: 'approvalBy',
        label: this.translate.instant('pmApprovalBy_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmApprovalBy_TC') }),
        value: this.partyMaster.approvalBy,
        validation: {
          required: true,
          maxlength: 100,
        },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmApprovalBy_TC') }),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmApprovalBy_TC'), char: this.translate.instant('hundred_number') }),
        }
      },
      {
        type: 'date',
        name: 'approvalDate',
        label: this.translate.instant('pmApprovalDate_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('pmApprovalDate_TC') }),
        value: this.partyMaster.approvalDate,
        validation: {
          required: true,
          maxlength: 100,
        },
        selectionMode: 'single',
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('pmApprovalDate_TC') }),
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('pmApprovalDate_TC'), char: this.translate.instant('hundred_number') }),
        }
      },
    ]
  }

  getFields() {
    return this.partyMasterFields;
  }

  resetRow(prevValue: any, tableValue: any) {
    return prevValue;
  }

  getPartyMasterList(pageNumber) {
    this._partyMasterService.getPartyMasterLists(pageNumber).subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.partyMasterList = response?.results;
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('partyMaster_TC')})
          // )
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

  // deleteSelectedPartyMasters(event: Event) {
  //   if (event.defaultPrevented) return;
  //   event.preventDefault();
  //   this.confirmationService.confirm({
  //     target: event.currentTarget || undefined,
  //     message: this.translate.instant('entityDeleteSelectedItems_SC', {entity: this.translate.instant('partyMasters_TC')}),
  //     header: this.translate.instant('confirm_TC'),
  //     icon: 'pi pi-exclamation-triangle',
  //     key: 'deleteSelectedItem',
  //     accept: () => {
  //       this._partyMasterService.removePartyMaster('partyMaster.partyName').subscribe(
  //         (response) => {
  //           console.log(response);
  //           if (response?.results) {
  //             this.partyMasterList = response?.results;
  //             this._sharedService.handleSuccess(
  //               this.translate.instant('entityDeleteSelectedCompaniesSuccessTitle_TC', {entity: this.translate.instant('partyMasters_TC')})
  //             );
  //           }
  //         }
  //       )
  //     }
  //   });
  // }

  editPartyMaster(partyMaster: PartyMaster) {
    // this.bankDetails = JSON.parse(partyMaster.bankDetails);
    console.log("partymaster", partyMaster)
    this.shippingAddress = JSON.parse(partyMaster.shippingAddress);
    // this.billingAddress = JSON.parse(partyMaster.billingAddress);
    this.POC = JSON.parse(partyMaster?.POC);
    console.log("poc", JSON.parse(partyMaster.shippingAddress))

    this.partyMaster = { ...partyMaster };
    console.log(this.partyMaster)
    this.setPartyMasterFields();
    this.showPartyMasterModifier = true;
  }

  deletePartyMaster(event: Event, partyMaster: PartyMaster) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', {entity: partyMaster?.partyName}),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._partyMasterService.removePartyMaster(partyMaster?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {entity: partyMaster?.partyName})
            );
            this.getPartyMasterList(this.page);
          }
        )
      }
    });
  }

  savePartyMaster(partyMaster: PartyMaster) {
    // partyMaster.bankDetails = JSON.stringify(partyMaster.bankDetails);
    partyMaster.shippingAddress = JSON.stringify(partyMaster.shippingAddress);
    // partyMaster.billingAddress = JSON.stringify(partyMaster.billingAddress);
    partyMaster.POC = JSON.stringify(partyMaster.POC);
    console.log(partyMaster)

    if (this.partyMaster?.id) {
      partyMaster.id = this.partyMaster?.id;
      // partyMaster.bankDetails = JSON.stringify(this.bankDetails);
      // partyMaster.shippingAddress = JSON.stringify(this.shippingAddress);
      // this.POC = JSON.parse(partyMaster.POC);
      // partyMaster.billingAddress = JSON.stringify(this.bankDetails);
      this.clearPartyMaster();
    }
    console.log("check party master", partyMaster)
    this._partyMasterService.partyModifier(partyMaster).subscribe(
      (response) => {
        console.log(response);
        if (Object.keys(response).length != 0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {entity: partyMaster?.partyName})
          );
          this.showPartyMasterModifier = false
          this.getPartyMasterList(this.page);
        }
      }
    )
  }

  clearPartyMaster() {
    this.partyMaster = {};
    this.setPartyMasterFields();
  }

  nextPage(event: LazyLoadEvent) {
    // this.loading=true;
    this.page = event.first / event.rows + 1;
    this.router.navigate(['/master/partyMaster/'], {
      queryParams: { page: this.page }
    });
    this.getPartyMasterList(this.page);
  }
 
  //   onChangeCompanyValue(prevValue: any, value: any, formValue: any){
  // console.log("value",value)

  // const formValueUpdated: any = {};
  // if (formValue) {
  //   Object.assign(formValueUpdated, formValue);
  // }
  // if (value) {
  //   this.filteredCompanyList= this.companyList.filter(e => e.id === value);
  //   formValueUpdated.phoneNumber=this.filteredCompanyList[0].phoneNo
  //   formValueUpdated.stateCode=this.filteredCompanyList[0].stateCode
  //   formValueUpdated.state=this.filteredCompanyList[0].stateName
  //   formValueUpdated.countryCode=this.filteredCompanyList[0].countryCode
  //   formValueUpdated.country=this.filteredCompanyList[0].countryName
  //   formValueUpdated.taxNo=this.filteredCompanyList[0].taxNo
  //   formValueUpdated.email=this.filteredCompanyList[0].email
  // //   let res:any=''
  // //   this._companyService.getCompanyById(value).subscribe((response) => 
  // //     console.log("response of company",response);
  // //     console.log("form fields",   this.partyMasterFields)
  // // res=this.update(formValueUpdated,response);
  // // console.log("res",res)
  // // this.partyMasterFields[1].fields[1].value=res

  // //   });

  // }

  // return formValueUpdated;
  //   }
  update(f, res) {

    return f.phoneNumber = res.phoneNo
  }

  getCompanyList() {
    this._companyService.getCompanyList().subscribe((response) => {
      console.log(response);
      if (response?.results) {
        this.companyList = response?.results;
        console.log("company list", this.companyList)
        this.setPartyMasterFields();
      }
    });
  }

}
