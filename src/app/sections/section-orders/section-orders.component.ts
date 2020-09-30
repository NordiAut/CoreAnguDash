
import { Component, OnInit } from '@angular/core';
import { Order } from 'src/app/Shared/order';


@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css']
})
export class SectionOrdersComponent implements OnInit {

  constructor() { }

  orders: Order[] = [
    {id: 1, customer:
      {id: 1, name: 'Test', state: 'CO', email: 'mainst@example.com'},
   total: 230, placed: new Date(2017, 12, 1), fulfilled: new Date(2017, 12, 1)},
  ];



  ngOnInit(): void {
  }

}
