import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { Department } from 'src/app/shared/models/company.model';
import { User } from 'src/app/shared/models/security.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { CompanyUserService } from '../company-user-main-page/services/company-user.service';
import { DepartmentService } from './services/department.service';

@Component({
  selector: 'app-department-main-page',
  templateUrl: './department-main-page.component.html',
  styleUrls: ['./department-main-page.component.scss']
})
export class DepartmentMainPageComponent implements OnInit {

  department: Department | any = {};
  departmentList: Department[] = new Array<Department>();
  userManagerList: User[] = new Array<User>();
  selectedDepartments: Department[] = new Array<Department>();
  showDepartmentModifier: boolean = false;

  columns: any = [];
  // logs: any = [];
  departmentFields: any = [];

  constructor(public translate: TranslateService,
    private _departmentService: DepartmentService,
    private _sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private _companyUserService: CompanyUserService) { }

  ngOnInit(): void {
    this.setDepartmentTable();
    this.setDepartmentFields();
    this.getDepartmentList();
    this.getUserManagerList();
    // this.setLogsTable();
  }

  setDepartmentTable() {
    this.columns = [
      {field: 'departmentName', label: 'departmentName_TC'},
      {field: 'contactEmail', label: 'dContactEmail_TC'},
      {field: 'phoneNumber', label: 'dPhoneNumber_TC'},
      {field: 'headOfDepartment', label: 'dHeadOfDepartment_TC'},
      {field: 'created', label: 'created_TC', type: 'date'},
      {field: 'modified', label: 'modified_TC', type: 'date'},
    ]
  }

  // setLogsTable() {
  //   this.logs = [
  //     {field: 'created', label: 'created_TC'},
  //     {field: 'modified', label: 'modified_TC'},
  //   ]
  // }

  globalSearch(event: any, dt: any){
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any){
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', {entity: this.translate.instant('department_TC')})
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {entity: this.translate.instant('department_TC')})
  }

  setDepartmentFields() {
    this.departmentFields = [
      {
        type: 'text',
        name: 'departmentName',
        label: this.translate.instant('departmentName_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('departmentName_TC')}),
        value: this.department.departmentName,
        validation: {
          required: true,
          minlength: 1,
        },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('departmentName_TC')}),
          minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('departmentName_TC'), char: this.translate.instant('one_number')}),
        }
      },
      {
        type: 'text',
        name: 'contactEmail',
        label: this.translate.instant('dContactEmail_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('dContactEmail_TC')}),
        value: this.department.contactEmail,
        validation: {
          required: true,
          email: true,
          pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$",
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-google',
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('dContactEmail_TC')}),
          email: this.translate.instant("formValidationError_SC", { label: this.translate.instant('dContactEmail_TC')}),
          pattern: this.translate.instant("formPatternError_SC", { label: this.translate.instant('dContactEmail_TC')}),
        }
      },
      {
        type: 'text',
        name: 'phoneNumber',
        label: this.translate.instant('dPhoneNumber_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('dPhoneNumber_TC')}),
        value: this.department.phoneNumber,
        validation: {
          required: true,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-hashtag',
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('dPhoneNumber_TC')}),
        }
      },
      {
        type: 'dropdown',
        name: 'headOfDepartment',
        label: this.translate.instant('dHeadOfDepartment_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('dHeadOfDepartment_TC')}),
        value: this.department.headOfDepartment,
        validation: {
          required: true
        },
        options: this.userManagerList,
        optionLabel: "first_name",
        optionValue: "id",
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('dHeadOfDepartment_TC')})
        }
      },
    ]
  }

  getFields() {
    return this.departmentFields;
  }

  getUserManagerList() {
    this._companyUserService.getUserManagerList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.userManagerList = response?.results;
          this.setDepartmentFields();
        }
      }
    )
  }

  getDepartmentList() {
    this._departmentService.getDepartmentList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.departmentList = response?.results;
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('department_TC')})
          // );
        }
      }
    )
  }

  // deleteSelectedDepartments(event: Event) {
  //   if (event.defaultPrevented) return;
  //   event.preventDefault();
  //   this.confirmationService.confirm({
  //     target: event.currentTarget || undefined,
  //     message: this.translate.instant('entityDeleteSelectedItems_SC', {entity: this.translate.instant('department_TC')}),
  //     header: this.translate.instant('confirm_TC'),
  //     icon: 'pi pi-exclamation-triangle',
  //     key: 'deleteSelectedItem',
  //     accept: () => {
  //       this._departmentService.removeDepartment('department.departmentName').subscribe(
  //         (response) => {
  //           console.log(response);
  //           if (response?.results) {
  //             this.departmentList = response?.results;
  //             this._sharedService.handleSuccess(
  //               this.translate.instant('entityDeleteSelectedCompaniesSuccessTitle_TC', {entity: this.translate.instant('department_TC')})
  //             );
  //           }
  //         }
  //       )
  //     }
  //   })
  // }

  deleteDepartment(event: Event, department: Department) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteSelectedItems_SC', {entity: department?.departmentName}),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._departmentService.removeDepartment(department?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {entity: department?.departmentName})
            );
            this.getDepartmentList()
          }
        )
      }
    })
  }

  editDepartment(department: Department) {
    this.department = { ...department };
    this.setDepartmentFields();
    this.showDepartmentModifier = true;
  }

  saveDepartment(department: Department) {
    if (this.department?.id) {
      department.id = this.department?.id;
    }
    this._departmentService.departmentModifier(department).subscribe(
      (response) => {
        console.log(response);
        if (Object.keys(response).length!=0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {entity: department?.departmentName})
          );
          this.showDepartmentModifier = false;
          this.clearDepartment();
          this.getDepartmentList();
        }
      }
    )
  }

  clearDepartment() {
    this.department = {};
    this.setDepartmentFields();
  }

}
