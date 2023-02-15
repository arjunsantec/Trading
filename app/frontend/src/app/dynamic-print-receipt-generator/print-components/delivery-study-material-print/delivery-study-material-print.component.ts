import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-delivery-study-material-print',
  templateUrl: './delivery-study-material-print.component.html',
  styleUrls: ['./delivery-study-material-print.component.scss']
})
export class DeliveryStudyMaterialPrintComponent implements OnInit {

  @Input() field: any = {};
  deliveryStudyMaterialObject: any = {};
  columns: any = [];
  array = []

  constructor() { }

  ngOnInit(): void {
    this.deliveryStudyMaterialObject = this.field.value;
    this.array.push(this.deliveryStudyMaterialObject)
    console.log("Delivery Study Material", this.deliveryStudyMaterialObject);
    this.setDeliveryStudyMaterialTable();
  }

  setDeliveryStudyMaterialTable() {
    this.columns = [
      { field: 'index', label: '#'},
      { field: 'productName', label: 'product_TC' },
      { field: 'quantity', label: 'Quantity_TC' },
      { field: 'kit_number', label: 'kit_no_TC' },
      { field: 'batch_no', label: 'batch_no_TC' },
      { field: 'serial_no', label: 'serial_TC' },
      { field: 'validity', label: 'Validity_TC' },
      { field: 'temp', label: 'temperature_TC' },
      { field: 'receive_date', label: 'receiveDate_TC' },
      { field: 'comment', label: 'comment_TC' },
    ]
  }

}
