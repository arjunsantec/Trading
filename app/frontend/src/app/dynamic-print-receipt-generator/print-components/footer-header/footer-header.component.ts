import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-header',
  templateUrl: './footer-header.component.html',
  styleUrls: ['./footer-header.component.scss']
})
export class FooterHeaderComponent implements OnInit {

  @Input() field:any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
