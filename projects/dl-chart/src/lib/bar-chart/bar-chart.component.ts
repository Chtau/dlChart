import { Component, OnInit, AfterViewInit, Input, ViewEncapsulation, OnChanges, SimpleChanges, ViewChild, ElementRef, Renderer2, ChangeDetectorRef } from '@angular/core';  
import { ChartItemService } from '../services/chart-item.service';
import { Value } from '../models/value.model';
import { Utils } from "../shared/utils";
import { ServiceItem } from '../models/serviceitem.model';
import { Bar } from '../models/bar.model';
import { Axis } from '../models/axis.model';
import { ScaleBaseChartComponent } from '../shared/scale-base-chart.component';
import { ChartOrientation } from '../models/enums';

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

  constructor(chartItemService: ChartItemService,
    private cd: ChangeDetectorRef) {
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
  scaleYWidth: number = 1;
  scaleYWidthOffset: number = 12;
  scaleYTextOffset: number = 22;

  get xAxisTextXOffset() {
    if (this.currentOrientation === ChartOrientation.Left) {
      return -5;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return 5;
    } else {
      return 0;
    }
  }

  get xAxisTextYOffset() {
    if (this.currentOrientation === ChartOrientation.Left) {
      return -4;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return -4;
    } else if (this.currentOrientation === ChartOrientation.Top) {
      return -14;
    } else {
      return 6;
    }
  }

  get xAxisStyleText() {
    if (this.currentOrientation === ChartOrientation.Left) {
      return {"transform" : "rotate(-90deg) ", "text-anchor" : "end"};
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return {"transform" : "rotate(90deg) ", "text-anchor" : "start"};
    } else if (this.currentOrientation === ChartOrientation.Top) {
      return {"transform" : "rotate(180deg) ", "text-anchor" : "middle"};
    } else {
      return {"transform" : "rotate(0deg) ", "text-anchor" : "middle"};
    }
  }

  get yAxisTextXOffset() {
    if (this.currentOrientation === ChartOrientation.Left) {
      return 0;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return 0;
    } else if (this.currentOrientation === ChartOrientation.Top) {
      return -13;
    } else {
      return 12;
    }
  }

  get yAxisTextYOffset() {
    if (this.currentOrientation === ChartOrientation.Left) {
      return 4;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return -4;
    } else {
      return 0;
    }
  }

  get yAxisStyleText() {
    if (this.currentOrientation === ChartOrientation.Left) {
      return {"transform" : "rotate(-90deg) scale(" + this.scaleYWidth + ", " + this.scaleY + ")", "text-anchor" : "middle"};
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return {"transform" : "rotate(90deg) scale(" + this.scaleYWidth + ", " + this.scaleY + ")", "text-anchor" : "middle"};
    } else if (this.currentOrientation === ChartOrientation.Top) {
      return {"transform" : "rotate(180deg) scale(" + this.scaleYWidth + ", " + this.scaleY + ")", "text-anchor" : "start"};
    } else {
      return {"transform" : "rotate(0deg) scale(" + this.scaleYWidth + ", " + this.scaleY + ")", "text-anchor" : "end"};
    }
  }

  get yAxisDescriptionYOffset() {
    if (this.currentOrientation === ChartOrientation.Left) {
      return 16;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return -24;
    } else {
      return 22;
    }
  }

  get yAxisDescriptionXOffset() {
    if (this.currentOrientation === ChartOrientation.Left) {
      return -10;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return 6;
    } else {
      return -10;
    }
  }

  get yAxisStyleDescription() {
    if (this.currentOrientation === ChartOrientation.Left) {
      return {"transform" : "rotate(-90deg) scale(" + this.scaleY + ", " + this.scaleYWidth + ")", "text-anchor" : "end"};
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return {"transform" : "rotate(90deg) scale(" + this.scaleY + ", " + this.scaleYWidth + ")", "text-anchor" : "start"};
    } else {
      return {"transform" : "rotate(-90deg) scale(" + this.scaleY + ", " + this.scaleYWidth + ")", "text-anchor" : "end"};
    }
  }

  get y2AxisTextXOffset() {
    if (this.currentOrientation === ChartOrientation.Left) {
      return 0;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return 0;
    } else if (this.currentOrientation === ChartOrientation.Top) {
      return -8;
    } else {
      return 8;
    }
  }

  get y2AxisTextYOffset() {
    if (this.currentOrientation === ChartOrientation.Left) {
      return 10;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return -9;
    } else {
      return 0;
    }
  }

  get y2AxisStyleText() {
    if (this.currentOrientation === ChartOrientation.Left) {
      return {"transform" : "rotate(-90deg) scale(" + this.scaleYWidth + ", " + this.scaleY + ")", "text-anchor" : "middle"};
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return {"transform" : "rotate(90deg) scale(" + this.scaleYWidth + ", " + this.scaleY + ")", "text-anchor" : "middle"};
    } else if (this.currentOrientation === ChartOrientation.Top) {
      return {"transform" : "rotate(180deg) scale(" + this.scaleYWidth + ", " + this.scaleY + ")", "text-anchor" : "end"};
    } else {
      return {"transform" : "rotate(0deg) scale(" + this.scaleYWidth + ", " + this.scaleY + ")", "text-anchor" : "start"};
    }
  }

  get y2AxisDescriptionYOffset() {
    if (this.currentOrientation === ChartOrientation.Left) {
      return -9;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return 3;
    } else {
      return -9;
    }
  }

  get y2AxisDescriptionXOffset() {
    if (this.currentOrientation === ChartOrientation.Left) {
      return -10;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return 7;
    } else {
      return -10;
    }
  }

  get y2AxisStyleDescription() {
    if (this.currentOrientation === ChartOrientation.Left) {
      return {"transform" : "rotate(-90deg) scale(" + this.scaleY + ", " + this.scaleYWidth + ")", "text-anchor" : "end"};
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return {"transform" : "rotate(90deg) scale(" + this.scaleY + ", " + this.scaleYWidth + ")", "text-anchor" : "start"};
    } else {
      return {"transform" : "rotate(-90deg) scale(" + this.scaleY + ", " + this.scaleYWidth + ")", "text-anchor" : "end"};
    }
  }

  svgMarginTop: number = 0;
  chartRotation: number = 0;

  get barChartStyle() {
    if (this.currentOrientation === ChartOrientation.Right) {
      return {"transform" : "rotate(-90deg)", "margin-top" : "-" + this.svgMarginTop + "px" };
    } else if (this.currentOrientation === ChartOrientation.Left) {
      return {"transform" : "rotate(90deg)", "margin-top" : "-" + this.svgMarginTop + "px" };
    } else if (this.currentOrientation === ChartOrientation.Top) {
      return {"transform" : "rotate(180deg)", "margin-top" : "0px"};
    } else {
      return {"transform" : "rotate(0deg)", "margin-top" : "0px"};
    }
  }

  svgWidth: string = '100%';
  svgHeight: string = '100%';
  
  ngAfterViewInit(): void {
    if (this.svgContainer && this.svgContainer.nativeElement) {
      if (this.currentOrientation === ChartOrientation.Right) {
        this.chartRotation = -90;
      } else if (this.currentOrientation === ChartOrientation.Left) {
        this.chartRotation = 90;
      } else if (this.currentOrientation === ChartOrientation.Top) {
        this.chartRotation = 180;
      } else {
        this.chartRotation = 0;
      }
      this.orientationCheck();
      this.orientationChange.subscribe((value: { oldValue: ChartOrientation, newValue: ChartOrientation })=> {
        if (value.oldValue != value.newValue) {
          if (value.newValue === ChartOrientation.Right) {
            this.chartRotation = -90;
          } else if (value.newValue === ChartOrientation.Left) {
            this.chartRotation = 90;
          } else if (value.newValue === ChartOrientation.Top) {
            this.chartRotation = 180;
          } else {
            this.chartRotation = 0;
          }
          if (value.newValue === ChartOrientation.Left || value.newValue === ChartOrientation.Right) {
            if (value.oldValue === ChartOrientation.Bottom || value.oldValue === ChartOrientation.Top) {
              this.svgWidth = this.svgContainer.nativeElement.parentElement.parentElement.clientHeight + 'px';
              this.svgHeight = this.svgContainer.nativeElement.parentElement.parentElement.clientWidth + 'px';
              this.marginOffsetCheck(value.newValue);
              this.cd.detectChanges();
            }
          } else if (value.newValue === ChartOrientation.Bottom || value.newValue === ChartOrientation.Top) {
            if (value.oldValue === ChartOrientation.Left || value.oldValue === ChartOrientation.Right) {
              this.svgWidth = "100%";
              this.svgHeight = "100%";
              this.marginOffsetCheck(value.newValue);
              this.cd.detectChanges();
            }
          }
        }
      })
      
      this.sizeChange();
    }
  }

  marginOffsetCheck(chartRotation: ChartOrientation) {
    if (chartRotation === ChartOrientation.Left || chartRotation === ChartOrientation.Right) {
      var marginCalc = ((this.svgContainer.nativeElement.parentElement.parentElement.clientHeight - this.svgContainer.nativeElement.parentElement.parentElement.clientWidth) / 2);
      this.svgMarginTop = marginCalc;
    } else {
      this.svgMarginTop = 0;
    }
    this.cd.detectChanges();
  }

  orientationCheck() {
    if (this.currentOrientation === ChartOrientation.Left || this.currentOrientation === ChartOrientation.Right) {
      if ((this.svgContainer.nativeElement.parentElement.parentElement.clientHeight + 'px') != this.svgWidth 
        || this.svgHeight != (this.svgContainer.nativeElement.parentElement.parentElement.clientWidth + 'px')) {
        this.svgWidth = this.svgContainer.nativeElement.parentElement.parentElement.clientHeight + 'px';
        this.svgHeight = this.svgContainer.nativeElement.parentElement.parentElement.clientWidth + 'px';
        this.marginOffsetCheck(this.currentOrientation);
        this.cd.detectChanges();
      }
    } else {
      this.svgWidth = '100%';
      this.svgHeight = '100%';
      this.cd.detectChanges();
    }
  }

  sizeChange() {
    setTimeout(() => {
      this.orientationCheck();
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
        this.scaleYWidth = 2.5;
        this.scaleYWidthOffset = 5;
        this.scaleYTextOffset = 16;
      } else if (this.cWidth <= 250) {
        this.scaleXWidth = 2;
        this.scaleYWidth = 1.6;
        this.scaleYWidthOffset = 5;
        this.scaleYTextOffset = 16;
      } else if (this.cWidth <= 450) {
        if (this.cWidth <= 350) {
          this.scaleYWidth = 1.6;
          this.scaleYWidthOffset = 5;
          this.scaleYTextOffset = 14;
        } else {
          this.scaleYWidth = 1.4;
          this.scaleYWidthOffset = 8;
          this.scaleYTextOffset = 16;
        }
        this.scaleXWidth = 1.5;
      } else if (this.cWidth <= 550) {
        this.scaleXWidth = 1;
        this.scaleYWidth = 1;
        this.scaleYWidthOffset = 12;
        this.scaleYTextOffset = 22;
      } else {
        this.scaleXWidth = 1;
        this.scaleYWidth = 1;
        this.scaleYWidthOffset = 12;
        this.scaleYTextOffset = 22;
      }
    } else {
      this.scaleX = 0.6;
      this.scaleY = 1.4;
      this.scaleXWidth = 1;
      this.scaleYWidth = 1;
      this.scaleYWidthOffset = 12;
      this.scaleYTextOffset = 22;
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
