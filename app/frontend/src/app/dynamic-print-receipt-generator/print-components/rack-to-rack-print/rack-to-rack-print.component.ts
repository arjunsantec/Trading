import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rack-to-rack-print',
  templateUrl: './rack-to-rack-print.component.html',
  styleUrls: ['./rack-to-rack-print.component.scss']
})
export class RackToRackPrintComponent implements OnInit {

  @Input() field: any = {};
  rackObject: any = {};
  columns: any = [];
  array = []

  constructor() { }

  ngOnInit(): void {
    this.rackObject = this.field.value;
    this.array.push(this.rackObject);
    console.log('rack', this.rackObject);
    this.setRackToRackTransferTable();
  }

  setRackToRackTransferTable() {
    this.columns = [
      { field: 'index', label: '#'},
      { field: 'product', label: 'product_TC' },
      { field: 'kitNumber', label: 'kitNumber_TC' },
      { field: 'batchNumber', label: 'batchNumber_TC' },
      { field: 'serialNumber', label: 'serialNumber_TC' },
      { field: 'quantity', label: 'quantity' },
      { field: 'fromRack', label: 'fromRack_TC' },
      { field: 'fromShelf', label: 'fromShelf_TC' },
      { field: 'toShelf', label: 'toShelf' },
      { field: 'toRack', label: 'toRack_TC' },
    ]
  }

}
