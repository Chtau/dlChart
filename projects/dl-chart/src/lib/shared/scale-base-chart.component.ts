import { ChartItemService } from '../services/chart-item.service';
import { BaseChartComponent } from './base-chart.component';
import { ChartOrientation } from '../models/enums';
import { Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

export class ScaleBaseChartComponent<T> extends BaseChartComponent<T> {

  @Output() orientationChange: EventEmitter<{ oldValue: ChartOrientation, newValue: ChartOrientation }> = new EventEmitter<{ oldValue: ChartOrientation, newValue: ChartOrientation }>();

  currentScaleLabel: string = 'Values';
  valueSteps: number = 6;
  activeLeftScaleAxis: boolean = true;
  activeRightScaleAxis: boolean = false;
  currentOrientation: ChartOrientation = ChartOrientation.Bottom;
  yAxisTextXOffsetScale: number = 0;
  yAxisDescriptionYOffsetScale: number = 0;
  yAxisDescriptionYOffsetOrientationLeftRightScale: number = 0;
  currentClientWidth: number = 450;

  cHeight: number = 0;
  cWidth: number = 0;
  scaleX: number = 0.6;
  scaleXWidth: number = 1;
  scaleY: number = 1.4;
  scaleYWidth: number = 1;
  scaleYWidthOffset: number = 12;
  scaleYTextOffset: number = 22;
  svgMarginTop: number = 0;
  chartRotation: number = 0;
  svgWidth: string = '100%';
  svgHeight: string = '100%';

  svg: any

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
    this.orientationChange.emit({ oldValue: this.currentOrientation, newValue: val });
    this.currentOrientation = val;
  }

  constructor(public chartItemService: ChartItemService, public cd: ChangeDetectorRef) {
    super(chartItemService);
  }

  ngAfterViewInit(_svg: any): void {
    this.svg = _svg;
    this.chartRotationCheck(this.currentOrientation);
    if (this.svg && this.svg.nativeElement) {
      this.orientationCheck();
      this.orientationChange.subscribe((value: { oldValue: ChartOrientation, newValue: ChartOrientation })=> {
        if (value.oldValue != value.newValue) {
          this.chartRotationCheck(value.newValue);
          
          if (value.newValue === ChartOrientation.Left || value.newValue === ChartOrientation.Right) {
            if (value.oldValue === ChartOrientation.Bottom || value.oldValue === ChartOrientation.Top) {
              this.svgWidth = this.svg.nativeElement.parentElement.parentElement.clientHeight + 'px';
              this.svgHeight = this.svg.nativeElement.parentElement.parentElement.clientWidth + 'px';
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

  xAxisTextYOffsetStartEnd(index: number, length: number) {
    if (this.currentOrientation === ChartOrientation.Left) {
      if (index === 0) {
        return -8;
      } else if (index === length - 1) {
        return 1;
      }
      return -4;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      if (index === 0) {
        return 1;
      } else if (index === length - 1) {
        return -8;
      }
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

  xAxisStyleTextStartEnd(index: number, length: number) {
    let anchor: string = 'middle';
    if (this.currentOrientation === ChartOrientation.Left) {
      return {"transform" : "rotate(-90deg) ", "text-anchor" : "end"};
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return {"transform" : "rotate(90deg) ", "text-anchor" : "start"};
    } else if (this.currentOrientation === ChartOrientation.Top) {
      if (index === 0) {
        anchor = 'start'
      } else if (index === length - 1) {
        anchor = 'end'
      }
      return {"transform" : "rotate(180deg) ", "text-anchor" : anchor};
    } else {
      if (index === 0) {
        anchor = 'end'
      } else if (index === length - 1) {
        anchor = 'start'
      }
      return {"transform" : "rotate(0deg) ", "text-anchor" : anchor};
    }
  }

  get yAxisTextXOffset() {
    if (this.currentOrientation === ChartOrientation.Left) {
      return 0;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return 0;
    } else if (this.currentOrientation === ChartOrientation.Top) {
      return (-8 - this.yAxisTextXOffsetScale);
    } else {
      return (8 + this.yAxisTextXOffsetScale);
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
      return (16 + this.yAxisDescriptionYOffsetOrientationLeftRightScale);
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return (-22.5 - this.yAxisDescriptionYOffsetOrientationLeftRightScale);
    } else {
      return (22 + this.yAxisDescriptionYOffsetScale);
    }
  }

  get yAxisDescriptionXOffset() {
    if (this.currentOrientation === ChartOrientation.Left) {
      return -10;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return 6;
    } else {
      return -6;
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
      return 14;
    } else if (this.currentOrientation === ChartOrientation.Right) {
      return -13;
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
      return 1.5;
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
      return -6;
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

  chartRotationCheck(chartRotation: ChartOrientation) {
    if (chartRotation === ChartOrientation.Right) {
      this.chartRotation = -90;
    } else if (chartRotation === ChartOrientation.Left) {
      this.chartRotation = 90;
    } else if (chartRotation === ChartOrientation.Top) {
      this.chartRotation = 180;
    } else {
      this.chartRotation = 0;
    }
  }

  marginOffsetCheck(chartRotation: ChartOrientation) {
    if (chartRotation === ChartOrientation.Left || chartRotation === ChartOrientation.Right) {
      var marginCalc = ((this.svg.nativeElement.parentElement.parentElement.clientHeight - this.svg.nativeElement.parentElement.parentElement.clientWidth) / 2);
      this.svgMarginTop = marginCalc;
    } else {
      this.svgMarginTop = 0;
    }
  }

  orientationCheck() {
    if (this.currentOrientation === ChartOrientation.Left || this.currentOrientation === ChartOrientation.Right) {
      if ((this.svg.nativeElement.parentElement.parentElement.clientHeight + 'px') != this.svgWidth 
        || this.svgHeight != (this.svg.nativeElement.parentElement.parentElement.clientWidth + 'px')) {
        this.svgWidth = this.svg.nativeElement.parentElement.parentElement.clientHeight + 'px';
        this.svgHeight = this.svg.nativeElement.parentElement.parentElement.clientWidth + 'px';
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
      var newH = this.svg.nativeElement.clientHeight;
      var newW = this.svg.nativeElement.clientWidth;
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
      this.currentClientWidth = this.cWidth;
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
        this.yAxisDescriptionYOffsetScale = -8;
        this.yAxisDescriptionYOffsetOrientationLeftRightScale = -2;
        this.yAxisTextXOffsetScale = 0;
      } else if (this.cWidth <= 250) {
        this.scaleXWidth = 2;
        this.scaleYWidth = 1.6;
        this.scaleYWidthOffset = 5;
        this.scaleYTextOffset = 16;
        this.yAxisDescriptionYOffsetScale = -8;
        this.yAxisDescriptionYOffsetOrientationLeftRightScale = -2;
        this.yAxisTextXOffsetScale = 0;
      } else if (this.cWidth <= 450) {
        if (this.cWidth <= 350) {
          this.scaleYWidth = 1.6;
          this.scaleYWidthOffset = 5;
          this.scaleYTextOffset = 14;
          this.yAxisDescriptionYOffsetScale = -8;
          this.yAxisDescriptionYOffsetOrientationLeftRightScale = -2;
        } else {
          this.scaleYWidth = 1.4;
          this.scaleYWidthOffset = 8;
          this.scaleYTextOffset = 16;
          this.yAxisDescriptionYOffsetScale = -6;
          this.yAxisDescriptionYOffsetOrientationLeftRightScale = 0;
        }
        this.scaleXWidth = 1.5;
        this.yAxisTextXOffsetScale = 0;
      } else if (this.cWidth <= 550) {
        this.scaleXWidth = 1;
        this.scaleYWidth = 1;
        this.scaleYWidthOffset = 12;
        this.scaleYTextOffset = 22;
        this.yAxisDescriptionYOffsetScale = 0;
        this.yAxisDescriptionYOffsetOrientationLeftRightScale = 6;
        this.yAxisTextXOffsetScale = 4;
      } else {
        this.scaleXWidth = 1;
        this.scaleYWidth = 1;
        this.scaleYWidthOffset = 12;
        this.scaleYTextOffset = 22;
        this.yAxisDescriptionYOffsetScale = 0;
        this.yAxisDescriptionYOffsetOrientationLeftRightScale = 6;
        this.yAxisTextXOffsetScale = 4;
      }
    } else {
      this.scaleX = 0.6;
      this.scaleY = 1.4;
      this.scaleXWidth = 1;
      this.scaleYWidth = 1;
      this.scaleYWidthOffset = 12;
      this.scaleYTextOffset = 22;
      this.currentClientWidth = 450;
      this.yAxisDescriptionYOffsetOrientationLeftRightScale = 0;
    }
  }
}