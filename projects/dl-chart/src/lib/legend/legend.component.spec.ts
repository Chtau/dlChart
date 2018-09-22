import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlLegendModule } from "./legend.module";
import { LegendComponent } from "./legend.component";
import { Value } from '../models/value.model';
import { ChartItemService } from '../services/chart-item.service';
import { ServiceItem } from '../models/serviceitem.model';
import { Slice } from '../models/slice.model';
import { LegendConfiguration } from '../models/legendconfiguration.model';

describe('LegendComponent', () => {
  let component: LegendComponent;
  let fixture: ComponentFixture<LegendComponent>;
  let service: ChartItemService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DlLegendModule
      ],
      providers: [
        ChartItemService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(ChartItemService);
    fixture = TestBed.createComponent(LegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('get ChartItems', () => {
    component.items = new ServiceItem<Slice[]>('test', [
      { id: '0', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null },
      { id: '1', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }
    ]);

    expect(component.chartItems.length).toBe(2, '2 slices');
  });

  it('set LegendConfiguration', () => {
    var element = { 
      id: '0', 
      allowActivate: true, 
      calculatedPercent: 5, 
      color: 'red', 
      draw: null, 
      sourceItem: {
        color: 'red',
        cssClass: null,
        data: null,
        name: 'Red',
        tooltipConfig: null,
        value: 20
      }
    };

    component.legendConfiguration = new LegendConfiguration(null, (n) => { return n.name.toUpperCase()})
    expect(component.currentLegendConfiguration).toBeDefined('Legend is defined');

    expect(component.legendTextValue(element)).toBe('RED', 'Legend text value');
    expect(component.tooltipTextValue(element)).toBe('Red (20)', 'Tooltip text value');
  });

  it('click Legend item', (done) => {
    var element = { 
      id: '0', 
      allowActivate: true, 
      calculatedPercent: 5, 
      color: 'red', 
      draw: null, 
      sourceItem: {
        color: 'red',
        cssClass: null,
        data: null,
        name: 'Red',
        tooltipConfig: null,
        value: 20
      }
    };

    component.legendClick.subscribe((val: Value) => {
      expect(val.value).toBe(20, 'Legend item clicked');
      done();
    });
    component.onItemClick(null, element)
  });

  it('Value changed from Service (wrong chartid)', (done) => {
    component.chartItemService.chartValueChange.subscribe(val => {
      expect(val).toBeDefined('component chart item service');
      done();
    });
    service.setChartValues(new ServiceItem<Slice[]>('test', [
      { id: '0', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null },
      { id: '1', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }
    ]));
  });

  it('Value changed from Service', (done) => {
    component.chartid = 'test'
    component.chartItemService.chartValueChange.subscribe(val => {
      expect(val).toBeDefined('component chart item service');
      done();
    });
    service.setChartValues(new ServiceItem<Slice[]>('test', [
      { id: '0', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null },
      { id: '1', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }
    ]));
  });

  it('Legend class', () => {
    let element: Slice = { id: '0', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null };
    var class1 = component.legendClass(element)
    expect(class1).toBe(' ', 'class without selection or hover');

    component.selectedItem = element;
    var class2 = component.legendClass(element)
    expect(class2).toBe(' legend-selected ', 'class selected');

    component.hoverItem = element;
    var class3 = component.legendClass(element)
    expect(class3).toBe(' legend-selected legend-hover ', 'class selected');

    component.selectedItem = null;
    var class4 = component.legendClass(element)
    expect(class4).toBe(' legend-hover ', 'class selected');
  });

  it('selection changed from Service', (done) => {
    component.chartid = 'test'
    component.chartItemService.chartValueSelect.subscribe(val => {
      expect(val).toBeDefined('selected');
      done();
    });
    service.selectChartValue(new ServiceItem<Slice>('test', { id: '0', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }));
  });

  it('selection from Service (wrong chartId)', (done) => {
    component.chartid = 'test'
    component.chartItemService.chartValueSelect.subscribe(val => {
      expect(val).toBeDefined('selected');
      done();
    });
    service.selectChartValue(new ServiceItem<Slice>('test-1', { id: '0', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }));
  });

  it('deselect changed from Service', (done) => {
    component.chartid = 'test'
    component.chartItemService.chartValueDeselect.subscribe(val => {
      expect(val).toBeDefined('deselect');
      done();
    });
    service.deselectChartValue(new ServiceItem<Slice>('test', { id: '0', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }));
  });

  it('deselect changed from Service (wrong chartId)', (done) => {
    component.chartid = 'test'
    component.chartItemService.chartValueDeselect.subscribe(val => {
      expect(val).toBeDefined('deselect');
      done();
    });
    service.deselectChartValue(new ServiceItem<Slice>('test-1', { id: '0', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }));
  });

  it('hover changed from Service', (done) => {
    component.chartid = 'test'
    component.chartItemService.chartValueHover.subscribe(val => {
      expect(val).toBeDefined('hover');
      done();
    });
    service.hoverChartValue(new ServiceItem<Slice>('test', { id: '0', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }));
  });

  it('hover from Service (wrong chartId)', (done) => {
    component.chartid = 'test'
    component.chartItemService.chartValueHover.subscribe(val => {
      expect(val).toBeDefined('hover');
      done();
    });
    service.hoverChartValue(new ServiceItem<Slice>('test-1', { id: '0', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }));
  });

  it('leave changed from Service', (done) => {
    component.chartid = 'test'
    component.chartItemService.chartValueLeave.subscribe(val => {
      expect(val).toBeDefined('leave');
      done();
    });
    service.leaveChartValue(new ServiceItem<Slice>('test', { id: '0', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }));
  });

  it('leave changed from Service (wrong chartId)', (done) => {
    component.chartid = 'test'
    component.chartItemService.chartValueLeave.subscribe(val => {
      expect(val).toBeDefined('leave');
      done();
    });
    service.leaveChartValue(new ServiceItem<Slice>('test-1', { id: '0', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }));
  });

  it('hide chart hover/select effect', () => {
    let element: Slice = { id: '0', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null };
    component.hideChartHoverEffect = true;
    var class1 = component.legendClass(element)
    expect(class1).toBe(' ', 'class without selection or hover');

    component.hideChartHoverEffect = false;
    var class1 = component.legendClass(element)
    expect(class1).toBe(' ', 'class without selection or hover');

    component.hideChartSelectEffect = true;
    var class1 = component.legendClass(element)
    expect(class1).toBe(' ', 'class without selection or hover');

    component.hideChartSelectEffect = false;
    var class1 = component.legendClass(element)
    expect(class1).toBe(' ', 'class without selection or hover');
  });

});
