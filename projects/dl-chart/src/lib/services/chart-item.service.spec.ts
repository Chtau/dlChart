import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Value } from '../models/value.model';
import { TooltipConfiguration } from '../models/tooltipconfiguration.model';
import { Utils } from '../shared/utils';
import { SimpleChange } from '@angular/core';
import { ChartItemService } from './chart-item.service';
import { ServiceItem } from '../models/serviceitem.model';
import { Slice } from '../models/slice.model';
import { Bar } from '../models/bar.model';

describe('ChartItemService', () => {
  //let component: ChartItemService;
  //let fixture: ComponentFixture<ChartItemService>;
  let service: ChartItemService;

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
    service = TestBed.get(ChartItemService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('set get Slice values', () => {
    service.setChartValues(new ServiceItem<Slice[]>('test', []))

    var values = service.getChartValues('test');
    expect(values.value.length).toBe(0, 'set and get Slice values')
  });

  it('set get Slice values (2)', () => {
    service.setChartValues(new ServiceItem<Slice[]>('test', [
      { id: '0', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null },
      { id: '1', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }
    ]))

    var values = service.getChartValues('test');
    expect(values.value.length).toBe(2, 'set and get Slice values (2)')
  });

  it('subscribe to values from Slice', () => {
    service.chartValueChange.subscribe((vals: ServiceItem<Slice[]>) => {
      expect(vals.chartId).toBe('test', 'chart values has changed');
      expect(vals.value.length).toBe(0, 'chart values has changed')  
    });
    service.setChartValues(new ServiceItem<Slice[]>('test', []))
  });

  it('subscribe to values from Slice (2)', () => {
    service.chartValueChange.subscribe((vals: ServiceItem<Slice[]>) => {
      expect(vals.chartId).toBe('test', 'chart values has changed (2)');
      expect(vals.value.length).toBe(2, 'chart values has changed (2)')  
    });
    service.setChartValues(new ServiceItem<Slice[]>('test', [
      { id: '0', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null },
      { id: '1', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }
    ]))
  });

  it('set value get wrong chartId', () => {
    service.setChartValues(new ServiceItem<Slice[]>('test', [
      { id: '0', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null },
      { id: '1', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }
    ]))

    var values = service.getChartValues('test-1');
    expect(values).toBeUndefined('set Slice values and get wrong chartId')
  });

  it('set/get multiple values', () => {
    service.setChartValues(new ServiceItem<Slice[]>('test', [
      { id: '12', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null },
      { id: '13', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }
    ]))
    service.setChartValues(new ServiceItem<Bar[]>('test-1', [
      { id: '123', allowActivate: true, calculatedPercent: 0, color: 'red', sourceItem: null, height: 0, position: 0, width: 0 },
      { id: '124', allowActivate: true, calculatedPercent: 0, color: 'red', sourceItem: null, height: 0, position: 0, width: 0 }
    ]))

    var values = service.getChartValues('test-1');
    expect(values.value[0].id).toBe('123', 'get Bar chart id value 0 index')

    var values1 = service.getChartValues('test');
    expect(values1.value[1].id).toBe('13', 'get Slice chart id value 1 index')
  });

  it('has values', () => {
    service.setChartValues(new ServiceItem<Slice[]>('test', [
      { id: '12', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null },
      { id: '13', allowActivate: true, calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }
    ]))
    service.setChartValues(new ServiceItem<Bar[]>('test-1', [
      { id: '123', allowActivate: true, calculatedPercent: 0, color: 'red', sourceItem: null, height: 0, position: 0, width: 0 },
      { id: '124', allowActivate: true, calculatedPercent: 0, color: 'red', sourceItem: null, height: 0, position: 0, width: 0 }
    ]))

    var values = service.values;
    expect(values.length).toBe(2, '2 charts')
  });

});
