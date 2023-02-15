import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'exported-study-material',
  templateUrl: './exported-study-material-print.component.html',
  styleUrls: ['./exported-study-material-print.component.scss']
})
export class ExportedStudyMaterialPrintComponent implements OnInit {

  @Input() field: any = {};
  exportedStudyMaterialObject: any = {};
  columns: any = [];
  array = []

  constructor() { }

  ngOnInit(): void {
    this.exportedStudyMaterialObject = this.field.value;
    this.array.push(this.exportedStudyMaterialObject)
    console.log("Exported Study Material", this.exportedStudyMaterialObject);
    this.setExportedStudyMaterialTable();
  }

  setExportedStudyMaterialTable() {
    this.columns = [
      { field: 'index', label: '#'},
      { field: 'productName', label: 'product_TC' },
      { field: 'quantity', label: 'Quantity_TC' },
      { field: 'batch_no', label: 'batch_no_TC' },
      { field: 'serial_no', label: 'serial_TC' },
      { field: 'validity', label: 'Validity_TC' },
      { field: 'temp', label: 'temperature_TC' },
      { field: 'export_date', label: 'exportDate_TC' },
      { field: 'comment', label: 'comment_TC' },
    ]
  }


}
