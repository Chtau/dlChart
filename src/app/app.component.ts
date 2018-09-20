import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Value, TooltipConfiguration } from '../../projects/dl-chart/src/public_api';
import { ChartOrientation } from '../../projects/dl-chart/src/public_api';
import { Line } from 'projects/dl-chart/src/lib/models/line.model';
import { Point } from 'projects/dl-chart/src/lib/models/point.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  values: Value[] = [
    new Value('Red', 5, 'Red', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' ( ' + perc + '% )' })),
    new Value('Blue', 3, 'Blue'),
    new Value('Green', 10, 'Green', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' (' + val.value + ')' })),
    new Value('Orange', 3, 'Orange'),
    new Value('Grey', 7, 'Grey'),
  ];

  values1: Value[] = [
    new Value('Red', null, 'Red', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' ( ' + perc + '% )' })),
    new Value('Blue', undefined, 'Blue'),
    // new Value('Green', 10, 'Green', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' (' + val.value + ')' })),
    new Value('Orange', 3, 'Orange'),
  ];

  lines: Line[] = [
    {
      color: 'red',
      cssClass: null,
      data: null,
      name: 'Red',
      tooltipConfig: null,
      points: [
        new Point(2017, 10),
        new Point(2018, 15),
        new Point(2019, 7),
        new Point(2020, 12),
      ]
    },
    {
      color: 'blue',
      cssClass: null,
      data: null,
      name: 'Blue',
      tooltipConfig: null,
      points: [
        new Point(2017, 5),
        new Point(2018, 9),
        new Point(2019, 22),
        new Point(2020, 1),
      ]
    },
    {
      color: 'green',
      cssClass: null,
      data: null,
      name: 'Green',
      tooltipConfig: null,
      points: [
        new Point(2017, 1),
        new Point(2018, 1),
        new Point(2019, 12),
        new Point(2020, 15),
      ]
    }
  ]

  filterValues: Value[] = this.values;
  filterValuesBar: Value[] = this.values;

  onKey(event: any) {
    let inputValue = event.target.value;
    this.filterValues = this.values.filter(val => {
      if (inputValue === undefined || inputValue === '') {
        return true;
      }
      if (val.name === inputValue || val.value.toString() === inputValue) {
        return true;
      }
      return false;
    });
  }

  onKeyBar(event: any) {
    let inputValue = event.target.value;
    this.filterValuesBar = this.values.filter(val => {
      if (inputValue === undefined || inputValue === '') {
        return true;
      }
      if (val.name === inputValue || val.value.toString() === inputValue) {
        return true;
      }
      return false;
    });
  }

  selectedOrientation: ChartOrientation = ChartOrientation.Bottom;
  currentSteps: number = 10;
  leftScaleAxis: boolean = true;
  rightScaleAxis: boolean = false;
  barOffset: number = 13;
  hideSelectLine: boolean = false;
  hideChartHoverEffect: boolean = false;
  hideChartSelectEffect: boolean = false;
}
