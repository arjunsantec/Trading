import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api/menuitem';

@Component({
  selector: 'app-home-main-page',
  templateUrl: './home-main-page.component.html',
  styleUrls: ['./home-main-page.component.scss']
})
export class HomeMainPageComponent implements OnInit {

  
  dockItems: MenuItem[];

  products = [
    {
      invoiceNo:'INV001',
      invoiceDate:'2022/01/01',
      noOfItems:'10',
      status:'PEDNING APPROVAL',
    },
    {
      invoiceNo:'INV001',
      invoiceDate:'2022/01/01',
      noOfItems:'10',
      status:'PEDNING APPROVAL',
    },

  ]

  constructor() { }

  ngOnInit(): void {

    
  }

}
