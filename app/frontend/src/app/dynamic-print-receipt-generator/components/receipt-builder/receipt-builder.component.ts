import { Component, Input, OnInit } from '@angular/core';

interface receiptFields {
  type: '',
  label_1: '',
  label_2: '',
  label_3: '',
  label_4: '',
  label_5: '',
  label_6: '',
  value: {};  
}

@Component({
  selector: 'app-receipt-builder',
  templateUrl: './receipt-builder.component.html',
  styleUrls: ['./receipt-builder.component.scss']
})
export class ReceiptBuilderComponent implements OnInit {
  
  @Input() fields: receiptFields[] | any;

  constructor() { }

  ngOnInit(): void {
  }
}
