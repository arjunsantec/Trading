import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'tab',
  templateUrl: './tab.component.html',
  styleUrls: ['./tab.component.scss']
})
export class TabComponent implements OnInit {

  @Input() fields:any;
  @Input() form: any;
  @Input() headerTextArray: any;

  constructor() { }

  ngOnInit(): void {
  }

}
