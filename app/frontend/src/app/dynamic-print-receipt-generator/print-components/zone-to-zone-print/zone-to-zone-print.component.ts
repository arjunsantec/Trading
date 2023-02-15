import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-zone-to-zone-print',
  templateUrl: './zone-to-zone-print.component.html',
  styleUrls: ['./zone-to-zone-print.component.scss']
})
export class ZoneToZonePrintComponent implements OnInit {

  @Input() field: any = {};
  zoneObject: any = {};
  columns: any = [];
  array = []

  constructor() { }

  ngOnInit(): void {
    this.zoneObject = this.field.value;
    this.array.push(this.zoneObject);
    console.log('zone', this.zoneObject);
    this.setZoneToZoneTransferTable();
  }

  setZoneToZoneTransferTable() {
    this.columns = [
      { field: 'index', label: '#'},
      { field: 'product', label: 'product_TC' },
      { field: 'quantity', label: 'quantity_TC' },
      { field: 'batchNumber', label: 'batchNumber_TC' },
      { field: 'serialNumber', label: 'serialNumber_TC' },
      { field: 'toZone', label: 'toZone_TC' },
    ]
  }

}
