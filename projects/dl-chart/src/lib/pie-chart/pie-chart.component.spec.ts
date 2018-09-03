import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartComponent } from './pie-chart.component';
import { PieChartModule } from "./pie-chart.module";
import { Value } from '../models/value.model';
import { TooltipConfiguration } from '../models/tooltipconfiguration.model';

describe('PieChartComponent', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PieChartModule
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

    expect(component.pie.length).toBe(2, 'pie slices loaded');
  });

  it('create Element Id', () => {
    component.values = [
      new Value('Blue', 3, 'Blue'),
      new Value('Orange', 3, 'Orange'),
    ];

    expect(component.createElementId(component.pie[0], 0)).toBe('chart-slice-0', 'Slice Element Id created');
  });

  it('create Segment css class', () => {
    component.values = [
      new Value('Blue', 3, 'Blue'),
      new Value('Orange', 3, 'Orange'),
      new Value('Orange', 3, 'Orange', 'test'),
    ];

    let cssEven = component.cssClassSegment(component.pie[0], 0);
    expect(cssEven).toBe('slice slice-anim-even', 'Segement css class even created');

    let cssOdd = component.cssClassSegment(component.pie[1], 1);
    expect(cssOdd).toBe('slice slice-anim', 'Segement css class odd created');

    let cssCustom = component.cssClassSegment(component.pie[2], 2);
    expect(cssCustom).toBe('slice test slice-anim-even', 'Segement custom css class created');
  });

  it('Segment Tooltips', () => {
    component.values = [
      new Value('Blue', 3, 'Blue'),
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(false)),
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' (' + val.value + ')' })),
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' ( ' + perc + '% )' })),
    ];

    component.tooltipContentSlice = component.pie[0];
    component.tooltipContentItem = component.pie[0].sourceItem;

    let tooltipDefault = component.tooltipValue;
    expect(tooltipDefault).toBe('Blue', 'default Segement Tooltip');

    component.tooltipContentSlice = component.pie[1];
    component.tooltipContentItem = component.pie[1].sourceItem;

    let tooltipWithValue = component.tooltipValue;
    expect(tooltipWithValue).toBe('Orange 3', 'Segement Tooltip (Name + Value)');

    component.tooltipContentSlice = component.pie[2];
    component.tooltipContentItem = component.pie[2].sourceItem;

    let tooltipFunc1 = component.tooltipValue;
    expect(tooltipFunc1).toBe('Orange (3)', 'Segement Tooltip function 1');

    component.tooltipContentSlice = component.pie[3];
    component.tooltipContentItem = component.pie[3].sourceItem;

    let tooltipFunc2 = component.tooltipValue;
    expect(tooltipFunc2).toBe('Orange ( 25% )', 'Segement Tooltip function 2');
  });

  it('global Tooltips configuration', () => {
    component.values = [
      new Value('Blue', 3, 'Blue'),
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' (' + val.value + ')' })),
      new Value('Orange', 3, 'Orange', null, new TooltipConfiguration(null, (val, perc) => { return val.name + ' ( ' + perc + '% )' })),
    ];

    component.tooltipConfiguration = new TooltipConfiguration(false);
    component.tooltipContentSlice = component.pie[0];
    component.tooltipContentItem = component.pie[0].sourceItem;

    let tooltipGlobal = component.tooltipValue;
    expect(tooltipGlobal).toBe('Blue 3', 'global Tooltip (Name + Value)');

    component.tooltipContentSlice = component.pie[1];
    component.tooltipContentItem = component.pie[1].sourceItem;

    let tooltipSegemntOverride = component.tooltipValue;
    expect(tooltipSegemntOverride).toBe('Orange (3)', 'global Tooltip segment override');

    component.tooltipConfiguration = new TooltipConfiguration(null, (val, perc) => { return val.name + ' (' + val.value + ')' });
    component.tooltipContentSlice = component.pie[0];
    component.tooltipContentItem = component.pie[0].sourceItem;

    let tooltipGlobalFunc = component.tooltipValue;
    expect(tooltipGlobalFunc).toBe('Blue (3)', 'global Tooltip function');

    component.tooltipContentSlice = component.pie[2];
    component.tooltipContentItem = component.pie[2].sourceItem;

    let tooltipFuncSegemntOverride = component.tooltipValue;
    expect(tooltipFuncSegemntOverride).toBe('Orange ( 33.333333333333336% )', 'global Tooltip segment override');

  });

});
