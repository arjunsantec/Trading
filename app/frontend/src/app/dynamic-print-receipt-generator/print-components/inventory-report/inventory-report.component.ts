import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-inventory-report',
  templateUrl: './inventory-report.component.html',
  styleUrls: ['./inventory-report.component.scss']
})
export class InventoryReportComponent implements OnInit {

  @Input() field: any = {};
  inventoryReportObject: any = {};
  columns: any = [];
  array = []

  constructor() { }

  ngOnInit(): void {
    this.inventoryReportObject = this.field.value;
    this.array.push(this.inventoryReportObject)
    console.log("Inventory Report", this.array);
    this.setInventoryReportTable();
  }

  setInventoryReportTable() {
    this.columns = [
      { field: 'index', label: '#'},
      { field: 'Project', label: 'project_TC' },
      { field: 'Product', label: 'product_TC' },
      { field: 'Kit number', label: 'kit_no_TC' },
      { field: 'Batch', label: 'batch_TC' },
      { field: 'Serial', label: 'serial_TC' },
      { field: 'Quantity', label: 'Quantity_TC' },
      { field: 'Temp', label: 'temperature_TC' },
      { field: 'Validity', label: 'Validity_TC' },
      { field: 'Status', label: 'pmStatus_TC' },
      { field: 'Note', label: 'note_TC' },
    ];
  }

}
