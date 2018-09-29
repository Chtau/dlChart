import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Value, TooltipConfiguration } from '../../projects/dl-chart/src/public_api';
import { ChartOrientation } from '../../projects/dl-chart/src/public_api';
import { Line } from 'projects/dl-chart/src/lib/models/line.model';
import { Point } from 'projects/dl-chart/src/lib/models/point.model';
import { DonutConfiguration } from 'projects/dl-chart/src/lib/models/donutconfiguration.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  
  @ViewChild('barchartWrapper') barchartWrapper: ElementRef;

  values: Value[] = [
    new Value('Red', 5, 'Red', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' ( ' + perc + '% )' })),
    new Value('Blue', 3, 'Blue'),
    new Value('Green', 10, 'Green', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' (' + val["value"] + ')' })),
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
        //new Point(2018, 1),
        new Point(2019, 12),
        new Point(2020, 15),
      ]
    },
    {
      color: 'orange',
      cssClass: null,
      data: null,
      name: 'Orange',
      tooltipConfig: null,
      points: [
        new Point(2017, -6),
        new Point(2018, 0),
        new Point(2019, 11),
        new Point(2020, 16),
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

  selectedOrientation: ChartOrientation = ChartOrientation.Left;
  currentSteps: number = 10;
  leftScaleAxis: boolean = true;
  rightScaleAxis: boolean = false;
  barOffset: number = 13;
  hideSelectLine: boolean = false;
  hideChartHoverEffect: boolean = false;
  hideChartSelectEffect: boolean = false;

  selectedOrientationLine: ChartOrientation = ChartOrientation.Bottom;
  currentStepsLine: number = 28;
  leftScaleAxisLine: boolean = true;
  rightScaleAxisLine: boolean = false;
  hideRaster: boolean = false;
  hideLines: boolean = false;
  hidePoints: boolean = false;
  hideSelectionLines: boolean = false;

  useDonutStyle: boolean = false;
  donutSize: number = null;
  donutColor: string = null;
  donutConfig: DonutConfiguration = null;

  onChangeUseDonut(event: any) {
    this.recreateDonutConfig();
  }

  onChangeDonutSize(event: any) {
    this.recreateDonutConfig();
  }

  onChangeDonutColor(event: any) {
    this.recreateDonutConfig();
  }

  recreateDonutConfig() {
    if (this.useDonutStyle) {
      this.donutConfig = {
        color: this.donutColor,
        size: this.donutSize
      }
    } else {
      this.donutConfig = null;
    }
  }

  wrapperWidth: number = 750;
  wrapperHeight: number = 450;

  wrapperWidthLine: number = 450;
  wrapperHeightLine: number = 450;

  ngAfterViewInit(): void {
    //this.wrapperHeight = this.barchartWrapper.nativeElement.clientHeight;
    //this.wrapperWidth = this.barchartWrapper.nativeElement.clientWidth;
  }

  changeWidth() {
    //this.barchartWrapper.nativeElement.clientWidth = this.wrapperWidth;
  }

  changeHeight() {
    //this.barchartWrapper.nativeElement.clientHeight = this.wrapperHeight;
  }

  changeWidthLine() {
    
  }

  changeHeightLine() {
    
  }
}
