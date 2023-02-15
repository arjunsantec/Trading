import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-body',
  templateUrl: './footer-body.component.html',
  styleUrls: ['./footer-body.component.scss']
})
export class FooterBodyComponent implements OnInit {

  @Input() field:any = {};

  constructor() { }

  ngOnInit(): void {
  }

}
