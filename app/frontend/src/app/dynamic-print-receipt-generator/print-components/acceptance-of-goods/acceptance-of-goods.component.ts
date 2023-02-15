import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-acceptance-of-goods',
  templateUrl: './acceptance-of-goods.component.html',
  styleUrls: ['./acceptance-of-goods.component.scss']
})
export class AcceptanceOfGoodsComponent implements OnInit {

  @Input() field: any = {};
  acceptanceObject: any = {};
  columns: any = [];
  array = []

  constructor() { }

  ngOnInit(): void {
    this.acceptanceObject = this.field.value;
    this.array.push(this.acceptanceObject)
    console.log("acceptance", this.acceptanceObject);
    this.setGoodsAcceptanceTable();

  }
  setGoodsAcceptanceTable() {
    this.columns = [
      { field: 'index', label: '#'},
      { field: 'Product', label: 'product_TC' },
      { field: 'Quantity', label: 'Quantity_TC' },
      { field: 'Kit number', label: 'kit_no_TC' },
      { field: 'Batch Number', label: 'batch_no_TC' },
      { field: 'Serial', label: 'serial_TC' },
      { field: 'Validity', label: 'Validity_TC' },
      { field: 'Manufacturer', label: 'manufacture_TC' },
      { field: 'Temp', label: 'temperature_TC' },
      { field: 'Note', label: 'note_TC' },
    ]

  }
}
