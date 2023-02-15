import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-study-materiasl-return',
  templateUrl: './study-materiasl-return.component.html',
  styleUrls: ['./study-materiasl-return.component.scss']
})
export class StudyMateriaslReturnComponent implements OnInit {

  @Input() field: any = {};
  studyreturnObject: any = {};
  columns: any = [];
  array = []

  constructor() { }

  ngOnInit(): void {

    this.studyreturnObject = this.field.value;
    this.array.push(this.studyreturnObject);
    console.log('rack', this.studyreturnObject);
    this.setStudyMaterialReturnTable();
  }

  setStudyMaterialReturnTable() {
    this.columns = [
      { field: 'index', label: '#'},
      { field: 'product', label: 'product_TC' },
      { field: 'kitNumber', label: 'kitNumber_TC' },
      { field: 'batchNumber', label: 'batch_TC' },
      { field: 'serialNumber', label: 'serial_TC' },
      { field: 'quantity', label: 'Quantity_TC' },
      { field: 'type', label: 'type_TC' },
      { field: 'date', label: 'expDate_TC' },
      { field: 'comment', label: 'comment_TC' },
    ]
  }

}
