import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { PalletCreation } from 'src/app/shared/models/wareshouse.model';
import { PalletCreationService } from './services/pallet-creation.service';

@Component({
  selector: 'app-pallet-creation',
  templateUrl: './pallet-creation.component.html',
  styleUrls: ['./pallet-creation.component.scss']
})
export class PalletCreationComponent implements OnInit {

  palletCreation: PalletCreation | any = {};
  palletCreationList: PalletCreation[] = new Array<PalletCreation>();
  selectedPalletCreations: PalletCreation[] = new Array<PalletCreation>();
  showPalletCreationModifier: boolean = false;

  formFields: any = [];
  columns: any = [];

  constructor(private http: HttpClient,
    private _palletCreationService: PalletCreationService,
    private _sharedService: SharedService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.setPalletCreationTable();
    this.setPalletCreationFields();
    this.getPalletCreationList();
  }

  setPalletCreationTable() {
    this.columns = [
      { field: 'palletNumber', label: 'palletNo_TC' },
      { field: 'palletType', label: 'palletType_TC' },
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
      entity: this.translate.instant('palletCreation_TC'),
    });
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {
      entity: this.translate.instant('palletCreation_TC'),
    });
  }

  setPalletCreationFields() {
    this.formFields = [
      {
        type: 'text',
        name: 'palletNumber',
        label: this.translate.instant('palletNo_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('palletNo_TC') }),
        value: this.palletCreation.palletNumber,
        validation: {
          required: true,
          minlength: 1
        },
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('palletNo_TC') }),
          minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('palletNo_TC'), char: this.translate.instant('one_number') })
        }
      },
      {
        type: 'dropdown',
        name: 'palletType',
        label: this.translate.instant('palletType_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', {
          label: this.translate.instant('palletType_TC'),
        }),
        value: this.palletCreation.palletType,
        required: true,
        validation: {
          required: true,
        },
        options: [
          { id: 'Wodden', name: 'Wodden' },
          { id: 'Steel', name: 'Steel' },
          { id: 'Plastic', name: 'Plastic' },
          { id: 'Fibre', name: 'Fibre' },
          { id: 'Other', name: 'Other' },
        ],
        optionLabel: 'name',
        optionValue: 'id',
        errorText: {
          required: this.translate.instant('formRequiredError_SC', {
            label: this.translate.instant('palletType_TC'),
          }),
        },
      },
    ]
  }

  getFields() {
    return this.formFields;
  }

  getPalletCreationList() {
    this._palletCreationService.getPalletList().subscribe((response) => {
      console.log(response);
      if (response?.results) {
        this.palletCreationList = response?.results;
        // this._sharedService.handleSuccess(
        //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('palletCreation_TC')})
        // );
      }
    });
  }

  deletePalletCreation(event: Event, palletCreation: PalletCreation) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteSelectedItems_SC', {entity: palletCreation?.palletNumber}),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._palletCreationService.removePallet(palletCreation?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {entity: palletCreation?.palletNumber})
            );
            this.getPalletCreationList()
          }
        )
      }
    })
  }

  editPalletCreation(palletCreation: PalletCreation) {
    this.palletCreation = { ...palletCreation };
    this.setPalletCreationFields();
    this.showPalletCreationModifier = true;
  }

  savePalletCreation(palletCreation: PalletCreation) {
    if (this.palletCreation?.id) {
      palletCreation.id = this.palletCreation?.id;
    }
    this._palletCreationService.palletModifier(palletCreation).subscribe(
      (response) => {
        console.log(response);
        if (Object.keys(response).length!=0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {entity: palletCreation?.palletNumber})
          );
          this.showPalletCreationModifier = false;
          this.clearPalletCreation();
          this.getPalletCreationList();
        }
      }
    )
  }

  clearPalletCreation() {
    this.palletCreation = {};
    this.setPalletCreationFields();
  }

}
