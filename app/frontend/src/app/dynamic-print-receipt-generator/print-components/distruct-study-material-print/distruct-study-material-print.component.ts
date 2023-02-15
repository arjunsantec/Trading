import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-distruct-study-material-print',
  templateUrl: './distruct-study-material-print.component.html',
  styleUrls: ['./distruct-study-material-print.component.scss']
})
export class DistructStudyMaterialPrintComponent implements OnInit {

  @Input() field: any = {};
  distructStudyMaterialObject: any = {};
  columns: any = [];
  array = []

  constructor() { }

  ngOnInit(): void {
    this.distructStudyMaterialObject = this.field.value;
    this.array.push(this.distructStudyMaterialObject)
    console.log("Distruct Study Material", this.distructStudyMaterialObject);
    this.setDistructStudyMaterialTable();
  }

  setDistructStudyMaterialTable() {
    this.columns = [
      { field: 'index', label: '#'},
      { field: 'Product', label: 'product_TC' },
      { field: 'Quantity', label: 'Quantity_TC' },
      { field: 'Kit number', label: 'kit_no_TC' },
      { field: 'Batch Number', label: 'batch_no_TC' },
      { field: 'Serial', label: 'serial_TC' },
      { field: 'Temp', label: 'temperature_TC' },
      { field: 'Validity', label: 'expiryDate_TC' },
      { field: 'Note', label: 'note_TC' },
    ]
  }

}
