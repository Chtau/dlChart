import { Component, Input, ViewEncapsulation, OnChanges, SimpleChanges } from '@angular/core';  
import { ChartItemService } from '../services/chart-item.service';
import { Value } from '../models/value.model';
import { Utils } from "../shared/utils";
import { ServiceItem } from '../models/serviceitem.model';
import { Bar } from '../models/bar.model';
import { Axis } from '../models/axis.model';
import { ChartOrientation } from '../models/enums';
import { BaseChartComponent } from '../shared/base-chart.component';

@Component({  
  selector: 'dl-bar-chart',  
  templateUrl: './bar-chart.component.html',  
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})  
export class BarChartComponent extends BaseChartComponent<Value> implements OnChanges {

  barWidhtOffset: number = 5;
  currentActiveBar: Bar = null;
  shouldHideSelectLine: boolean = false;
  currentScaleLabel: string = '';
  valueSteps: number = 6;
  activeLeftScaleAxis: boolean = true;
  activeRightScaleAxis: boolean = false;
  currentOrientation: ChartOrientation = ChartOrientation.Bottom;

  barGroundLineY: number = 100;
  xAxis: Axis[] = [];
  yAxis: Axis[] = [];
  bars: Bar[] = [];

  @Input()
  set hideSelectLine(val: boolean) {
    this.shouldHideSelectLine = val;
  }

  @Input()
  set barOffset(val: number) {
    this.barWidhtOffset = val;
  }

  @Input()
  set scaleLabel(val: string) {
    this.currentScaleLabel = val;
  }

  @Input()
  set steps(val: number) {
    this.valueSteps = val;
  }

  @Input()
  set leftScaleAxis(val: boolean) {
    this.activeLeftScaleAxis = val;
  }

  @Input()
  set rightScaleAxis(val: boolean) {
    this.activeRightScaleAxis = val;
  }

  @Input()
  set orientation(val: ChartOrientation) {
    this.currentOrientation = val;
  }

  constructor(chartItemService: ChartItemService) {
    super(chartItemService);
  }
 
  ngOnChanges(changes: SimpleChanges): void {
    this.resetActiveElement();
    this.calculateChart();
  }

  calculateChart() {
    var items = this.currentValues;
    items.forEach(val => {
      if (!val.value) {
        val.value = 0;
      }
    })

    let minValueCalc: number = Math.min.apply(Math, items.map(function(o) { return o.value; }));
    if (minValueCalc > 0) {
      minValueCalc = 0;
    }
    let maxValueCalc: number = Math.max.apply(Math, items.map(function(o) { return o.value; }));

    let maxValue: number = (maxValueCalc - minValueCalc);
    var singleStepValue = (maxValue / this.valueSteps);
    var singleStepY = (100 / this.valueSteps);

    this.yAxis = [];
    this.yAxis.push(
      {
        text: minValueCalc.toString(),
        position: 100
      }
    );
    for (let index = 1; index <= (this.valueSteps - 1); index++) {
      var currentValue = Utils.roundScale(minValueCalc + (singleStepValue * index));
      var step = 100 - Utils.roundScale(singleStepY * index);
      this.yAxis.push(
        {
          text: currentValue.toString(),
          position: step
        }
      )
    }
    this.yAxis.push(
      {
        text: maxValueCalc.toString(),
        position: 0
      }
    );

    this.barGroundLineY = 100;
    if (minValueCalc < 0) {
      this.barGroundLineY = (100 - (100 / maxValue) * (minValueCalc * -1));
    }

    var singleBarWidht = (((100 - this.barWidhtOffset) - (items.length * this.barWidhtOffset)) / items.length);
    let bars: { val: Value, position: number}[] = [];
    let index: number = 1;
    this.currentValues.forEach(item => {
      bars.push(
        {
          val: item,
          position: (this.barWidhtOffset * index) + (singleBarWidht * (index - 1))
        }
      );
      index++;
    });

    if (maxValue != 0) {
      this.createXAxis(singleBarWidht, bars);
    }
    this.createBars(maxValue, singleBarWidht, bars);

    this.chartItemService.setChartValues(new ServiceItem<Bar[]>(this.chartid, this.bars))
  }

  createXAxis(singleBarWidht: number, items: { val: Value, position: number}[]) {
    this.xAxis = [];

    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      var pos = ((element.position + singleBarWidht) - (singleBarWidht / 2));
      this.xAxis.push(
        {
          text: element.val.name,
          position: pos,
        }
      )
    }
  }

  createBars(maxValue: number, singleBarWidht: number, items: { val: Value, position: number}[]) {
    var onePercent = maxValue / 100;

    this.bars = [];
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      var height = element.val.value === 0 ? 0 : (1 * (element.val.value / onePercent));
      var y = element.val.value === 0 ? 0 : (this.barGroundLineY - (1 * (element.val.value / onePercent)));
      let isMinusValue: boolean = false;
      if (height < 0) {
        isMinusValue = true;
        height = height * -1;
        y = this.barGroundLineY;
      }

      this.bars.push(
        {
          width: singleBarWidht,
          height: height,
          y:  y,
          x: element.position,
          sourceItem: element.val,
          calculatedPercent: element.val.value === 0 ? 0 : Utils.roundScale(element.val.value / onePercent),
          color: element.val.color,
          id: Utils.createElementId('chart-bar-', index),
          isMinusValue: isMinusValue
        }
      );
    }
  }


  createYAxis(items: string[]) {
    this.yAxis = [];
    var step = (100 / (items.length - 1));
    for (let index = 0; index < (items.length - 1); index++) {
      const element = items[index];
      this.yAxis.push(
        {
          text: element,
          position: 100 - (step * index),
        }
      )
    }

    this.yAxis.push(
      {
        text: items[items.length - 1],
        position: 0,
      }
    )
  }

  onClickSegment(event: Bar) {
    super.onClickSegment(event);
    
    if (event === this.currentActiveChartItem) {
      this.currentActiveBar = event;
    } else {
      this.currentActiveBar = null;
    }
  }

  resetActiveElement() {
    this.currentActiveBar = null;
    super.resetActive();
  }

  cssClassSegment(item: Bar): string {
    let css: string = '';
    
    if (this.currentOrientation === ChartOrientation.Bottom || this.currentOrientation === ChartOrientation.Top) {
      css += ' bar-anim-top-bottom';
    } else {
      css += ' bar-anim-left-right';
    }

    if (item === this.currentActiveChartItem) {
      css += ' bar-selected';
    }
    if (item.sourceItem) {
      if (item.sourceItem.cssClass != null) {
        css += ' ' + item.sourceItem.cssClass;
      }
    }
    return css;
  }

  normOrientation(defaultValue: any, rightValue: any, leftValue: any, topValue: any) {
    if (this.currentOrientation === ChartOrientation.Bottom) {
      return defaultValue;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return rightValue;
    } else if (this.currentOrientation === ChartOrientation.Left){
      return leftValue;
    } else {
      if (topValue === undefined) {
        return defaultValue;
      }
      return topValue;
    }
  }

}
