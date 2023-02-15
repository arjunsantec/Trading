import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-receipt-of-goods',
  templateUrl: './receipt-of-goods.component.html',
  styleUrls: ['./receipt-of-goods.component.scss']
})
export class ReceiptOfGoodsComponent implements OnInit {

  @Input() field: any = {};
  materialReceiptObject: any = {};
  columns: any = [];
  array = []

  constructor() { }

  ngOnInit(): void {
    this.materialReceiptObject = this.field.value;
    this.array.push(this.materialReceiptObject)
    console.log("Material receipt", this.materialReceiptObject);
    this.setMaterialReceiptTable();

  }
  setMaterialReceiptTable() {
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
