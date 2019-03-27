import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartComponent } from './bar-chart.component';
import { DlBarChartModule } from "./bar-chart.module";
import { Value } from '../models/value.model';
import { TooltipConfiguration } from '../models/tooltipconfiguration.model';
import { SimpleChange } from '@angular/core';
import { ChartOrientation } from '../models/enums';
import { Bar } from '../models/bar.model';
import { UtilsService } from '../services/utils.service';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;
  let utils: UtilsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DlBarChartModule
      ], providers: [
        UtilsService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    utils = TestBed.get(UtilsService);
    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    //fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load Bar values', () => {
    component.values = [
      new Value('Blue', 3, 'Blue'),
      new Value('Orange', 3, 'Orange'),
    ];
    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    expect(component.bars.length).toBe(2, 'Bars loaded');
  });

  it('create Steps', () => {
    component.values = [
      new Value('Blue', 3, 'Blue'),
      new Value('Orange', 3, 'Orange'),
    ];
    component.steps = 10;
    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false),
      steps: new SimpleChange(null, component.steps, false)
    });
    fixture.detectChanges();

    expect(component.yAxis.length).toBe(11, 'Y Axis created');
  });

  it('create Segment css class', () => {
    component.values = [
      new Value('Blue', 3, 'Blue'),
      new Value('Orange', 3, 'Orange'),
      new Value('Orange', 3, 'Orange', 'test'),
    ];

    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    let css = component.cssClassSegment(component.bars[0]);
    expect(css).toBe(' bar-anim-top-bottom', 'Segement css class even created');

    let cssCustom = component.cssClassSegment(component.bars[2]);
    expect(cssCustom).toBe(' bar-anim-top-bottom test', 'Segement custom css class created');
  });

  it('Segment Tooltips', () => {
    component.values = [
      new Value('Blue', 3, 'Blue'),
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(false)),
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(null, (val: Value, perc) => { return val.name + ' (' + val.value + ')' })),
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' ( ' + perc + '% )' })),
    ];

    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    component.tooltipContentChartItem = component.bars[0];
    component.tooltipContentItem = component.bars[0].sourceItem;

    let tooltipDefault = component.tooltipValue;
    expect(tooltipDefault).toBe('Blue (3)', 'default Segement Tooltip');

    component.tooltipContentChartItem = component.bars[1];
    component.tooltipContentItem = component.bars[1].sourceItem;

    let tooltipWithValue = component.tooltipValue;
    expect(tooltipWithValue).toBe('Orange (3)', 'Segement Tooltip (Name + Value)');

    component.tooltipContentChartItem = component.bars[2];
    component.tooltipContentItem = component.bars[2].sourceItem;

    let tooltipFunc1 = component.tooltipValue;
    expect(tooltipFunc1).toBe('Orange (3)', 'Segement Tooltip function 1');

    component.tooltipContentChartItem = component.bars[3];
    component.tooltipContentItem = component.bars[3].sourceItem;

    let tooltipFunc2 = component.tooltipValue;
    expect(tooltipFunc2).toBe('Orange ( 100% )', 'Segement Tooltip function 2');
  });

  it('global Tooltips configuration', () => {
    component.values = [
      new Value('Blue', 3, 'Blue'),
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(null, (val: Value, perc) => { return val.name + ' (' + val.value + ')' })),
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' ( ' + perc + '% )' })),
    ];

    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    component.tooltipConfiguration = new TooltipConfiguration(false);
    component.tooltipContentChartItem = component.bars[0];
    component.tooltipContentItem = component.bars[0].sourceItem;

    let tooltipGlobal = component.tooltipValue;
    expect(tooltipGlobal).toBe('Blue (3)', 'global Tooltip (Name + Value)');

    component.tooltipContentChartItem = component.bars[1];
    component.tooltipContentItem = component.bars[1].sourceItem;

    let tooltipSegemntOverride = component.tooltipValue;
    expect(tooltipSegemntOverride).toBe('Orange (3)', 'global Tooltip segment override');

    component.tooltipConfiguration = new TooltipConfiguration(null, (val: Value, perc) => { return val.name + ' (' + val.value + ')' });
    component.tooltipContentChartItem = component.bars[0];
    component.tooltipContentItem = component.bars[0].sourceItem;

    let tooltipGlobalFunc = component.tooltipValue;
    expect(tooltipGlobalFunc).toBe('Blue (3)', 'global Tooltip function');

    component.tooltipContentChartItem = component.bars[2];
    component.tooltipContentItem = component.bars[2].sourceItem;

    let tooltipFuncSegemntOverride = component.tooltipValue;
    expect(tooltipFuncSegemntOverride).toBe('Orange ( 100% )', 'global Tooltip segment override');

  });

  it('Bar null and undifiend', () => {
    component.values = [
      new Value('Blue', null, 'Blue'),
      new Value('Orange', undefined, 'Orange'),
      new Value('Orange', 3, 'Orange', 'test'),
    ];

    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    var item0 = component.bars[0].sourceItem as Value;
    var item1 = component.bars[1].sourceItem as Value;
    expect(item0.value).toBe(0, 'null input value replaced with 0');
    expect(item1.value).toBe(0, 'undefined input value replaced with 0');
  });

  it('Bar create Y Axis', () => {
    component.values = [
      new Value('Blue', null, 'Blue'),
      new Value('Orange', undefined, 'Orange'),
      new Value('Orange', 3, 'Orange', 'test'),
    ];

    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    var yA: string[] = [];
    for (let index = 0; index < (5 + 1); index++) {
      yA.push(utils.roundScale(1 * index).toString());
    }

    component.yAxis = utils.createYAxis(0, 5, 1, 1, 5);
    //component.createYAxis(yA);

    expect(component.yAxis.length).toBe(6, '6 Y Axis steps');
    expect(component.yAxis[0].text === '0' 
    && component.yAxis[1].text === '1'
    && component.yAxis[2].text === '2'
    && component.yAxis[3].text === '3'
    && component.yAxis[4].text === '4'
    && component.yAxis[5].text === '5'
    ).toBeTruthy('Y Axis values');
  });

  it('Bar create X Axis', () => {
    component.values = [
      new Value('Blue', null, 'Blue'),
      new Value('Orange', undefined, 'Orange'),
      new Value('Orange', 3, 'Orange', 'test'),
    ];

    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    let bars: { val: Value, position: number}[] = [];
    let index: number = 1;
    component.currentValues.forEach(item => {
      bars.push(
        {
          val: item,
          position: (5 * index) + (25 * (index - 1))
        }
      );
      index++;
    });

    component.createXAxis(25, bars);

    expect(component.xAxis.length).toBe(3, '3 X Axis steps');
    expect(component.xAxis[0].text === 'Blue' 
    && component.xAxis[1].text === 'Orange'
    && component.xAxis[2].text === 'Orange'
    ).toBeTruthy('X Axis values');
  });

  it('scale label (Y Axis)', () => {
    expect(component.currentScaleLabel).toBe('', 'default scale label');
    component.scaleLabel = 'Y Axis Text';
    expect(component.currentScaleLabel).toBe('Y Axis Text', 'new scale label value');
  });

  it('Bars with all 0 values', () => {
    component.values = [
      new Value('Blue', 0, 'Blue'),
      new Value('Orange', 0, 'Orange'),
    ];
    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    expect(component.bars.length).toBe(2, 'Bars loaded');
  });

  it('Bars with all - values', () => {
    component.values = [
      new Value('Blue', -5, 'Blue'),
      new Value('Orange', 0, 'Orange'),
      new Value('Red', 3, 'Red'),
    ];
    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    expect(component.barGroundLineY).toBe(37.5, 'Bar ground line Y calculated');
  });

  it('select/deselect Bar', () => {
    var segement: Bar = {
      calculatedPercent: 0,
      color: 'red',
      height: 1,
      id: '0',
      sourceItem: null,
      width: 1,
      isMinusValue: false,
      x: 0,
      y: 0
    };
    component.onClickSegment(segement);
    expect(component.currentActiveBar.id).toBe('0', 'Bar selected');

    var css = component.cssClassSegment(segement);
    expect(css).toBe(' bar-anim-top-bottom bar-selected', 'Bar deselected');

    component.onClickSegment(segement);
    expect(component.currentActiveBar).toBeNull('Bar deselected');
  });

  it('chart orientation [Bottom]', () => {
    var segement: Bar = {
      calculatedPercent: 0,
      color: 'red',
      height: 1,
      id: '0',
      sourceItem: null,
      width: 1,
      isMinusValue: false,
      x: 0,
      y: 0
    };
    component.rightScaleAxis = true;
    component.leftScaleAxis = true;
    component.orientation = ChartOrientation.Bottom;
    expect(component.cssClassSegment(segement)).toBe(' bar-anim-top-bottom', 'CSS class');
    expect(component.normOrientation(1, 2, 3, 4)).toBe(1, 'Normnalized orientation Value')
  });

  it('chart orientation [Left]', () => {
    var segement: Bar = {
      calculatedPercent: 0,
      color: 'red',
      height: 1,
      id: '0',
      sourceItem: null,
      width: 1,
      isMinusValue: false,
      x: 0,
      y: 0
    };
    component.rightScaleAxis = true;
    component.leftScaleAxis = true;
    component.orientation = ChartOrientation.Left;
    expect(component.cssClassSegment(segement)).toBe(' bar-anim-left-right', 'CSS class');
    expect(component.normOrientation(1, 2, 3, 4)).toBe(3, 'Normnalized orientation Value')
  });

  it('chart orientation [Right]', () => {
    var segement: Bar = {
      calculatedPercent: 0,
      color: 'red',
      height: 1,
      id: '0',
      sourceItem: null,
      width: 1,
      isMinusValue: false,
      x: 0,
      y: 0
    };
    component.rightScaleAxis = true;
    component.leftScaleAxis = true;
    component.orientation = ChartOrientation.Right;
    expect(component.cssClassSegment(segement)).toBe(' bar-anim-left-right', 'CSS class');
    expect(component.normOrientation(1, 2, 3, 4)).toBe(2, 'Normnalized orientation Value')
  });

  it('chart orientation [Top]', () => {
    var segement: Bar = {
      calculatedPercent: 0,
      color: 'red',
      height: 1,
      id: '0',
      sourceItem: null,
      width: 1,
      isMinusValue: false,
      x: 0,
      y: 0
    };
    component.rightScaleAxis = true;
    component.leftScaleAxis = true;
    component.orientation = ChartOrientation.Top;
    expect(component.cssClassSegment(segement)).toBe(' bar-anim-top-bottom', 'CSS class');
    expect(component.normOrientation(1, 2, 3, 4)).toBe(4, 'Normnalized orientation Value')
  });

  it('Bar offset', () => {
    component.values = [
      new Value('Blue', 0, 'Blue'),
      new Value('Orange', 0, 'Orange'),
    ];
    component.barOffset = 10;
    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    expect(component.bars[0].width).toBe(35, 'Bar width');
  });

  it('Bar hide selection line', () => {
    component.values = [
      new Value('Blue', 0, 'Blue'),
      new Value('Orange', 0, 'Orange'),
    ];
    component.hideSelectLine = true;
    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    component.onClickSegment(component.bars[0]);
    
    expect(!(component.currentActiveBar != null && !component.shouldHideSelectLine)).toBeTruthy('Line will not be shown');
  });

  it('Bar change to full filled bar', () => {
    component.values = [
      new Value('Blue', 0, 'Blue'),
      new Value('Orange', 0, 'Orange'),
    ];
    component.barFullFilled = true;
    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();
    expect(component.barFillOpacity).toBe("1", 'Bars will have full opacity');
  });

});
