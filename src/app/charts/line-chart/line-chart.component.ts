import { analyzeAndValidateNgModules } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { SalesDataService } from 'src/app/services/sales-data.service';
import { LINE_CHART_COLORS } from 'src/app/Shared/chart.colors';


// const LINE_CHART_SAMPLE_DATA: any[] = [
//   { data: [32, 14, 46, 23, 38, 56], label: 'Sentiment Analysis'},
//   { data: [12, 18, 26, 13, 28, 26], label: 'Image Recognition'},
//   { data: [52, 34, 49, 53, 68, 62], label: 'Forecasting'},
// ];
// const LINE_CHART_LABELS: string[] = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'];

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {

  // tslint:disable-next-line:variable-name
  constructor(private _salesDataService: SalesDataService) { }

  test: any;
  topCustomers: string[];
  allOrders: any[];
  allChartData: any;

  lineChartData: any;
  lineChartLabels: any;
  lineChartOptions: any = {
    responsive: true
  };

  lineChartLegend: true;
  lineChartType = 'line';
  lineChartColors = LINE_CHART_COLORS;

  ngOnInit(): void {

    this._salesDataService.getOrders(1, 100).subscribe(res => {
      this.allOrders = res.page.data;

      this._salesDataService.getOrdersByCustomer(3).subscribe(cus => {
        this.topCustomers = cus.map(x => x.name);

        this.allChartData = this.topCustomers.reduce((result, i) => {
        result.push(this.getChartData(this.allOrders, i));
        return result;
        }, []);

        // console.log('allChartData',  this.allChartData);

        let dates = this.allChartData.map( x => x.data).reduce((a, i) => {
          a.push(i.map( o => new Date(o[0])));
          return a;
        }, []);

        dates = [].concat.apply([], dates);
        // console.log('dates', dates);

        const r = this.getCustomerOrdersByDate(this.allChartData, dates).data;
        console.log(r);

        this.lineChartLabels = r[0].orders.map( o => o.date);

        this.lineChartData = [
          { data: r[0].orders.map(x => x.total), label: r[0].customer},
          { data: r[1].orders.map(x => x.total), label: r[1].customer},
          { data: r[2].orders.map(x => x.total), label: r[2].customer}
        ];

      });
    });
  }

  // get chart data and filter it by a customername
  getChartData(allOrders: any, name: string): any {
    const customerOrders = allOrders.filter( o => o.customer.name === name);
     // console.log('name:', name , 'customerOrders:', customerOrders);

    const formattedOrders = customerOrders.reduce((r, e) => {
      r.push([e.placed, e.orderTotal]);
      return r;
    }, []);
    // console.log('formattedOrders:', formattedOrders);

    const result = { customer: name, data: formattedOrders };
    return result;
  }

  getCustomerOrdersByDate( orders: any, dates: any): any {

    // for each customer -> for each date =>
    // { data: [{'customer': 'XYZ', 'orders': [{ 'date': 17-11-25', total: 24144}]} ]}

   const customers = this.topCustomers;
   const prettyDates = dates.map( x => this.toFriendlyDate(x));
   const u = Array.from(new Set(prettyDates)).sort();


   // define our result object to return:
   const result = {data: []};

   const dataSets = result.data = [];
   // const dataSets = result['data'] = [];

   customers.reduce((x, y, i) => {
    // console.log('Reducing:', y, 'at index:', i);
    const customerOrders = [];
    dataSets[i] = {
      customer: y, orders:
      u.reduce((r, e , j) => {
        const obj = {};
        // tslint:disable-next-line:no-string-literal
        obj['date'] = e;
        // tslint:disable-next-line:no-string-literal
        obj['total'] = this.getCustomerDateTotal(e, y);
        customerOrders.push(obj);
        // console.log('Reducing:', e, 'at index:', j, 'customerOrders', customerOrders);
        return customerOrders;
      })
      };
    return x;
   }, []);
   return result;
  }

  toFriendlyDate(date: Date): any{
    return moment(date).endOf('day').format('YYMM-DD');
  }

  getCustomerDateTotal(date: any, customer: string): any {
    const r = this.allOrders.filter(o => o.customer.name === customer
      && this.toFriendlyDate(o.placed) === date);

    const result = r.reduce((a, b) => {
      return a + b.orderTotal;
    }, 0);

    return result;
  }

}
