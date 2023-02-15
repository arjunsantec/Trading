import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CompanyService } from 'src/app/company/modules/company-main-page/services/company.service';
import { Company, CompanyUser } from '../../models/company.model';
import { SharedService } from '../../services/shared.service';
import { Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.scss']
})
export class SelectCompanyComponent implements OnInit {

  companyUserList: any = new Array();
  companyList: Company[] = new Array<Company>();
  companyCount: Number = 0;

  constructor(private _companyService: CompanyService,
    private _sharedService: SharedService,
    public translate: TranslateService,
    private router: Router) { }

  ngOnInit(): void {
    this.getUserCompanyList();
    this.getCompanyList();
  }

  getUserCompanyList() {
    this._companyService.getUserCompanyList().subscribe(
      (response) => {
        console.log(response);
        this.companyCount = response['count']
        console.log(this.companyCount)
        if (response?.results) {
          this.companyUserList = response?.results;
          this._sharedService.handleSuccess(
            this.translate.instant('entityListLoadedSuccessTitle_TC', { entity: this.translate.instant('companyUser_TC') })
          )
        }
      }
    )
  }

  getCompanyList() {
    this._companyService.getCompanyList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.companyList = response?.results;
        }
      }
    )
  }

  getCompany(companyId: any) {
    this._companyService.getCompanyById(companyId).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          this.selectedCompany(response)
        }
      }
    )
  }

  // getCompanyName(id: any) {
  //   this._companyService.getCompanyById(id).subscribe(
  //     (response) => {
  //       console.log(response);
  //       // if (response) {
  //       //   console.log(response.companyName)
  //       // }
  //     }
  //   )
  // }

  selectedCompany(data: any) {
    sessionStorage.setItem('c_id', data.id);
    sessionStorage.setItem('companyName', data.companyName);
    sessionStorage.setItem('city', data.city);
    sessionStorage.setItem('pinCode', data.pinCode);
    sessionStorage.setItem('stateCode', data.stateCode);
    sessionStorage.setItem('stateName', data.stateName);
    sessionStorage.setItem('gstNo', data.gstNo);
    sessionStorage.setItem('panNo', data.panNo);
    sessionStorage.setItem('cinNo', data.cinNo);
    sessionStorage.setItem('companyEmail', data.email);
    sessionStorage.setItem('companyPhoneNo', data.phoneNo);
    sessionStorage.setItem('isHeadOffice', data.isHeadOffice);
    sessionStorage.setItem('registeredAddress', data.registeredAddress);
    sessionStorage.setItem('corporateAddress', data.corporateAddress);
    sessionStorage.setItem('organizationType', data.organizationType);
    sessionStorage.setItem('businessCategory', data.businessCategory);
    sessionStorage.setItem('description', data.description);
    this._sharedService.handleSuccess(
      this.translate.instant('entitySelectedTitle_TC', { entity: data.companyName })
    )
    this.router.navigate(["/"])
  }

}