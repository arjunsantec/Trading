import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { SharedService } from 'src/app/shared/services/shared.service';
import { NurseToPatient } from 'src/app/shared/models/studymanage.model';
import { NurseToPatientService } from './services/nurse-to-patient.service';
import { PartyMaster } from 'src/app/shared/models/party.model';
import { PartyMasterService } from 'src/app/master/modules/party-master-main-page/services/party-master.service';
import { ProjectCreation } from 'src/app/shared/models/project.model';
import { ProjectService } from 'src/app/project/modules/project-main-page/services/project.service';

@Component({
  selector: 'app-nurse-to-patient',
  templateUrl: './nurse-to-patient.component.html',
  styleUrls: ['./nurse-to-patient.component.scss']
})
export class NurseToPatientComponent implements OnInit {

  nurseToPatient: NurseToPatient | any = {};
  nurseToPatientList: NurseToPatient[] = new Array<NurseToPatient>();
  selectedNurseToPatient: NurseToPatient[] = new Array<NurseToPatient>();
  showNurseToPatientModifier: boolean = false;
  partyList: PartyMaster[] = new Array<PartyMaster>();

  columns: any = [];
  formFields: any = [];

  showNurseToPatientPrintModifier: boolean = false;
  printFields: any = [];
  nurseToPatientObject = {};
  projectList: ProjectCreation[] = new Array<ProjectCreation>();

  constructor(public translate: TranslateService,
    private _sharedService: SharedService,
    private confirmationService: ConfirmationService,
    private _nurseToPatientService: NurseToPatientService,
    private _projectService: ProjectService,
    private _pratyService: PartyMasterService,) { }

  ngOnInit(): void {
    this.setNurseToPatientTable();
    this.setNurseToPatientCreationFields();
    this.getNurseToPatientList();
    this.getPartyList();
    this.getProjectList();
  }

  setNurseToPatientTable() {
    this.columns = [
      { field: 'site', label: 'siteName_TC' },
      // { field: 'siteAddress', label: 'siteAddress_TC' },
      // { field: 'sitePhone', label: 'sitePhone_TC' },
      { field: 'patient', label: 'patientName_TC' },
      // { field: 'patientAddress', label: 'patientAddress_TC' },
      // { field: 'patientPhone', label: 'patientPhone_TC' },
      { field: 'Document', label: 'document_TC' },
      { field: 'Sponsor', label: 'sponsor_TC' },
      { field: 'Protocol', label: 'portocol_TC' },
      { field: 'projectName', label: 'project_TC' },
    ]
  }

  globalSearch(event: any, dt: any) {
    return dt.filterGlobal(event.target.value, 'contains')
  }

  export(dt: any) {
    return dt.exportCSV();
  }

  getTitleModifier() {
    return this.translate.instant('entityModifier_TC', { entity: this.translate.instant('nurseToPatientCreation_TC') })
  }

  getTitlePage() {
    return this.translate.instant('manageEntity_TC', { entity: this.translate.instant('nurseToPatientCreation_TC') })
  }

