import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'fieldset',
  templateUrl: './fieldset.component.html',
  styleUrls: ['./fieldset.component.scss']
})
export class FieldSetComponent implements OnInit {

  @Input() fields:any;
  @Input() form: any;
  @Input() header: any;
  @Input() fillScreen: any;

  // get isValid() { 
  //   return this.form?.controls[this.field.name].valid; 
  // }
  // get isDirty() { 
  //   return this.form?.controls[this.field.name].dirty; 
  // }

  constructor() { }

  ngOnInit(): void {
  
  }

}
