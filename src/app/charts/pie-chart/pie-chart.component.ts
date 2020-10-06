import { Component, Input, OnInit } from '@angular/core';
import _ from 'lodash';
import { THEME_COLORS } from '../../Shared/theme.colors';

const theme = 'Bright';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  constructor() { }

  @Input() inputData: any;
  @Input() limit: number;

  pieChartData: number[];
  pieChartLabels: string[];

  colors: any[] = [
    {
      backgroundColor: this.themeColors(theme),
      borderColor: '#111'
    }
  ];

  pieChartType = 'doughnut';


  ngOnInit(): void {
    this.parseChartData(this.inputData, this.limit);
    console.log(this.inputData);
  }

  parseChartData( res: any, limit?: number): void{
    const allData = res.slice(0, limit);
    // console.log(allData);

    // this.pieChartData = allData.map( x => x.total);
    // this.pieChartLabels = allData.map( x => x.name);

    // Using lodash for loading the values
    this.pieChartLabels = allData.map( x => _.values(x)[0]);
    this.pieChartData = allData.map( x => _.values(x)[1]);
  }

  themeColors(setName: string): string[] {
    const c = THEME_COLORS.slice(0)
    .find(set => set.name === setName).colorSet;
    return c;
  }

}
