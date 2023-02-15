import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { AppSettings } from 'src/app/shared/models/company.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { AppSettingsService } from './services/app-settings.service';

@Component({
  selector: 'app-app-settings-main-page',
  templateUrl: './app-settings-main-page.component.html',
  styleUrls: ['./app-settings-main-page.component.scss']
})
export class AppSettingsMainPageComponent implements OnInit {

  appSettings: AppSettings | any = {};
  appSettingsList: AppSettings[] = new Array<AppSettings>();
  selectedAppSettings: AppSettings[] = new Array<AppSettings>();
  showAppSettingsModifier: boolean = false;

  formFields: any = [];
  columns: any = [];

  constructor(private _appSettingsService: AppSettingsService,
    private _sharedService: SharedService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.setAppSettingsTable();
    this.setAppSettingsFields();
    this.getAppSettingsList();
  }

  setAppSettingsTable() {
    this.columns = [
      {field: 'appKey', label: 'appKey_TC'},
      {field: 'appValue', label: 'appValue_TC'},
    ]
  }

  globalSearch(event: any, dt: any){
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any){
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', {entity: this.translate.instant('appSettings_TC')})
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {entity: this.translate.instant('appSettings_TC')})
  }

  setAppSettingsFields() {
    this.formFields = [
      {
        type: 'text',
        name: 'appKey',
        label: this.translate.instant('appKey_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('appKey_TC')}),
        value: this.appSettings.appKey,
        validation: {
          required: true,
          minlength: 1
        },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('appKey_TC')}),
          minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('appKey_TC'), char: this.translate.instant('one_number')})
        }
      },
      {
        type: 'text',
        name: 'appValue',
        label: this.translate.instant('appValue_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('appValue_TC')}),
        value: this.appSettings.appValue,
        validation: {
          required: true,
          minlength: 1
        },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('appValue_TC')}),
          minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('appValue_TC'), char: this.translate.instant('one_number')})
        }
      },
    ]
  }

  getFields() {
    return this.formFields;
  }

  getAppSettingsList() {
    this._appSettingsService.getAppSettingsList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.appSettingsList = response?.results;
        }
      }
    )
  }

  editAppSettings(appSettings: AppSettings) {
    this.appSettings = { ...appSettings };
    this.setAppSettingsFields();
    this.showAppSettingsModifier = true;
  }

  deleteAppSettings(event: Event, appSettings: AppSettings) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', {entity: appSettings?.appKey}),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._appSettingsService.removeAppSettings(appSettings?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {entity: appSettings?.appKey})
            );
            this.getAppSettingsList();
          }
        )
      }
    });
  }

  saveAppSettings(appSettings: AppSettings) {
    if (this.appSettings?.id) {
      appSettings.id = this.appSettings?.id;
    }
    this._appSettingsService.appSettingsModifier(appSettings).subscribe(
      (response) => {
        console.log(response);
        if (Object.keys(response).length!=0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {entity: appSettings?.appKey})
          );
          this.showAppSettingsModifier = false;
          this.clearAppSettings();
          this.getAppSettingsList();
        }
      }
    )
  }

  clearAppSettings() {
    this.appSettings = {};
    this.setAppSettingsFields();
  }

}
