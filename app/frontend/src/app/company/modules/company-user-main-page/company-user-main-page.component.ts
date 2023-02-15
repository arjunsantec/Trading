import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { Company, CompanyUser } from 'src/app/shared/models/company.model';
import { User } from 'src/app/shared/models/security.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CompanyService } from '../company-main-page/services/company.service';
import { CompanyUserService } from './services/company-user.service';

@Component({
  selector: 'app-company-user-main-page',
  templateUrl: './company-user-main-page.component.html',
  styleUrls: ['./company-user-main-page.component.scss']
})
export class CompanyUserMainPageComponent implements OnInit {

  companyUser: CompanyUser | any = {};
  companyUserList: CompanyUser[] = new Array<CompanyUser>();
  companyList: Company[] = new Array<Company>();
  userManagerList: User[] = new Array<User>();
  selectedCompanyUser: CompanyUser[] = new Array<CompanyUser>();
  showCompanyUserModifier: boolean = false;

  formFields: any = [];
  columns: any = [];

  constructor(private _companyUserService: CompanyUserService,
    private _companyService: CompanyService,
    private _sharedService: SharedService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.setCompanyUserFields();
    this.setCompanyUserTable();
    this.getCompanyUserList();
    this.getCompanyList();
    this.getUserManagerList();
  }

  setCompanyUserTable() {
    this.columns = [
      {field: 'userName', label: 'user_TC'},
      {field: 'companyName', label: 'company_TC'},
    ]
  }

  globalSearch(event: any, dt: any){
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any){
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', {entity: this.translate.instant('companyUser_TC')})
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {entity: this.translate.instant('companyUser_TC')})
  }

  getCompanyList() {
    this._companyService.getCompanyList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.companyList = response?.results;
          this.setCompanyUserFields();
        }
      }
    )
  }

  getUserManagerList() {
    this._companyUserService.getUserManagerList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.userManagerList = response?.results;
          this.setCompanyUserFields();
        }
      }
    )
  }

  setCompanyUserFields() {
    this.formFields = [
      {
        type: 'dropdown',
        name: 'user',
        label: this.translate.instant('user_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('user_TC')}),
        value: this.companyUser.user,
        validation: {
          required: true,
          maxlength: 50,
        },
        options: this.userManagerList,
        optionLabel: "first_name",
        optionValue: "id",
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('user_TC')})
        }
      },
      {
        type: 'dropdown',
        name: 'company',
        label: this.translate.instant('company_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('company_TC')}),
        value: this.companyUser.company,
        validation: {
          required: true
        },
        options: this.companyList,
        optionLabel: "companyName",
        optionValue: "id",
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('company_TC')})
        }
      },
    ]
  }

  getFields() {
    return this.formFields;
  }

  getCompanyUserList() {
    this._companyUserService.getCompanyUserList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.companyUserList = response?.results;
        }
      }
    )
  }

  editCompanyUser(companyUser: CompanyUser) {
    this.companyUser = { ...companyUser };
    this.setCompanyUserFields();
    this.showCompanyUserModifier = true;
  }

  deleteCompanyUser(event: Event, companyUser: CompanyUser) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', {entity: ''}),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._companyUserService.removeCompanyUser(companyUser?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {entity: ''})
            );
            this.getCompanyUserList();
          }
        )
      }
    })
  }

  saveCompanyUser(companyUser: CompanyUser) {
    this.showCompanyUserModifier = false;
    if (this.companyUser?.id) {
      companyUser.id = this.companyUser?.id;
      this.clearCompanyUser();
    }
    this._companyUserService.companyUserModifier(companyUser).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {entity: ''})
          );
          this.getCompanyUserList();
        }
      }
    )
  }

  clearCompanyUser() {
    this.companyUser = {};
    this.setCompanyUserFields();
  }

}
