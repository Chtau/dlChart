import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BarChartComponent } from './bar-chart.component';
import { DlBarChartModule } from "./bar-chart.module";
import { Value } from '../models/value.model';
import { TooltipConfiguration } from '../models/tooltipconfiguration.model';

describe('BarChartComponent', () => {
  let component: BarChartComponent;
  let fixture: ComponentFixture<BarChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DlBarChartModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BarChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('load Bar values', () => {
    component.values = [
      new Value('Blue', 3, 'Blue'),
      new Value('Orange', 3, 'Orange'),
    ];

    expect(component.bars.length).toBe(2, 'Bars loaded');
  });

  it('create Segment css class', () => {
    component.values = [
      new Value('Blue', 3, 'Blue'),
      new Value('Orange', 3, 'Orange'),
      new Value('Orange', 3, 'Orange', 'test'),
    ];

    let css = component.cssClassSegment(component.bars[0]);
    expect(css).toBe('', 'Segement css class even created');

    let cssCustom = component.cssClassSegment(component.bars[2]);
    expect(cssCustom).toBe(' test', 'Segement custom css class created');
  });

  it('Segment Tooltips', () => {
    component.values = [
      new Value('Blue', 3, 'Blue'),
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(false)),
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' (' + val.value + ')' })),
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' ( ' + perc + '% )' })),
    ];

    component.tooltipContentChartItem = component.bars[0];
    component.tooltipContentItem = component.bars[0].sourceItem;

    let tooltipDefault = component.tooltipValue;
    expect(tooltipDefault).toBe('Blue (3)', 'default Segement Tooltip');

    component.tooltipContentChartItem = component.bars[1];
    component.tooltipContentItem = component.bars[1].sourceItem;

    let tooltipWithValue = component.tooltipValue;
    expect(tooltipWithValue).toBe('Orange 3', 'Segement Tooltip (Name + Value)');

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
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' (' + val.value + ')' })),
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' ( ' + perc + '% )' })),
    ];

    component.tooltipConfiguration = new TooltipConfiguration(false);
    component.tooltipContentChartItem = component.bars[0];
    component.tooltipContentItem = component.bars[0].sourceItem;

    let tooltipGlobal = component.tooltipValue;
    expect(tooltipGlobal).toBe('Blue 3', 'global Tooltip (Name + Value)');

    component.tooltipContentChartItem = component.bars[1];
    component.tooltipContentItem = component.bars[1].sourceItem;

    let tooltipSegemntOverride = component.tooltipValue;
    expect(tooltipSegemntOverride).toBe('Orange (3)', 'global Tooltip segment override');

    component.tooltipConfiguration = new TooltipConfiguration(null, (val, perc) => { return val.name + ' (' + val.value + ')' });
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

    expect(component.bars[0].sourceItem.value).toBe(null, 'null input value replaced with 0');
    expect(component.bars[1].sourceItem.value).toBe(undefined, 'undefined input value replaced with 0');
  });

});
