import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { UnitMaster } from 'src/app/shared/models/party.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { UnitMasterService } from './services/unit-master.service';

@Component({
  selector: 'app-unit-master-main-page',
  templateUrl: './unit-master-main-page.component.html',
  styleUrls: ['./unit-master-main-page.component.scss']
})
export class UnitMasterMainPageComponent implements OnInit {

  unitMaster: UnitMaster | any = {};
  unitMasterList: UnitMaster[] = new Array<UnitMaster>();
  selectedUnitMasters: UnitMaster[] = new Array<UnitMaster>();
  showUnitMasterModifier: boolean = false;

  unitMasterFields: any = [];
  columns: any = [];

  constructor(private _unitMasterService: UnitMasterService,
    private _sharedService: SharedService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.setUnitMasterTable();
    this.setUnitMasterFields();
    this.getUnitMasterList()
  }

  setUnitMasterTable() {
    this.columns = [
      {field: 'PrimaryUnit', label: 'primaryUnit_TC'},
      {field: 'SecondaryUnit', label: 'secondaryUnit_TC'},
      {field: 'ConversionFactors', label: 'conversionFactors_TC'},
      {field: 'ConversionTotal', label: 'conversionTotal_TC'},
      {field: 'created', label: 'created_TC'},
      {field: 'modified', label: 'modified_TC'},
    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any){
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', {entity: this.translate.instant('unitMaster_TC')})
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {entity: this.translate.instant('unitMaster_TC')})
  }

