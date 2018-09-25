import { Component, OnInit, AfterViewInit, Input, ViewEncapsulation, OnChanges, SimpleChanges, ViewChild, ElementRef, Renderer2 } from '@angular/core';  
import { ChartItemService } from '../services/chart-item.service';
import { Value } from '../models/value.model';
import { Utils } from "../shared/utils";
import { ServiceItem } from '../models/serviceitem.model';
import { Bar } from '../models/bar.model';
import { Axis } from '../models/axis.model';
import { ScaleBaseChartComponent } from '../shared/scale-base-chart.component';

@Component({  
  selector: 'dl-bar-chart',  
  templateUrl: './bar-chart.component.html',  
  styleUrls: ['./bar-chart.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})  
export class BarChartComponent extends ScaleBaseChartComponent<Value> implements OnInit, AfterViewInit, OnChanges {
  
  @ViewChild('svgContainer') svgContainer: ElementRef;

  barWidhtOffset: number = 15;
  currentActiveBar: Bar = null;
  shouldHideSelectLine: boolean = false;

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

  constructor(chartItemService: ChartItemService) {
    super(chartItemService);
    this.viewBoxHeight = 400;
    this.viewBoxWidht = 400;
  }

  ngOnInit() {

  }

  cHeight: number = 0;
  cWidth: number = 0;
  scaleX: number = 0.6;
  scaleXWidth: number = 1;
  scaleY: number = 1.4;
  ngAfterViewInit(): void {
    // TODO: size change enable / disable
    if (this.svgContainer && this.svgContainer.nativeElement) {
      this.sizeChange();
    }
  }

  sizeChange() {
    setTimeout(() => {
      var newH = this.svgContainer.nativeElement.clientHeight;
      var newW = this.svgContainer.nativeElement.clientWidth;
      if (newH != this.cHeight || newW != this.cWidth) {
        this.cHeight = newH;
        this.cWidth = newW;
        this.getScaleFromClientSize();
      }
      this.sizeChange();
    }, 1000/60);
  } 

  private getScaleFromClientSize() {
    if (this.cHeight != 0 && this.cWidth != 0) {
      if (this.cHeight <= 150) {
        this.scaleX = 1.1;
        this.scaleY = 2.5;
      } else if (this.cHeight <= 175) {
        this.scaleX = 1.0;
        this.scaleY = 2.4;
      } else if (this.cHeight <= 200) {
        this.scaleX = 0.8;
        this.scaleY = 2.3;
      } else if (this.cHeight <= 250) {
        this.scaleX = 0.7;
        this.scaleY = 2.0;
      } else if (this.cHeight <= 350) {
        this.scaleX = 0.6;
        this.scaleY = 1.8;
      } else if (this.cHeight <= 450) {
        this.scaleX = 0.5;
        this.scaleY = 1.4;
      } else if (this.cHeight <= 550) {
        this.scaleX = 0.4;
        this.scaleY = 1.2;
      } else if (this.cHeight <= 750) {
        if (this.cHeight <= 650) {
          this.scaleY = 1.2;
        } else {
          this.scaleY = 1;
        }
        this.scaleX = 0.3;
      } else {
        this.scaleX = 0.3;
        this.scaleY = 0.8;
      }
      if (this.cWidth <= 150) {
        this.scaleXWidth = 2.5;
      } else if (this.cWidth <= 250) {
        this.scaleXWidth = 2;
      } else if (this.cWidth <= 450) {
        this.scaleXWidth = 1.5;
      } else if (this.cWidth <= 550) {
        this.scaleXWidth = 1;
      } else {
        this.scaleXWidth = 1;
      }
    } else {
      this.scaleX = 0.6;
      this.scaleY = 1.4;
      this.scaleXWidth = 1;
    }
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
    let maxValue: number = Math.max.apply(Math, items.map(function(o) { return o.value; }));
    var oneS = (maxValue / this.valueSteps)
    var yA: string[] = [];
    for (let index = 0; index < (this.valueSteps + 1); index++) {
      yA.push(Utils.roundScale(oneS * index).toString());
    }
    if (maxValue != 0) {
      this.createYAxis(yA);
    }

    var singleBarWidht = (((this.viewBoxWidht - this.barWidhtOffset) - (items.length * this.barWidhtOffset)) / items.length);
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
    //var oneDisplayPercent = this.viewBoxHeight / 100;
    var oneDisplayPercent = 380 / 100;

    this.bars = [];
    for (let index = 0; index < items.length; index++) {
      const element = items[index];
      this.bars.push(
        {
          width: singleBarWidht,
          height: element.val.value === 0 ? 0 : (oneDisplayPercent * (element.val.value / onePercent)),
          position: element.position,
          sourceItem: element.val,
          calculatedPercent: element.val.value === 0 ? 0 : (element.val.value / onePercent),
          color: element.val.color,
          id: Utils.createElementId('chart-bar-', index),
          allowActivate: true
        }
      );
    }
  }

  createYAxis(items: string[]) {
    this.yAxis = [];
    var step = (380 / (items.length - 1));
    //var step = (this.viewBoxHeight / (items.length - 1));
    for (let index = 0; index < (items.length - 1); index++) {
      const element = items[index];
      this.yAxis.push(
        {
          text: element,
          position: 380 - (step * index) + 10,
        }
      )
    }

    this.yAxis.push(
      {
        text: items[items.length - 1],
        position: 10,
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

}