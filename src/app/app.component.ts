import { Component, ViewChild, ElementRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
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
export class AppComponent implements AfterViewInit {
  
  @ViewChild('barchartWrapper', { static: true }) barchartWrapper: ElementRef;

  values: Value[] = [
    new Value('Red', 5, 'Red', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' ( ' + perc + '% )' })),
    new Value('Blue', 3, 'Blue'),
    new Value('Green', 10, 'Green', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' (' + val["value"] + ')' })),
    new Value('Orange', -3, 'Orange', null, null, null, 'Or.'),
    new Value('Olive', -5, 'Olive', null, null, null, 'Ol'),
    new Value('Grey', 7, 'Grey'),
  ];

  values1: Value[] = [
    new Value('Red', 6, 'Red', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' ( ' + perc + '% )' })),
    new Value('Blue', 8, 'Blue'),
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
  //filterValuesLines: Line[] = this.lines;

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

  /*onKeyLine(event: any) {
    let inputValue = event.target.value;
    this.filterValuesLines = this.lines.filter(val => {
      if (inputValue === undefined || inputValue === '') {
        return true;
      }
      if (val.name.toLowerCase().startsWith(inputValue.toLowerCase())) {
        return true;
      }
      return false;
    });
  }*/

  filterValueLine: string = null;

  get filterValuesLines(): Line[] {
    if (this.filterValueLine === null || this.filterValueLine === '') {
      return this.lines;
    }
    return this.lines.filter(val => {
      if (val.name.toLowerCase().endsWith(this.filterValueLine.toLowerCase()) 
      || val.name.toLowerCase().startsWith(this.filterValueLine.toLowerCase())) {
        return true;
      }
      return false;
    });
  }

  selectedOrientation: ChartOrientation = ChartOrientation.Bottom;
  currentSteps: number = 10;
  leftScaleAxis: boolean = true;
  rightScaleAxis: boolean = true;
  barOffset: number = 5;
  hideSelectLine: boolean = false;
  hideChartHoverEffect: boolean = false;
  hideChartSelectEffect: boolean = false;

  selectedOrientationLine: ChartOrientation = ChartOrientation.Bottom;
  currentStepsLine: number = 28;
  leftScaleAxisLine: boolean = true;
  rightScaleAxisLine: boolean = true;
  hideRaster: boolean = false;
  hideLines: boolean = false;
  hidePoints: boolean = false;
  hideSelectionLines: boolean = false;
  barFullFilled: boolean = false;

  useDonutStyle: boolean = false;
  donutSize: number = null;
  donutColor: string = null;

  wrapperWidth: number = 750;
  wrapperHeight: number = 450;

  wrapperWidthLine: number = 450;
  wrapperHeightLine: number = 450;

  constructor(private cd: ChangeDetectorRef) {
    
  }

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

  pieChangeValue() {
    var val: Value[] = [];
    Object.assign(val, this.values1);
    val[1].value += 1;
    
    this.values1 = val;
    this.cd.detectChanges();
  }

  pieSetNewValue() {
    this.values1 = [
      new Value('Red', 6, 'Red', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' ( ' + perc + '% )' })),
      new Value('Blue', 12, 'Blue'),
      new Value('Orange', 3, 'Orange'),
    ]
    this.cd.detectChanges();
  }
}
