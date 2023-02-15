import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'nurse-to-patient',
  templateUrl: './nurse-to-patient-print.component.html',
  styleUrls: ['./nurse-to-patient-print.component.scss']
})
export class NurseToPatientPrintComponent implements OnInit {

  @Input() field: any = {};
  nurseToPatientObject: any = {};
  columns: any = [];
  array = []

  constructor() { }

  ngOnInit(): void {
    this.nurseToPatientObject = this.field.value;
    this.array.push(this.nurseToPatientObject)
    console.log("Nurse To Patient", this.nurseToPatientObject);
  }

}
