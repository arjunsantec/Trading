import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { Refrigeration } from 'src/app/shared/models/wareshouse.model';
import { RefrigerationService } from './services/refrigeration.service';

@Component({
  selector: 'app-refrigeration',
  templateUrl: './refrigeration.component.html',
  styleUrls: ['./refrigeration.component.scss']
})
export class RefrigerationComponent implements OnInit {

  refrigeration: Refrigeration | any = {};
  refrigerationList: Refrigeration[] = new Array<Refrigeration>();
  selectedRefrigerations: Refrigeration[] = new Array<Refrigeration>();
  showRefrigerationModifier: boolean = false;

  formFields: any = [];
  columns: any = [];

  constructor(private http: HttpClient,
    private _refrigerationService: RefrigerationService,
    private _sharedService: SharedService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.setRefrigerationTable();
    this.setRefrigerationFields();
    this.getRefrigerationList();
  }

  setRefrigerationTable() {
    this.columns = [
      { field: 'refrigeratorNumber', label: 'refrigerationNo_TC' },
      { field: 'refrigeratorType', label: 'refrigerationType_TC' },
    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains');
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', {
      entity: this.translate.instant('refrigeration_TC'),
    });
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {
      entity: this.translate.instant('refrigeration_TC'),
    });
  }

  setRefrigerationFields() {
    this.formFields = [
      {
        type: 'text',
        name: 'refrigeratorNumber',
        label: this.translate.instant('refrigerationNo_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('refrigerationNo_TC') }),
        value: this.refrigeration.refrigeratorNumber,
        validation: {
          required: true,
          minlength: 1
        },
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('refrigerationNo_TC') }),
          minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('refrigerationNo_TC'), char: this.translate.instant('one_number') })
        }
      },
      {
        type: 'text',
        name: 'refrigeratorType',
        label: this.translate.instant('refrigerationType_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('refrigerationType_TC') }),
        value: this.refrigeration.refrigeratorType,
        validation: {
          required: true,
          minlength: 1
        },
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('refrigerationType_TC') }),
          minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('refrigerationType_TC'), char: this.translate.instant('one_number') })
        }
      },
    ]
  }

  getFields() {
    return this.formFields;
  }

  getRefrigerationList() {
    this._refrigerationService.getRefrigerationList().subscribe((response) => {
      console.log(response);
      if (response?.results) {
        this.refrigerationList = response?.results;
        // this._sharedService.handleSuccess(
        //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('refrigeration_TC')})
        // );
      }
    });
  }

  deleteRefrigeration(event: Event, refrigeration: Refrigeration) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteSelectedItems_SC', {entity: refrigeration?.refrigeratorNumber}),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._refrigerationService.removeRefrigeration(refrigeration?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {entity: refrigeration?.refrigeratorNumber})
            );
            this.getRefrigerationList()
          }
        )
      }
    })
  }

  editRefrigeration(refrigeration: Refrigeration) {
    this.refrigeration = { ...refrigeration };
    this.setRefrigerationFields();
    this.showRefrigerationModifier = true;
  }

  saveRefrigeration(refrigeration: Refrigeration) {
    if (this.refrigeration?.id) {
      refrigeration.id = this.refrigeration?.id;
    }
    this._refrigerationService.refrigerationModifier(refrigeration).subscribe(
      (response) => {
        console.log(response);
        if (Object.keys(response).length!=0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {entity: refrigeration?.refrigeratorNumber})
          );
          this.showRefrigerationModifier = false;
          this.clearRefrigeration();
          this.getRefrigerationList();
        }
      }
    )
  }

  clearRefrigeration() {
    this.refrigeration = {};
    this.setRefrigerationFields();
  }

}
