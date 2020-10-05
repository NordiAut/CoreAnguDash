import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class SalesDataService {

  // tslint:disable-next-line:variable-name
  constructor(private _http: Http) { }

  // tslint:disable-next-line:typedef
  getOrders(pageIndex: number, pageSize: number) {
    return this._http.get('http://localhost:5000/api/order/' + pageIndex + '/' + pageSize)
      .map(res => res.json());
  }

  // tslint:disable-next-line:typedef
  getOrdersByCustomer(n: number) {
    return this._http.get('http://localhost:5000/api/order/bycustomer/' + n)
      .map(res => res.json());
  }

  // tslint:disable-next-line:typedef
  getOrdersByState() {
    return this._http.get('http://localhost:5000/api/order/bystate/')
      .map(res => res.json());
  }
}
