import { Component, OnInit } from '@angular/core';
import { subscribeOn } from 'rxjs-compat/operator/subscribeOn';
import { SalesDataService } from 'src/app/services/sales-data.service';

@Component({
  selector: 'app-section-sales',
  templateUrl: './section-sales.component.html',
  styleUrls: ['./section-sales.component.css']
})
export class SectionSalesComponent implements OnInit {

  salesDataByCustomer: any;
  salesDataByState: any;

  // tslint:disable-next-line:variable-name
  constructor(private _salesData: SalesDataService) { }

  ngOnInit(): void {
  this._salesData.getOrdersByState().subscribe(res => {this.salesDataByState = res; });
  this._salesData.getOrdersByCustomer(5).subscribe(res => {this.salesDataByCustomer = res; });

  }

}