  setUnitMasterFields() {
    this.unitMasterFields = [
      {
        type: 'dropdown',
        name: 'PrimaryUnit',
        label: this.translate.instant('primaryUnit_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('primaryUnit_TC')}),
        value: this.unitMaster.PrimaryUnit,
        validation: {
          required: true
        },
        required: true,
        options: [
          { id: 'BAGS(Bag)', name: 'BAGS(Bag)' },
          { id: 'BOTTLES(Btl)', name: 'BOTTLES(Btl)' },
          { id: 'BOX(Box)', name: 'BOX(Box)' },
          { id: 'Bundles (Bdl)', name: 'Bundles (Bdl)' },
          { id: 'None', name: 'None' },
          { id: 'CANS(Can)', name: 'CANS(Can)' },
          { id: 'CARTONS(Ctn)', name: 'CARTONS(Ctn)' },
          { id: 'DOZENS(Dzn)', name: 'DOZENS(Dzn)' },
          { id: 'GRAMMES(Gm)', name: 'GRAMMES(Gm)' },
          { id: 'KILOGRAMS(Kg)', name: 'KILOGRAMS(Kg)' },
          { id: 'LITRE(Ltr)', name: 'LITRE(Ltr)' },
          { id: 'METERS(Mtr)', name: 'METERS(Mtr)' },
          { id: 'MILILITRE(Ml)', name: 'MILILITRE(Ml)' },
          { id: 'NUMBERS(Nos)', name: 'NUMBERS(Nos)' },
          { id: 'PACKS(Pac)', name: 'PACKS(Pac)' },
          { id: 'PAIRS(Prs)', name: 'PAIRS(Prs)' },
          { id: 'PIECES(Pcs)', name: 'PIECES(Pcs)' },
          { id: 'QUINTAL(Qtl)', name: 'QUINTAL(Qtl)' },
          { id: 'ROLLS(Rol)', name: 'ROLLS(Rol)' },
          { id: 'SQUARE FEET(Sqf)', name: 'SQUARE FEET(Sqf)' },
          { id: 'Sqm', name: 'Sqm' },
          { id: 'Tbs', name: 'Tbs' },
          { id: 'Cms', name: 'Cms' },
          { id: 'Ounces', name: 'Ounces' }, 
          { id: 'Pounds', name: 'Pounds' },
        ],
        optionLabel: "name",
        optionValue: "id",
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('primaryUnit_TC')})
        }
      },
      {
        type: 'dropdown',
        name: 'SecondaryUnit',
        label: this.translate.instant('secondaryUnit_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('secondaryUnit_TC')}),
        value: this.unitMaster.SecondaryUnit,
        validation: {
          required: true
        },
        required: true,
        options: [
          { id: 'BAGS(Bag)', name: 'BAGS(Bag)' },
          { id: 'BOTTLES(Btl)', name: 'BOTTLES(Btl)' },
          { id: 'BOX(Box)', name: 'BOX(Box)' },
          { id: 'Bundles (Bdl)', name: 'Bundles (Bdl)' },
          { id: 'None', name: 'None' },
          { id: 'CANS(Can)', name: 'CANS(Can)' },
          { id: 'CARTONS(Ctn)', name: 'CARTONS(Ctn)' },
          { id: 'DOZENS(Dzn)', name: 'DOZENS(Dzn)' },
          { id: 'GRAMMES(Gm)', name: 'GRAMMES(Gm)' },
          { id: 'KILOGRAMS(Kg)', name: 'KILOGRAMS(Kg)' },
          { id: 'LITRE(Ltr)', name: 'LITRE(Ltr)' },
          { id: 'METERS(Mtr)', name: 'METERS(Mtr)' },
          { id: 'MILILITRE(Ml)', name: 'MILILITRE(Ml)' },
          { id: 'NUMBERS(Nos)', name: 'NUMBERS(Nos)' },
          { id: 'PACKS(Pac)', name: 'PACKS(Pac)' },
          { id: 'PAIRS(Prs)', name: 'PAIRS(Prs)' },
          { id: 'PIECES(Pcs)', name: 'PIECES(Pcs)' },
          { id: 'QUINTAL(Qtl)', name: 'QUINTAL(Qtl)' },
          { id: 'ROLLS(Rol)', name: 'ROLLS(Rol)' },
          { id: 'SQUARE FEET(Sqf)', name: 'SQUARE FEET(Sqf)' },
          { id: 'Sqm', name: 'Sqm' },
          { id: 'Tbs', name: 'Tbs' },
          { id: 'Cms', name: 'Cms' },
          { id: 'Ounces', name: 'Ounces' },
          { id: 'Pounds', name: 'Pounds' },
        ],
        optionLabel: "name",
        optionValue: "id",
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('secondaryUnit_TC')})
        }
      },
      {
        type: 'text',
        name: 'ConversionFactors',
        label: this.translate.instant('conversionFactors_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('conversionFactors_TC')}),
        value: this.unitMaster.ConversionFactors,
        validation: {
          required: true,
          minlength: 1
        },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('conversionFactors_TC')}),
          minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('conversionFactors_TC'), char: this.translate.instant('one_number')})
        }
      },
      {
        type: 'text',
        name: 'ConversionTotal',
        label: this.translate.instant('conversionTotal_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('conversionTotal_TC')}),
        value: this.unitMaster.ConversionTotal,
        validation: {
          required: true,
          minlength: 1
        },
        // prefixGroupBy: true,
        // prefixGroupByIcon: 'pi-user',
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('conversionTotal_TC')}),
          minlength: this.translate.instant("formMinLengthError_SC", { label: this.translate.instant('conversionTotal_TC'), char: this.translate.instant('one_number')})
        }
      }
    ]
  }

  getFields() {
    return this.unitMasterFields;
  }

  getUnitMasterList() {
    this._unitMasterService.getUnitMasterList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.unitMasterList = response?.results;
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('unitMaster_TC')})
          // )
        }
      }
    )
  }

  deleteUnitMaster(event: Event, unitMaster: UnitMaster) {
    if (event.defaultPrevented) return; 
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteSelectedItems_SC', {entity: this.translate.instant('unitMaster_TC')}),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._unitMasterService.removeUnitMaster(unitMaster?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {entity: unitMaster?.PrimaryUnit})
            );
            this.getUnitMasterList();
          }
        )
      }
    });
  }

  editUnitMaster(unitMaster: UnitMaster) {
    this.unitMaster = { ...unitMaster };
    this.setUnitMasterFields();
    this.showUnitMasterModifier = true
  }

  saveUnitMaster(unitMaster: UnitMaster) {
    this.showUnitMasterModifier = false;
    if (this.unitMaster?.id) {
      unitMaster.id = this.unitMaster?.id;
      this.clearUnitMaster();
    }
    this._unitMasterService.unitMasterModifier(unitMaster).subscribe(
      (response) => {
        console.log(response);
        if (Object.keys(response).length!=0) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {entity: unitMaster?.PrimaryUnit})
          );
          this.getUnitMasterList();
        }
      }
    )
  }

  clearUnitMaster() {
    this.unitMaster = {};
    this.setUnitMasterFields();
  }

}
