import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'expire-date-change',
  templateUrl: './expire-date-change-print.component.html',
  styleUrls: ['./expire-date-change-print.component.scss']
})
export class ExpireDateChangePrintComponent implements OnInit {

  @Input() field: any = {};
  expireDateChangeObject: any = {};
  columns: any = [];
  array = []

  constructor() { }

  ngOnInit(): void {
    this.expireDateChangeObject = this.field.value;
    this.array.push(this.expireDateChangeObject)
    console.log("Expire Date Change Print", this.expireDateChangeObject);
    this.setExpireDateChangeTable();
  }

  setExpireDateChangeTable() {
    this.columns = [
      { field: 'index', label: '#'},
      { field: 'product', label: 'product_TC' },
      { field: 'kit_number', label: 'kit_no_TC' },
      { field: 'batch_no', label: 'batch_no_TC' },
      { field: 'serial_no', label: 'serial_TC' },
      { field: 'quantity', label: 'Quantity_TC' },
      { field: 'existent_date', label: 'existentExpDate_TC' },
      { field: 'project', label: 'project_TC' },
      { field: 'updated_date', label: 'updatedExpDate_TC' },
      { field: 'comment', label: 'comment_TC' },
    ]
  }

}
