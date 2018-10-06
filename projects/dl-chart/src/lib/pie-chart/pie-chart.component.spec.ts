import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartComponent } from './pie-chart.component';
import { DlPieChartModule } from "./pie-chart.module";
import { Value } from '../models/value.model';
import { TooltipConfiguration } from '../models/tooltipconfiguration.model';
import { SimpleChange } from '@angular/core';
import { DonutConfiguration } from '../models/donutconfiguration.model';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DlPieChartModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load pie values', () => {
    component.values = [
      new Value('Blue', 3, 'Blue'),
      new Value('Orange', 3, 'Orange'),
    ];

    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    expect(component.pie.length).toBe(2, 'pie slices loaded');
  });

  it('create Element Id', () => {
    component.values = [
      new Value('Blue', 3, 'Blue'),
      new Value('Orange', 3, 'Orange'),
    ];

    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    expect(component.createElementId(component.pie[0], 0)).toBe('chart-slice-0', 'Slice Element Id created');
  });

  it('create Segment css class', () => {
    component.values = [
      new Value('Blue', 3, 'Blue'),
      new Value('Orange', 3, 'Orange'),
      new Value('Orange', 3, 'Orange', 'test')
    ];

    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    let cssEven = component.cssClassSegment(component.pie[0], 0);
    expect(cssEven).toBe('slice slice-anim-even', 'Segement css class even created');

    let cssOdd = component.cssClassSegment(component.pie[1], 1);
    expect(cssOdd).toBe('slice slice-anim', 'Segement css class odd created');

    let cssCustom = component.cssClassSegment(component.pie[2], 2);
    expect(cssCustom).toBe('slice test slice-anim-even', 'Segement custom css class created');

    component.onClickSegment(component.pie[1]);
    let cssOdd1 = component.cssClassSegment(component.pie[1], 1);
    expect(cssOdd1).toBe('slice slice-selected slice-anim', 'Segement css class selected');
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

    component.tooltipContentChartItem = component.pie[0];
    component.tooltipContentItem = component.pie[0].sourceItem;


    let tooltipDefault = component.tooltipValue;
    expect(tooltipDefault).toBe('Blue (3)', 'default Segement Tooltip');

    component.tooltipContentChartItem = component.pie[1];
    component.tooltipContentItem = component.pie[1].sourceItem;


    let tooltipWithValue = component.tooltipValue;
    expect(tooltipWithValue).toBe('Orange (3)', 'Segement Tooltip (Name + Value)');

    component.tooltipContentChartItem = component.pie[2];
    component.tooltipContentItem = component.pie[2].sourceItem;

    let tooltipFunc1 = component.tooltipValue;
    expect(tooltipFunc1).toBe('Orange (3)', 'Segement Tooltip function 1');

    component.tooltipContentChartItem = component.pie[3];
    component.tooltipContentItem = component.pie[3].sourceItem;

    let tooltipFunc2 = component.tooltipValue;
    expect(tooltipFunc2).toBe('Orange ( 25% )', 'Segement Tooltip function 2');
  });

  it('global Tooltips configuration', () => {
    component.values = [
      new Value('Blue', 3, 'Blue'),
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(null, (val: Value, perc) => { return val.name + ' (' + val.value + ')' })),
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' ( ' + perc + '% )' })),
    ];

    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false),
    });
    fixture.detectChanges();

    component.tooltipConfiguration = new TooltipConfiguration(false);
    component.tooltipContentChartItem = component.pie[0];
    component.tooltipContentItem = component.pie[0].sourceItem;

    let tooltipGlobal = component.tooltipValue;
    expect(tooltipGlobal).toBe('Blue (3)', 'global Tooltip (Name + Value)');

    component.tooltipContentChartItem = component.pie[1];
    component.tooltipContentItem = component.pie[1].sourceItem;

    let tooltipSegemntOverride = component.tooltipValue;
    expect(tooltipSegemntOverride).toBe('Orange (3)', 'global Tooltip segment override');

    component.tooltipConfiguration = new TooltipConfiguration(null, (val: Value, perc) => { return val.name + ' (' + val.value + ')' });
    component.tooltipContentChartItem = component.pie[0];
    component.tooltipContentItem = component.pie[0].sourceItem;

    let tooltipGlobalFunc = component.tooltipValue;
    expect(tooltipGlobalFunc).toBe('Blue (3)', 'global Tooltip function');

    component.tooltipContentChartItem = component.pie[2];
    component.tooltipContentItem = component.pie[2].sourceItem;

    let tooltipFuncSegemntOverride = component.tooltipValue;
    expect(tooltipFuncSegemntOverride).toBe('Orange ( 33.33% )', 'global Tooltip segment override');

  });

  it('Slice null and undifiend', () => {
    component.values = [
      new Value('Blue', null, 'Blue'),
      new Value('Orange', undefined, 'Orange'),
      new Value('Orange', 3, 'Orange', 'test'),
    ];

    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false),
    });
    fixture.detectChanges();

    var item0 = component.pie[0].sourceItem as Value;
    var item1 = component.pie[1].sourceItem as Value;
    expect(item0.value).toBe(0, 'null input value replaced with 0');
    expect(item1.value).toBe(0, 'undefined input value replaced with 0');
  });

  it('Pie normalized value', () => {
    component.values = [
      new Value('Blue', 1, 'Blue'),
      new Value('Orange', 2, 'Orange'),
      new Value('Orange', 3, 'Orange', 'test'),
    ];

    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false),
    });
    fixture.detectChanges();

    expect(component.getNormalizedValue(10, 1)).toBe(0.1, 'normalize Value');

    expect(component.getNormalizedValue(100, -100)).toBe(0.0, 'normalize Value (smaller 0%)');
  });

  it('Slice percent coordinates', () => {
    component.values = [
      new Value('Blue', 1, 'Blue'),
      new Value('Orange', 2, 'Orange'),
      new Value('Orange', 3, 'Orange', 'test'),
    ];

    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false),
    });
    fixture.detectChanges();

    component.donutConfiguration = {
      color: 'white',
      size: 0.5
    };
    var cor = component.getCoordinatesForPercent(180);
    expect(Math.round(cor[0])).toBe(1, 'normalize Value X');
    expect(Math.round(cor[1])).toBe(-0, 'normalize Value Y');
  });

  it('load donut values', () => {
    component.values = [
      new Value('Blue', 3, 'Blue'),
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(), { test: 1}),
    ];
    component.donutConfiguration = new DonutConfiguration(3, 'white');
    component.tooltipConfiguration = new TooltipConfiguration();

    component.ngOnChanges({
      values: new SimpleChange(null, component.values, false)
    });
    fixture.detectChanges();

    expect(component.pie.length).toBe(2, 'donut slices loaded');
  });

});
