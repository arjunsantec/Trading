import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { GRNDetails } from 'src/app/shared/models/inventory.model';
import { SharedService } from 'src/app/shared/services/shared.service';
import { GrnDetailsService } from './services/grn-details.service';

@Component({
  selector: 'app-grn-details-main-page',
  templateUrl: './grn-details-main-page.component.html',
  styleUrls: ['./grn-details-main-page.component.scss']
})
export class GrnDetailsMainPageComponent implements OnInit {

  grnDetails: GRNDetails | any = {};
  grnDetailsList: GRNDetails[] = new Array<GRNDetails>();
  selectedGRNDetails: GRNDetails[] = new Array<GRNDetails>();
  showGRNDetailsModifier: boolean = false;

  formFields: any = [];
  columns: any = [];

  constructor(private _grnDetailsService: GrnDetailsService,
    private _sharedService: SharedService,
    public translate: TranslateService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.setGRNDetailsFields();
    this.setGRNDetailsTable();
    this.getGRNDetailsList();
  }

  setGRNDetailsTable() {
    this.columns = [
      {field: 'created', label: 'created_TC'},
      {field: 'modified', label: 'modified_TC'},
      {field: 'user_created', label: 'user_created_TC'},
      {field: 'user_modified', label: 'user_modified_TC'},
      {field: 'guid', label: 'guid_TC'},
      {field: 'is_active', label: 'is_active_TC'},
      {field: 'product_code', label: 'productCode_TC'},
      {field: 'product_name', label: 'productName_TC'},
      {field: 'trc_no', label: 'trc_no_TC'},
      {field: 'trc_date', label: 'trc_date_TC'},
      {field: 'kit_no', label: 'kit_no_TC'},
      {field: 'batch_no', label: 'batch_no_TC'},
      {field: 'expiry', label: 'expiry_TC'},
      {field: 'serial_number', label: 'serial_number_TC'},
      {field: 'manufacture', label: 'manufacture_TC'},
      {field: 'temp', label: 'temp_TC'},
      {field: 'recevied_qty', label: 'recevied_qty_TC'},
      {field: 'unit', label: 'unit_TC'},
      {field: 'unit_price', label: 'unit_price_TC'},
      {field: 'base_price', label: 'basePrice_TC'},
      {field: 'gst', label: 'gst_TC'},
      {field: 'unit_net_price', label: 'unit_net_price_TC'},
      {field: 'net_price', label: 'net_price_TC'},
      {field: 'ware_house', label: 'ware_house_TC'},
      {field: 'zone', label: 'zone_TC'},
      {field: 'rack', label: 'rack_TC'},
      {field: 'shelf', label: 'shelf_TC'},
      {field: 'note', label: 'note_TC'},
      {field: 'is_flag', label: 'is_flag_TC'},
      {field: 'material_receipt', label: 'material_receipt_TC'},
    ]
  }

  globalSearch(event: any, dt: any){
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any){
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', {entity: this.translate.instant('grnDetails_TC')})
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', {entity: this.translate.instant('grnDetails_TC')})
  }

