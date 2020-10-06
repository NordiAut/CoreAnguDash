import { Component, OnInit } from '@angular/core';
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

        const allChartData = this.topCustomers.reduce((result, i) => {
          result.push(this.getChartData(this.allOrders, i));
          return result;
        }, []);

      });


    // this._salesDataService.getOrders(1, 100).subscribe(res => {
    // this.allOrders = res.page.data;

    // this._salesDataService.getOrdersByCustomer(3).subscribe(cus => {
    // this.topCustomers = cus.map( x => x.name);
    // });
    // // this._salesDataService.getOrdersByCustomer(3).subscribe(cus => {
    // //   this.test = cus;
    // //   });
    // // console.log(this.test);

    // const allCharData = this.topCustomers.reduce((result, i) => {
    //   result.push(this.getChartData(this.allOrders, i));
    //   return result;
    //   }, []);
    });
  }

  getChartData(allOrders: any, name: string): void{
    const customerOrders = allOrders.filter( o => o.customer.name === name);
    console.log(customerOrders);
  }

}
