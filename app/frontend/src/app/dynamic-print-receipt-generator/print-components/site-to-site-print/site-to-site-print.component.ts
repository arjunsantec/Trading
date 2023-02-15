import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'site-to-site',
  templateUrl: './site-to-site-print.component.html',
  styleUrls: ['./site-to-site-print.component.scss']
})
export class SiteToSitePrintComponent implements OnInit {

  @Input() field: any = {};
  siteToSiteObject: any = {};
  columns: any = [];
  array = []

  constructor() { }

  ngOnInit(): void {
    this.siteToSiteObject = this.field.value;
    this.array.push(this.siteToSiteObject)
    console.log("Site To Site", this.siteToSiteObject);
    this.setSiteToSiteTable();
  }

  setSiteToSiteTable() {
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
