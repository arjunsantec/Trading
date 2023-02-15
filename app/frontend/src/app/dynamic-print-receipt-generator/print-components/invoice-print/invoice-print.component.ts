import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'invoice-print',
  templateUrl: './invoice-print.component.html',
  styleUrls: ['./invoice-print.component.scss']
})
export class InvoicePrintComponent implements OnInit {
  @Input() field: any = {};
  invoiceObject: any = {};
  columns: any = [];
  array = [];
  customsBrokerAddress: any = '';
  contactPersonName: string = '';
  note: string;
  noteArray: any = [];

  constructor() { }

  ngOnInit(): void {
    console.log('invoice', this.field);
    this.invoiceObject = this.field.value;
    this.array.push(this.invoiceObject);
    let address = JSON.parse(this.invoiceObject.customsBrokerAddress);
    console.log('address', address);
    if (address.length != 0 && address[0] != null) {
      this.customsBrokerAddress = address[0].personAddress;
      this.contactPersonName = address[0].personName;
      console.log("customsBrokerAddress", this.customsBrokerAddress);
    }
    // this.note = "Medication for clinical trial only; No commercial value, not for sale.Transport conditions: between 2°C and 8°C & Storage conditions: 2°C and 8°C. Handle with care & Protect from light, heat and moisture. Do not pile up OR stack packages. DO NOT OPEN PALLETS WITHOUT PRIOR NOTIFICATION OF FISHER OR CONSIGNEE";
    // this.convertToNote(this.note);
    this.noteArray = this.splitByMany([". ", "."], this.invoiceObject.note)
    console.log('string check', this.noteArray);
  }

  // convertToNote(string: string) {
  //   this.noteArray = string.split('. ');
  //   console.log(this.noteArray);
  // }

  splitByMany( manyArgs, string ) {
    do {
      let arg = manyArgs.pop()
      string = string.replace(arg, manyArgs[0])
    } while (manyArgs.length > 2)
    return string.split(manyArgs[0])
  }

}
