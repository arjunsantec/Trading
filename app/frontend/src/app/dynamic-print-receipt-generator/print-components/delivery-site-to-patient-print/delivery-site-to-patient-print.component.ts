import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'delivery-site-to-patient-print',
  templateUrl: './delivery-site-to-patient-print.component.html',
  styleUrls: ['./delivery-site-to-patient-print.component.scss']
})
export class DeliverySiteToPatientPrintComponent implements OnInit {

  @Input() field: any = {};
  deliverySiteToPatientObject: any = {};
  columns: any = [];
  array = []

  constructor() { }

  ngOnInit(): void {
    this.deliverySiteToPatientObject = this.field.value;
    this.array.push(this.deliverySiteToPatientObject)
    console.log("Delivery Site To Patient", this.deliverySiteToPatientObject);
    this.setDeliverySiteToPatientTable();
  }

  setDeliverySiteToPatientTable() {
    this.columns = [
      { field: 'index', label: '#'},
      { field: 'productName', label: 'product_TC' },
      { field: 'quantity', label: 'Quantity_TC' },
      { field: 'kit_number', label: 'kit_no_TC' },
      { field: 'batch_no', label: 'batch_no_TC' },
      { field: 'serial_no', label: 'serial_TC' },
      { field: 'temp', label: 'temperature_TC' },
      { field: 'note', label: 'note_TC' },
    ]
  }

}
