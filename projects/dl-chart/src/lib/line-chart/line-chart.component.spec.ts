import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { LineChartComponent } from './line-chart.component';
import { Point } from '../models/point.model';
import { SimpleChange } from '@angular/core';
import { DlLineChartModule } from './line-chart.module';
import { TooltipConfiguration } from '../models/tooltipconfiguration.model';

describe('LineChartComponent', () => {
  let component: LineChartComponent;
  let fixture: ComponentFixture<LineChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DlLineChartModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LineChartComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load Bar values', () => {
    component.values = [
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
      }];
    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    expect(component.axisPoint.length).toBe(2, 'Line loaded');
  });

  it('create Steps', () => {
    component.values = [
      {
        color: 'red',
        cssClass: null,
        data: null,
        name: 'Red',
        tooltipConfig: null,
        points: [
          new Point(2020, 12),
          new Point(2017, 10, null, 'red'),
          new Point(2018, 15, undefined),
          new Point(2019, 7),
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
          new Point(2020, 1),
          new Point(2019, 22),
        ]
      }];
    component.steps = 10;
    component.hideLines = true;
    component.hidePoints = true;
    component.hideRaster = true;
    component.hideSelectionLines = true;
    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false),
      steps: new SimpleChange(null, component.steps, false),
      hideLines: new SimpleChange(null, component.hideLines, false),
      hideRaster: new SimpleChange(null, component.hideRaster, false),
    });
    fixture.detectChanges();

    expect(component.yAxis.length).toBe(11, 'Y Axis created');
  });

  it('create Segment css class', () => {
    component.values = [
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
          new Point(2017, 5, null, null, 'test'),
          new Point(2018, 9),
          new Point(2019, 22),
          new Point(2020, 1),
        ]
      }];

    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    let css = component.cssClassSegmentPoint(component.axisPoint[0].points[0]);
    expect(css).toBe('', 'Segement css class Point created');

    let cssCustom = component.cssClassSegmentPoint(component.axisPoint[1].points[0]);
    expect(cssCustom).toBe(' test', 'Segement custom css Point class created');
  });

  it('select/deselect Line', () => {
    let pointName: string;
    component.values = [
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
          new Point(2017, 5, null, null, 'test'),
          new Point(2018, 9, pointName),
          new Point(2019, 22),
          new Point(2020, 1, 'test', 'grey', 'point-test-1'),
        ]
      }];

    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    component.onClickSegment(component.axisPoint[0].points[0]);
    expect(component.currentActiveChartItem).toBeDefined('Axis Point selected');

    var css = component.cssClassSegmentPoint(component.axisPoint[0].points[0]);
    expect(css).toBe(' point-selected', 'Line Point deselected');

    var size = component.pointSize(component.axisPoint[0].points[0]);
    expect(size).toBe(7, 'Line Point size changed');

    var lpoint = component.currentActivePoint;
    expect(lpoint.color).toBe('red', 'Line Point size changed');

    expect(component.selectionXEndPoint).toBe(0, 'Selection endpoint default');

    component.onClickSegment(component.axisPoint[0].points[0]);
    expect(component.currentActiveChartItem).toBeNull('Line Point deselected');

    component.onClickSegment(component.axisPoint[1].points[0]);
    component.leftScaleAxis = false;
    component.rightScaleAxis = true;
    expect(component.selectionXEndPoint).toBe(100, 'Selection endpoint right Axis');

    component.onClickSegment(component.axisPoint[1].points[1]);
    component.leftScaleAxis = true;
    component.rightScaleAxis = false;
    expect(component.selectionXEndPoint).toBe(0, 'Selection endpoint leftAxis');

    component.onClickSegment(component.axisPoint[1].points[1]);
    component.leftScaleAxis = true;
    component.rightScaleAxis = false;
    expect(component.selectionXEndPoint).toBeUndefined('deselect endpoint leftAxis');

    component.onClickSegment(component.axisPoint[1].points[1]);
    component.leftScaleAxis = false;
    component.rightScaleAxis = true;
    component.currentActivePoint.x = 51;
    expect(component.selectionXEndPoint).toBe(100, 'Selection endpoint right axis X > 50');

    component.onClickSegment(component.axisPoint[1].points[2]);
    component.leftScaleAxis = true;
    component.rightScaleAxis = false;
    component.currentActivePoint.x = 51;
    expect(component.selectionXEndPoint).toBe(0, 'Selection endpoint left axis X > 50');

  });

  it('scale test', () => {
    let pointName: string;
    component.values = [
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
          new Point(2017, 5, null, null, 'test'),
          new Point(2018, 9, pointName),
          new Point(2019, 22),
          new Point(2020, 1, 'test', 'grey', 'point-test-1', new TooltipConfiguration(), {test: 1}),
        ]
      }];

    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    expect(component.currentActivePoint).toBeNull('no active point');
  });

  it('scale lines', () => {
    component.values = [
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
      }];
    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();
    component.scaleLabel = 'Test';
    component.leftScaleAxis = true;
    component.rightScaleAxis = true;

    expect(component.currentScaleLabel).toBe('Test', 'Scale label value');
  });

});

