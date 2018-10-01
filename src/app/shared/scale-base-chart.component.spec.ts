import { async, TestBed } from '@angular/core/testing';
import { ChartItemService } from '../services/chart-item.service';
import { ScaleBaseChartComponent } from './scale-base-chart.component';
import { IValue } from '../models/value.interface';
import { ChartOrientation } from '../models/enums';
import { CD } from './mock-change-detector';
import { MockElementRef } from './mock-elementref';


describe('ScaleBaseChartComponent', () => {
  let baseChart: ScaleBaseChartComponent<IValue>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
        ChartItemService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    var service = TestBed.get(ChartItemService);
    baseChart = new ScaleBaseChartComponent(service, new CD());
  });

  it('should create', () => {
    baseChart.ngAfterViewInit(null);
    expect(baseChart).toBeTruthy();
  });

  it('change orientation [Left]', () => {
    baseChart.orientation = ChartOrientation.Left;

    expect(baseChart.xAxisTextXOffset).toBe(-5, 'xAxisTextXOffset');
    expect(baseChart.xAxisTextYOffset).toBe(-4, 'xAxisTextYOffset');
    expect(baseChart.xAxisTextYOffsetStartEnd(0, 3)).toBe(-8, 'xAxisTextYOffsetStartEnd index 0');
    expect(baseChart.xAxisTextYOffsetStartEnd(2, 3)).toBe(1, 'xAxisTextYOffsetStartEnd index 2');
    expect(baseChart.xAxisTextYOffsetStartEnd(1, 3)).toBe(-4, 'xAxisTextYOffsetStartEnd index 1');
    expect(baseChart.xAxisStyleText.transform).toBe('rotate(-90deg) ', 'xAxisStyleText.transform');
    expect(baseChart.xAxisStyleText["text-anchor"]).toBe('end', 'xAxisStyleText.text-anchor');
    expect(baseChart.xAxisStyleTextStartEnd(0, 3).transform).toBe('rotate(-90deg) ', 'xAxisStyleTextStartEnd');
    expect(baseChart.yAxisTextXOffset).toBe(0, 'yAxisTextXOffset');
    expect(baseChart.yAxisTextYOffset).toBe(4, 'yAxisTextYOffset');
    expect(baseChart.yAxisStyleText["text-anchor"]).toBe('middle', 'yAxisStyleText.text-anchor');
    expect(baseChart.yAxisDescriptionYOffset).toBe(16, 'yAxisDescriptionYOffset');
    expect(baseChart.yAxisDescriptionXOffset).toBe(-10, 'yAxisDescriptionXOffset');
    expect(baseChart.yAxisStyleDescription["text-anchor"]).toBe('end', 'yAxisStyleDescription.text-anchor');
    expect(baseChart.y2AxisTextXOffset).toBe(0, 'y2AxisTextXOffset');
    expect(baseChart.y2AxisTextYOffset).toBe(14, 'y2AxisTextYOffset');
    expect(baseChart.y2AxisStyleText["text-anchor"]).toBe('middle', 'y2AxisStyleText["text-anchor"]');
    expect(baseChart.y2AxisDescriptionYOffset).toBe(-9, 'y2AxisDescriptionYOffset');
    expect(baseChart.y2AxisDescriptionXOffset).toBe(-10, 'y2AxisDescriptionXOffset');
    expect(baseChart.y2AxisStyleDescription["text-anchor"]).toBe('end', 'y2AxisStyleDescription["text-anchor"]');
    baseChart.chartRotationCheck(ChartOrientation.Left);
    expect(baseChart.chartRotation).toBe(90, 'chartRotationCheck');
    baseChart.marginOffsetCheck(ChartOrientation.Left);
    expect(baseChart.svgMarginTop).toBe(0, 'marginOffsetCheck');
    baseChart.orientationCheck();
    expect(baseChart.svgWidth).toBe('100%', 'orientationCheck');
    baseChart.sizeChange();
    baseChart.getScaleFromClientSize();
  });

  it('change orientation [Right]', () => {
    baseChart.orientation = ChartOrientation.Right;

    expect(baseChart.xAxisTextXOffset).toBe(5, 'xAxisTextXOffset');
    expect(baseChart.xAxisTextYOffset).toBe(-4, 'xAxisTextYOffset');
    expect(baseChart.xAxisTextYOffsetStartEnd(0, 3)).toBe(1, 'xAxisTextYOffsetStartEnd index 0');
    expect(baseChart.xAxisTextYOffsetStartEnd(2, 3)).toBe(-8, 'xAxisTextYOffsetStartEnd index 2');
    expect(baseChart.xAxisTextYOffsetStartEnd(1, 3)).toBe(-4, 'xAxisTextYOffsetStartEnd index 1');
    expect(baseChart.xAxisStyleText.transform).toBe('rotate(90deg) ', 'xAxisStyleText.transform');
    expect(baseChart.xAxisStyleText["text-anchor"]).toBe('start', 'xAxisStyleText.text-anchor');
    expect(baseChart.xAxisStyleTextStartEnd(0, 3).transform).toBe('rotate(90deg) ', 'xAxisStyleTextStartEnd');
    expect(baseChart.yAxisTextXOffset).toBe(0, 'yAxisTextXOffset');
    expect(baseChart.yAxisTextYOffset).toBe(-4, 'yAxisTextYOffset');
    expect(baseChart.yAxisStyleText["text-anchor"]).toBe('middle', 'yAxisStyleText.text-anchor');
    expect(baseChart.yAxisDescriptionYOffset).toBe(-22.5, 'yAxisDescriptionYOffset');
    expect(baseChart.yAxisDescriptionXOffset).toBe(6, 'yAxisDescriptionXOffset');
    expect(baseChart.yAxisStyleDescription["text-anchor"]).toBe('start', 'yAxisStyleDescription.text-anchor');
    expect(baseChart.y2AxisTextXOffset).toBe(0, 'y2AxisTextXOffset');
    expect(baseChart.y2AxisTextYOffset).toBe(-13, 'y2AxisTextYOffset');
    expect(baseChart.y2AxisStyleText["text-anchor"]).toBe('middle', 'y2AxisStyleText["text-anchor"]');
    expect(baseChart.y2AxisDescriptionYOffset).toBe(1.5, 'y2AxisDescriptionYOffset');
    expect(baseChart.y2AxisDescriptionXOffset).toBe(7, 'y2AxisDescriptionXOffset');
    expect(baseChart.y2AxisStyleDescription["text-anchor"]).toBe('start', 'y2AxisStyleDescription["text-anchor"]');
    baseChart.chartRotationCheck(ChartOrientation.Right);
    expect(baseChart.chartRotation).toBe(-90, 'chartRotationCheck');
    baseChart.marginOffsetCheck(ChartOrientation.Right);
    expect(baseChart.svgMarginTop).toBe(0, 'marginOffsetCheck');
    baseChart.orientationCheck();
    expect(baseChart.svgWidth).toBe('100%', 'orientationCheck');
    baseChart.sizeChange();
    baseChart.getScaleFromClientSize();
  });

  it('change orientation [Top]', () => {
    baseChart.orientation = ChartOrientation.Top;

    expect(baseChart.xAxisTextXOffset).toBe(0, 'xAxisTextXOffset');
    expect(baseChart.xAxisTextYOffset).toBe(-14, 'xAxisTextYOffset');
    expect(baseChart.xAxisTextYOffsetStartEnd(0, 3)).toBe(-14, 'xAxisTextYOffsetStartEnd index 0');
    expect(baseChart.xAxisTextYOffsetStartEnd(2, 3)).toBe(-14, 'xAxisTextYOffsetStartEnd index 2');
    expect(baseChart.xAxisTextYOffsetStartEnd(1, 3)).toBe(-14, 'xAxisTextYOffsetStartEnd index 1');
    expect(baseChart.xAxisStyleText.transform).toBe('rotate(180deg) ', 'xAxisStyleText.transform');
    expect(baseChart.xAxisStyleText["text-anchor"]).toBe('middle', 'xAxisStyleText.text-anchor');
    expect(baseChart.xAxisStyleTextStartEnd(0, 3).transform).toBe('rotate(180deg) ', 'xAxisStyleTextStartEnd');
    expect(baseChart.xAxisStyleTextStartEnd(2, 3)["text-anchor"]).toBe('end', 'xAxisStyleTextStartEnd["text-anchor"] index 2');
    expect(baseChart.yAxisTextXOffset).toBe(-8, 'yAxisTextXOffset');
    expect(baseChart.yAxisTextYOffset).toBe(0, 'yAxisTextYOffset');
    expect(baseChart.yAxisStyleText["text-anchor"]).toBe('start', 'yAxisStyleText.text-anchor');
    expect(baseChart.yAxisDescriptionYOffset).toBe(22, 'yAxisDescriptionYOffset');
    expect(baseChart.yAxisDescriptionXOffset).toBe(-6, 'yAxisDescriptionXOffset');
    expect(baseChart.yAxisStyleDescription["text-anchor"]).toBe('end', 'yAxisStyleDescription.text-anchor');
    expect(baseChart.y2AxisTextXOffset).toBe(-8, 'y2AxisTextXOffset');
    expect(baseChart.y2AxisTextYOffset).toBe(0, 'y2AxisTextYOffset');
    expect(baseChart.y2AxisStyleText["text-anchor"]).toBe('end', 'y2AxisStyleText["text-anchor"]');
    expect(baseChart.y2AxisDescriptionYOffset).toBe(-9, 'y2AxisDescriptionYOffset');
    expect(baseChart.y2AxisDescriptionXOffset).toBe(-6, 'y2AxisDescriptionXOffset');
    expect(baseChart.y2AxisStyleDescription["text-anchor"]).toBe('end', 'y2AxisStyleDescription["text-anchor"]');
    baseChart.chartRotationCheck(ChartOrientation.Top);
    expect(baseChart.chartRotation).toBe(180, 'chartRotationCheck');
    baseChart.marginOffsetCheck(ChartOrientation.Top);
    expect(baseChart.svgMarginTop).toBe(0, 'marginOffsetCheck');
    baseChart.orientationCheck();
    expect(baseChart.svgWidth).toBe('100%', 'orientationCheck');
    baseChart.sizeChange();
    baseChart.getScaleFromClientSize();
  });

  it('change orientation [Bottom]', () => {
    baseChart.orientation = ChartOrientation.Bottom;

    expect(baseChart.xAxisTextXOffset).toBe(0, 'xAxisTextXOffset');
    expect(baseChart.xAxisTextYOffset).toBe(6, 'xAxisTextYOffset');
    expect(baseChart.xAxisTextYOffsetStartEnd(0, 3)).toBe(6, 'xAxisTextYOffsetStartEnd index 0');
    expect(baseChart.xAxisTextYOffsetStartEnd(2, 3)).toBe(6, 'xAxisTextYOffsetStartEnd index 2');
    expect(baseChart.xAxisTextYOffsetStartEnd(1, 3)).toBe(6, 'xAxisTextYOffsetStartEnd index 1');
    expect(baseChart.xAxisStyleText.transform).toBe('rotate(0deg) ', 'xAxisStyleText.transform');
    expect(baseChart.xAxisStyleText["text-anchor"]).toBe('middle', 'xAxisStyleText.text-anchor');
    expect(baseChart.xAxisStyleTextStartEnd(0, 3).transform).toBe('rotate(0deg) ', 'xAxisStyleTextStartEnd');
    expect(baseChart.yAxisTextXOffset).toBe(8, 'yAxisTextXOffset');
    expect(baseChart.yAxisTextYOffset).toBe(0, 'yAxisTextYOffset');
    expect(baseChart.yAxisStyleText["text-anchor"]).toBe('end', 'yAxisStyleText.text-anchor');
    expect(baseChart.yAxisDescriptionYOffset).toBe(22, 'yAxisDescriptionYOffset');
    expect(baseChart.yAxisDescriptionXOffset).toBe(-6, 'yAxisDescriptionXOffset');
    expect(baseChart.yAxisStyleDescription["text-anchor"]).toBe('end', 'yAxisStyleDescription.text-anchor');
    expect(baseChart.y2AxisTextXOffset).toBe(8, 'y2AxisTextXOffset');
    expect(baseChart.y2AxisTextYOffset).toBe(0, 'y2AxisTextYOffset');
    expect(baseChart.y2AxisStyleText["text-anchor"]).toBe('start', 'y2AxisStyleText["text-anchor"]');
    expect(baseChart.y2AxisDescriptionYOffset).toBe(-9, 'y2AxisDescriptionYOffset');
    expect(baseChart.y2AxisDescriptionXOffset).toBe(-6, 'y2AxisDescriptionXOffset');
    expect(baseChart.y2AxisStyleDescription["text-anchor"]).toBe('end', 'y2AxisStyleDescription["text-anchor"]');
    baseChart.chartRotationCheck(ChartOrientation.Bottom);
    expect(baseChart.chartRotation).toBe(0, 'chartRotationCheck');
    baseChart.marginOffsetCheck(ChartOrientation.Bottom);
    expect(baseChart.svgMarginTop).toBe(0, 'marginOffsetCheck');
    baseChart.orientationCheck();
    expect(baseChart.svgWidth).toBe('100%', 'orientationCheck');
    baseChart.sizeChange();
    baseChart.getScaleFromClientSize();
  });

  it('svg parent', () => {

    var svg = new MockElementRef();
    baseChart.ngAfterViewInit(svg);
    baseChart.svg = svg;
    baseChart.marginOffsetCheck(ChartOrientation.Bottom);
    expect(baseChart.svgMarginTop).toBe(0, 'marginOffsetCheck');
    baseChart.currentOrientation = ChartOrientation.Left;
    baseChart.orientationCheck();
    expect(baseChart.svgWidth).toBe('400px', 'orientationCheck Left');
    baseChart.currentOrientation = ChartOrientation.Right;
    baseChart.orientationCheck();
    expect(baseChart.svgWidth).toBe('400px', 'orientationCheck Right');
    baseChart.currentOrientation = ChartOrientation.Bottom;
    baseChart.orientationCheck();
    expect(baseChart.svgWidth).toBe('100%', 'orientationCheck Bottom');
    //baseChart.sizeChange();

    baseChart.orientationChange.emit({ oldValue: ChartOrientation.Bottom, newValue: ChartOrientation.Left });
    baseChart.orientationChange.emit({ oldValue: ChartOrientation.Bottom, newValue: ChartOrientation.Bottom });
    baseChart.orientationChange.emit({ oldValue: ChartOrientation.Left, newValue: ChartOrientation.Top });
    baseChart.orientationChange.emit({ oldValue: ChartOrientation.Right, newValue: ChartOrientation.Top });
    baseChart.orientationChange.emit({ oldValue: ChartOrientation.Right, newValue: ChartOrientation.Left });
    baseChart.orientationChange.emit({ oldValue: ChartOrientation.Right, newValue: ChartOrientation.Top });
    baseChart.orientationChange.emit({ oldValue: ChartOrientation.Left, newValue: ChartOrientation.Bottom });
    baseChart.orientationChange.emit({ oldValue: ChartOrientation.Right, newValue: ChartOrientation.Bottom });
    baseChart.orientationChange.emit({ oldValue: ChartOrientation.Top, newValue: ChartOrientation.Bottom });
    
  });

  it('scale size change', () => {

    baseChart.getScaleFromClientSize();

    baseChart.cWidth = 150;
    baseChart.cHeight = 150;
    baseChart.getScaleFromClientSize();
    expect(baseChart.scaleX).toBe(1.1, 'scale X 150');
    expect(baseChart.scaleY).toBe(2.5, 'scale Y 150');

    baseChart.cWidth = 175;
    baseChart.cHeight = 175;
    baseChart.getScaleFromClientSize();
    expect(baseChart.scaleX).toBe(1, 'scale X 175');
    expect(baseChart.scaleY).toBe(2.4, 'scale Y 175');

    baseChart.cWidth = 200;
    baseChart.cHeight = 200;
    baseChart.getScaleFromClientSize();
    expect(baseChart.scaleX).toBe(0.8, 'scale X 200');
    expect(baseChart.scaleY).toBe(2.3, 'scale Y 200');

    baseChart.cWidth = 250;
    baseChart.cHeight = 250;
    baseChart.getScaleFromClientSize();
    expect(baseChart.scaleX).toBe(0.7, 'scale X 250');
    expect(baseChart.scaleY).toBe(2, 'scale Y 250');

    baseChart.cWidth = 350;
    baseChart.cHeight = 350;
    baseChart.getScaleFromClientSize();
    expect(baseChart.scaleX).toBe(0.6, 'scale X 350');
    expect(baseChart.scaleY).toBe(1.8, 'scale Y 350');

    baseChart.cWidth = 450;
    baseChart.cHeight = 450;
    baseChart.getScaleFromClientSize();
    expect(baseChart.scaleX).toBe(.5, 'scale X 450');
    expect(baseChart.scaleY).toBe(1.4, 'scale Y 450');

    baseChart.cWidth = 550;
    baseChart.cHeight = 550;
    baseChart.getScaleFromClientSize();
    expect(baseChart.scaleX).toBe(.4, 'scale X 550');
    expect(baseChart.scaleY).toBe(1.2, 'scale Y 550');

    baseChart.cWidth = 650;
    baseChart.cHeight = 650;
    baseChart.getScaleFromClientSize();
    expect(baseChart.scaleX).toBe(.3, 'scale X 650');
    expect(baseChart.scaleY).toBe(1.2, 'scale Y 650');

    baseChart.cWidth = 750;
    baseChart.cHeight = 750;
    baseChart.getScaleFromClientSize();
    expect(baseChart.scaleX).toBe(.3, 'scale X 750');
    expect(baseChart.scaleY).toBe(1, 'scale Y 750');

    baseChart.cWidth = 850;
    baseChart.cHeight = 850;
    baseChart.getScaleFromClientSize();
    expect(baseChart.scaleX).toBe(.3, 'scale X 850');
    expect(baseChart.scaleY).toBe(.8, 'scale Y 850');

    baseChart.cWidth = 950;
    baseChart.cHeight = 950;
    baseChart.getScaleFromClientSize();

    expect(baseChart.scaleX).toBe(.3, 'scale X 950');
    expect(baseChart.scaleY).toBe(.8, 'scale Y 950');
    
  });

});