  setGRNDetailsFields() {
    this.formFields = [
      {
        type: 'text',
        name: 'created',
        label: this.translate.instant('created_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('created_TC')}),
        value: this.grnDetails.created,
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
      },
      {
        type: 'text',
        name: 'modified',
        label: this.translate.instant('modified_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('modified_TC')}),
        value: this.grnDetails.modified,
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
      },
      {
        type: 'boolean',
        name: 'is_active',
        label: this.translate.instant('is_active_TC'),
        value: this.grnDetails.is_active,
      },
      {
        type: 'text',
        name: 'product_code',
        label: this.translate.instant('productCode_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('productCode_TC')}),
        value: this.grnDetails.product_code,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('productCode_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'product_name',
        label: this.translate.instant('productName_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('productName_TC')}),
        value: this.grnDetails.product_name,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('productName_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'trc_no',
        label: this.translate.instant('trc_no_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('trc_no_TC')}),
        value: this.grnDetails.trc_no,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('trc_no_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'date',
        name: 'trc_date',
        label: this.translate.instant('trc_date_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('trc_date_TC')}),
        value: this.grnDetails.trc_date,
        validation: {
          required: true,
        },
        selectionMode: 'single',
        errorText: {
          required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('trc_date_TC')}),
        }
      },
      {
        type: 'text',
        name: 'kit_no',
        label: this.translate.instant('kit_no_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('kit_no_TC')}),
        value: this.grnDetails.kit_no,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('kit_no_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'batch_no',
        label: this.translate.instant('batch_no_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('batch_no_TC')}),
        value: this.grnDetails.batch_no,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('batch_no_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'expiry',
        label: this.translate.instant('expiry_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('expiry_TC')}),
        value: this.grnDetails.expiry,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('expiry_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'serial_number',
        label: this.translate.instant('serial_number_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('serial_number_TC')}),
        value: this.grnDetails.serial_number,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('serial_number_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'serial_number',
        label: this.translate.instant('serial_number_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('serial_number_TC')}),
        value: this.grnDetails.serial_number,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('serial_number_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'temp',
        label: this.translate.instant('temp_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('temp_TC')}),
        value: this.grnDetails.temp,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('temp_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'recevied_qty',
        label: this.translate.instant('recevied_qty_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('recevied_qty_TC')}),
        value: this.grnDetails.recevied_qty,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('recevied_qty_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'unit',
        label: this.translate.instant('unit_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('unit_TC')}),
        value: this.grnDetails.unit,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('unit_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'unit_price',
        label: this.translate.instant('unit_price_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('unit_price_TC')}),
        value: this.grnDetails.unit_price,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('unit_price_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'base_price',
        label: this.translate.instant('basePrice_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('basePrice_TC')}),
        value: this.grnDetails.base_price,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('basePrice_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'gst',
        label: this.translate.instant('gst_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('gst_TC')}),
        value: this.grnDetails.gst,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('gst_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'unit_net_price',
        label: this.translate.instant('unit_net_price_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('unit_net_price_TC')}),
        value: this.grnDetails.unit_net_price,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('unit_net_price_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'net_price',
        label: this.translate.instant('net_price_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('net_price_TC')}),
        value: this.grnDetails.net_price,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('net_price_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'ware_house',
        label: this.translate.instant('ware_house_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('ware_house_TC')}),
        value: this.grnDetails.ware_house,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('ware_house_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'zone',
        label: this.translate.instant('zone_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('zone_TC')}),
        value: this.grnDetails.zone,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('zone_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'rack',
        label: this.translate.instant('rack_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('rack_TC')}),
        value: this.grnDetails.rack,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('rack_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'shelf',
        label: this.translate.instant('shelf_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('shelf_TC')}),
        value: this.grnDetails.shelf,
        validation: {
          maxlength: 30,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('shelf_TC'), char: this.translate.instant('thirty_number')}),
        }
      },
      {
        type: 'text',
        name: 'note',
        label: this.translate.instant('note_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('note_TC')}),
        value: this.grnDetails.note,
        validation: {
          maxlength: 90,
        },
        prefixGroupBy: true,
        prefixGroupByIcon: 'pi-user',
        errorText: {
          maxlength: this.translate.instant("formMaxLengthError_SC", { label: this.translate.instant('note_TC'), char: this.translate.instant('ninety_number')}),
        }
      },
      {
        type: 'boolean',
        name: 'is_flag',
        label: this.translate.instant('is_flag_TC'),
        value: this.grnDetails.is_flag,
      },
      {
        type: 'text',
        name: 'material_receipt',
        label: this.translate.instant('material_receipt_TC'),
        placeholder: this.translate.instant('formPlaceholder_SC', { label: this.translate.instant('material_receipt_TC')}),
        value: this.grnDetails.material_receipt,
        keyFilter: "int",
        errorText: this.translate.instant("formIntegerError_SC", { label: this.translate.instant('material_receipt_TC')}),
      },
    ]
  }

  getFields() {
    return this.formFields;
  }

  getGRNDetailsList() {
    this._grnDetailsService.getGRNDetailsList().subscribe(
      (response) => {
        console.log(response);
        if (response?.results) {
          this.grnDetailsList = response?.results;
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('grnDetails_TC')})
          // );
        }
      }
    )
  }

  editGRNDetails(grnDetails: GRNDetails) {
    this.grnDetails = { ...grnDetails };
    this.setGRNDetailsFields();
    this.showGRNDetailsModifier = true;
  }

  deleteGRNDetails(event: Event, grnDetails: GRNDetails) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', {entity: grnDetails?.created}),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._grnDetailsService.removeGRNDetails(grnDetails?.id).subscribe(
          (response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {entity: grnDetails?.created})
            );
            this.getGRNDetailsList();
          }
        )
      }
    });
  }  

  saveGRNDetails(grnDetails: GRNDetails) {
    this.showGRNDetailsModifier = false;
    if(this.grnDetails?.id) {
      grnDetails.id = this.grnDetails?.id;
      this.clearGRNDetails();
    }
    this._grnDetailsService.grnDetailsModifier(grnDetails).subscribe(
      (response) => {
        console.log(response);
        if (response) {
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {entity: grnDetails?.created})
          );
          this.getGRNDetailsList();
        }
      }
    )
  }

  clearGRNDetails() {
    this.grnDetails = {};
    this.setGRNDetailsFields();
  }
}
