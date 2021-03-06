
import { Component, OnInit } from '@angular/core';
import { SalesDataService } from 'src/app/services/sales-data.service';
import { Order } from 'src/app/Shared/order';




@Component({
  selector: 'app-section-orders',
  templateUrl: './section-orders.component.html',
  styleUrls: ['./section-orders.component.css']
})
export class SectionOrdersComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(private _salesData: SalesDataService) { }

  orders: Order[];
  total = 0;
  page = 1;
  limit = 10;
  loading = false;



  ngOnInit(): void {
    this.getOrders();

  //   this.orders = [
  //     {id: 1, customer:
  //       {id: 1, name: 'Test', state: 'CO', email: 'mainst@example.com'},
  //    total: 230, placed: new Date(2017, 12, 1), fulfilled: new Date(2017, 12, 1)},
  //    {id: 2, customer:
  //     {id: 2, name: 'Test2', state: 'CO', email: 'mainst@example.com'},
  //  total: 230, placed: new Date(2017, 12, 1), fulfilled: new Date(2017, 12, 1)},
  //   ];
  }

  getOrders(): void {
    this._salesData.getOrders(this.page, this.limit)
      .subscribe(res => {
        console.log('Result from getOrders: ', res);
        this.orders = res.page.data;
        this.total = res.page.total;
        this.loading = false;
      });
    }

  goToPrevious(): void {
    // console.log('Previous Button Clicked!');
    this.page--;
    this.getOrders();
  }

  goToNext(): void {
    // console.log('Next Button Clicked!');
    this.page++;
    this.getOrders();
  }

  goToPage(n: number): void{
    this.page = n;
    this.getOrders();
  }
}