  setNurseToPatientCreationFields() {
    this.formFields = [
      {
        type: 'fieldset',
        headerText: this.translate.instant('siteDetails_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'siteName',
            label: this.translate.instant('siteName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('siteName_TC'),
            }),
            value: this.nurseToPatient.siteName,
            validation: {
              required: true,
            },
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            onValueChange: this.onChangeSitePartyValue.bind(this),
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('siteName_TC') }),
            }
          },
          {
            type: 'text',
            name: 'sitePhone',
            label: this.translate.instant('sitePhone_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('sitePhone_TC'),
            }),
            value: this.nurseToPatient.sitePhone,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('sitePhone_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'siteAddress',
            label: this.translate.instant('siteAddress_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('siteAddress_TC'),
            }),
            value: this.nurseToPatient.siteAddress,
            multiline: true,
            validation: {
              required: true,
              maxlength: 500,
            },
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('siteAddress_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('siteAddress_TC'),
                char: this.translate.instant('five_hundred_number'),
              }),
            },
          },

        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('patientDetails_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'dropdown',
            name: 'patientName',
            label: this.translate.instant('patientName_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('patientName_TC'),
            }),
            value: this.nurseToPatient.patientName,
            validation: {
              required: true,
            },
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            onValueChange: this.onChangePatientPartyValue.bind(this),
            errorText: {
              required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('patientName_TC') }),
            }
          },
          {
            type: 'text',
            name: 'patientPhone',
            label: this.translate.instant('patientPhone_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('patientPhone_TC'),
            }),
            value: this.nurseToPatient.patientPhone,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('patientPhone_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          {
            type: 'text',
            name: 'patientAddress',
            label: this.translate.instant('patientAddress_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('patientAddress_TC'),
            }),
            value: this.nurseToPatient.patientAddress,
            multiline: true,
            disabled: false,
            validation: {
              required: true,
              maxlength: 500,
            },
            selectionMode: 'single',
            errorText: {
              required: this.translate.instant('formRequiredError_SC', {
                label: this.translate.instant('patientAddress_TC'),
              }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('patientAddress_TC'),
                char: this.translate.instant('five_hundred_number'),
              }),
            },
          },

        ]
      },
      {
        type: 'fieldset',
        headerText: this.translate.instant('technicalSpecification_TC'),
        footerText: '',
        fillScreen: false,
        fields: [
          {
            type: 'text',
            name: 'Document',
            label: this.translate.instant('document_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('document_TC'),
            }),
            value: this.nurseToPatient.Document,
            validation: {
              // required: true,
              maxlength: 50,
            },
            errorText: {
              // required: this.translate.instant('formRequiredError_SC', {
              //   label: this.translate.instant('document_TC'),
              // }),
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('document_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          // {
          //   type: 'text',
          //   name: 'Sponsor',
          //   label: this.translate.instant('sponsor_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('sponsor_TC'),
          //   }),
          //   value: this.nurseToPatient.Sponsor,
          //   validation: {
          //     maxlength: 50,
          //   },
          //   errorText: {
          //     maxlength: this.translate.instant('formMaxLengthError_SC', {
          //       label: this.translate.instant('sponsor_TC'),
          //       char: this.translate.instant('fifty_number'),
          //     }),
          //   },
          // },
          {
            type: 'dropdown',
            name: 'sponsor',
            label: this.translate.instant('sponsor_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('sponsor_TC'),
            }),
            value: this.nurseToPatient.sponsor,
            // validation: {
            //   required: true,
            // },
            options: this.partyList,
            optionLabel: "partyName",
            optionValue: "id",
            // errorText: {
            //   required: this.translate.instant("formRequiredError_SC", { label: this.translate.instant('sponsor_TC') }),
            // }
          },
          {
            type: 'text',
            name: 'Protocol',
            label: this.translate.instant('portocol_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('portocol_TC'),
            }),
            value: this.nurseToPatient.Protocol,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('portocol_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
          // {
          //   type: 'text',
          //   name: 'Project',
          //   label: this.translate.instant('project_TC'),
          //   placeholder: this.translate.instant('formPlaceholder_SC', {
          //     label: this.translate.instant('project_TC'),
          //   }),
          //   value: this.nurseToPatient.Project,
          //   validation: {
          //     maxlength: 50,
          //   },
          //   errorText: {
          //     maxlength: this.translate.instant('formMaxLengthError_SC', {
          //       label: this.translate.instant('project_TC'),
          //       char: this.translate.instant('fifty_number'),
          //     }),
          //   },
          // },
          {
            type: 'dropdown',
            name: 'project',
            label: this.translate.instant('project_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('project_TC'),
            }),
            value: this.nurseToPatient.project,
            // required: true,
            // validation: {
            //   required: true,
            // },
            options: this.projectList,
            optionLabel: "projectName",
            optionValue: "id",
          },
          {
            type: 'text',
            name: 'Invoice',
            label: this.translate.instant('Invoice_TC'),
            placeholder: this.translate.instant('formPlaceholder_SC', {
              label: this.translate.instant('Invoice_TC'),
            }),
            value: this.nurseToPatient.Invoice,
            validation: {
              maxlength: 50,
            },
            errorText: {
              maxlength: this.translate.instant('formMaxLengthError_SC', {
                label: this.translate.instant('Invoice_TC'),
                char: this.translate.instant('fifty_number'),
              }),
            },
          },
        ],
      },
    ]
  }

  getFields() {
    return this.formFields;
  }

  getProjectList() {
    this._projectService.getProjectList().subscribe((response) => {
      console.log('project list', response);
      if (response?.results) {
        this.projectList = response?.results;
        console.log('project list', this.projectList);
        this.setNurseToPatientCreationFields();
      }
    })
  }

  getPartyList() {
    this._pratyService.getPartyMasterList().subscribe(
      (response) => {
        console.log("check results", response)
        if (response?.results) {
          this.partyList = response?.results;
          console.log("party list", this.partyList)
          this.setNurseToPatientCreationFields();
        }
      }
    )
  }

  onChangeSitePartyValue(prevValue: any, value: any, formValue: any) {
    // console.log("check prevalue", prevValue)
    console.log("check value", value)
    // console.log("check formValue", formValue)
    console.log(this.formFields);
    const formValueUpdated: any = {};
    let object: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      object = this.partyList.filter(e => e.id === value)[0];
      console.log('Site Object', object);
      formValueUpdated.sitePhone = object.phoneNumber;
      formValueUpdated.siteAddress = object.companyAddress;
    }
    return formValueUpdated;
  }

  onChangePatientPartyValue(prevValue: any, value: any, formValue: any) {
    console.log("value", value)
    const formValueUpdated: any = {};
    let object: any = {};
    if (formValue) {
      Object.assign(formValueUpdated, formValue);
    }
    if (value) {
      object = this.partyList.filter(e => e.id === value)[0];
      console.log('Patient Object', object);
      formValueUpdated.patientAddress = object.companyAddress;
      formValueUpdated.patientPhone = object.phoneNumber;
    }
    return formValueUpdated;
  }

  getNurseToPatientList() {
    this._nurseToPatientService.getNurseToPatientList()
      .subscribe((response) => {
        console.log(response);
        if (response?.results) {
          this.nurseToPatientList = response?.results;
          console.log("check nurse to patient transportation",this.nurseToPatientList)
          // this._sharedService.handleSuccess(
          //   this.translate.instant('entityListLoadedSuccessTitle_TC', {entity: this.translate.instant('nurseToPatientCreation_TC')})
          // );
        }
      });
  }

  deleteNurseToPatient(event: Event, nurseToPatient: NurseToPatient) {
    if (event.defaultPrevented) return;
    event.preventDefault();
    this.confirmationService.confirm({
      target: event.currentTarget || undefined,
      message: this.translate.instant('entityDeleteItem_SC', {
        entity: '',
      }),
      header: this.translate.instant('confirm_TC'),
      icon: 'pi pi-exclamation-triangle',
      key: 'deleteItem',
      accept: () => {
        this._nurseToPatientService.removeNurseToPatient(nurseToPatient?.id)
          .subscribe((response) => {
            console.log(response);
            this._sharedService.handleSuccess(
              this.translate.instant('entityDeleteSuccessTitle_TC', {
                entity: '',
              })
            );
            this.getNurseToPatientList();
          });
      },
    });
  }

  editNurseToPatient(nurseToPatient: NurseToPatient) {
    console.log("nurseToPatient object", nurseToPatient)
    this.nurseToPatient = { ...nurseToPatient };
    this.setNurseToPatientCreationFields();
    this.showNurseToPatientModifier = true;
  }

  saveNurseToPatient(nurseToPatient: NurseToPatient) {
    console.log("Save", nurseToPatient)
    if (this.nurseToPatient?.id) {
      nurseToPatient.id = this.nurseToPatient?.id;
    }
    this._nurseToPatientService.nurseToPatientModifier(nurseToPatient).subscribe((response) => {
        console.log(response);
        if (Object.keys(response).length != 0) {
          console.log('response', response);
          this._sharedService.handleSuccess(
            this.translate.instant('entityUpdateSuccessTitle_TC', {
              entity: '',
            })
          );
          this.showNurseToPatientModifier = false;
          this.clearNurseToPatient();
          this.getNurseToPatientList();
        }
      });
  }

  clearNurseToPatient() {
    this.nurseToPatient = {};
    this.setNurseToPatientCreationFields();
  }

  generateFields() {
    this.printFields = [
      // {
      //   type: 'header',
      //   label_1: 'ფორმა 064_მედდის ტრანსპორტირება ადგილიდან პაციენტზე',
      //   label_2: 'Form 064_Nurse transportation from site to patient',
      // },
      {
        type: 'nursetopatient',
        value: this.nurseToPatientObject,
      },
      // {
      //   type: 'footerheader',
      //   label_1: `ინვოისი / Invoice - ${this.nurseToPatientObject['Invoice']}`,
      //   label_2: 'დამატებითი ინფორმაცია / Additional Information',
      // },
      // {
      //   type: 'footerbody',
      //   label_1: `<div  style='margin-bottom: 1px'>
      //   <p ><b>კურიერი / Courier :</b> &emsp;________________________  , <b>ხელმოწერა / Signature : ________________________</b></p>
      //   <p><b>ტრანსპორტის დაწყების დრო / Transportation Start Time : &emsp;________________________ </b></p>

      //   <p><b>მედდა / Nurse :</b> &emsp; ________________________ , <b>ხელმოწერა / Signature : ________________________</b></p>
      //   <p><b>პროცედურის დაწყების დრო / Procedure Start Time : &emsp;________________________ </b></p>
      //   <p><b>პაციენტი / Patient :</b> &emsp; ________________________ ,<b>ხელმოწერა / Signature : ________________________</b></p>
      //   <p><b>პროცედურის Დასასრული დრო / Procedure End Time : &emsp;________________________ </b></p>

      //   <p><b>მედდა / Nurse : &emsp; ________________________ , <b>ხელმოწერა / Signature : ________________________</b></p>
      //   <p ><b>კურიერი / Courier :</b> &emsp;________________________  , <b>ხელმოწერა / Signature : ________________________</b></p>
      //   <p><b>მედდა მიტანის დრო / Nurse Delivery Time : &emsp; ________________________ </b></p>

      //   <hr>
      //   <p style="word-spacing:1px; font-size: medium;">
      //   სსპ/SOP-32, ვერსია/Version-01, ფორმა/Form-064
      //   </p>
      //   </div>
      //   <hr>`,
      // },
      // {
      //   type: 'footer',
      // }
    ]
  }

  getPrintFields() {
    return this.printFields;
  }

  printNurseToPatient(nurseToPatient: NurseToPatient) {
    this.nurseToPatientObject = nurseToPatient;
    this.showNurseToPatientPrintModifier = true;
    this.generateFields();
  }

}
