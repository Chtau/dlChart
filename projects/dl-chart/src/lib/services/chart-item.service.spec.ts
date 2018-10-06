import { async, TestBed } from '@angular/core/testing';

import { ChartItemService } from './chart-item.service';
import { ServiceItem } from '../models/serviceitem.model';
import { Slice } from '../models/slice.model';
import { Bar } from '../models/bar.model';
import { IChartItem } from '../models/chartitem.interface';

describe('ChartItemService', () => {
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
      { id: '0', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null },
      { id: '1', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }
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
      { id: '0', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null },
      { id: '1', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }
    ]))
  });

  it('set value get wrong chartId', () => {
    service.setChartValues(new ServiceItem<Slice[]>('test', [
      { id: '0', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null },
      { id: '1', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }
    ]))

    var values = service.getChartValues('test-1');
    expect(values).toBeUndefined('set Slice values and get wrong chartId')
  });

  it('set/get multiple values', () => {
    service.setChartValues(new ServiceItem<Slice[]>('test', [
      { id: '12', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null },
      { id: '13', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }
    ]))
    service.setChartValues(new ServiceItem<Bar[]>('test-1', [
      { id: '123', calculatedPercent: 0, color: 'red', sourceItem: null, height: 0, width: 0, y: 0, x: 0, isMinusValue: false },
      { id: '124', calculatedPercent: 0, color: 'red', sourceItem: null, height: 0, width: 0, y: 0, x: 0, isMinusValue: false }
    ]))

    var values = service.getChartValues('test-1');
    expect(values.value[0].id).toBe('123', 'get Bar chart id value 0 index')

    var values1 = service.getChartValues('test');
    expect(values1.value[1].id).toBe('13', 'get Slice chart id value 1 index')
  });

  it('has values', () => {
    service.setChartValues(new ServiceItem<Slice[]>('test', [
      { id: '12', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null },
      { id: '13', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }
    ]))
    service.setChartValues(new ServiceItem<Bar[]>('test-1', [
      { id: '123', calculatedPercent: 0, color: 'red', sourceItem: null, height: 0, width: 0, y: 0, x: 0, isMinusValue: false },
      { id: '124', calculatedPercent: 0, color: 'red', sourceItem: null, height: 0, width: 0, y: 0, x: 0, isMinusValue: false }
    ]))

    var values = service.values;
    expect(values.length).toBe(2, '2 charts')
  });

  it('update existing Chart values', (done) => {
    var waitforUpdate: boolean = true;
    var waitforResult: boolean = false;
    service.chartValueChange.subscribe((vals: ServiceItem<Slice[]>) => {
      if (waitforUpdate === true) {
        waitforUpdate = false;
        waitforResult = true;
        service.setChartValues(new ServiceItem<Slice[]>('test', [
          { id: '123', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null },
          { id: '124', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }
        ]));
        
      }
      if (waitforResult === true) {
        waitforResult = false;
        expect(vals.value.length).toBe(2, 'chart values')
        expect(vals.value[0].id).toBe('123', 'chart value id')
        expect(vals.value[1].id).toBe('124', 'chart value id')
        done();
      }
    });

    service.setChartValues(new ServiceItem<Slice[]>('test', [
      { id: '12', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null },
      { id: '13', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }
    ]))
  });

  it('subscribe to hover ChartItem', () => {
    service.chartValueHover.subscribe((vals: ServiceItem<IChartItem>) => {
      expect(vals.chartId).toBe('test', 'chart values has changed');
      expect(vals.value.color).toBe('red', 'chart values has changed')  
    });
    service.hoverChartValue(new ServiceItem<Slice>('test', { id: '12', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }))
  });

  it('subscribe to leave ChartItem', () => {
    service.chartValueLeave.subscribe((vals: ServiceItem<any>) => {
      expect(vals.chartId).toBe('test', 'chart values has changed');
      expect(vals.value).toBe(null, 'chart values has changed')  
    });
    service.hoverChartValue(new ServiceItem<Slice>('test', { id: '12', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }))
    service.leaveChartValue(new ServiceItem<Slice>('test', null));
  });

  it('select ChartItem', () => {
    service.chartValueDeselect.subscribe((vals: ServiceItem<IChartItem>) => {
      expect(vals.chartId).toBe('test', 'chart values has changed');
      expect(vals.value.id).toBe('12', 'chart values has changed')  
    });
    service.selectChartValue(new ServiceItem<Slice>('test', { id: '12', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }))
  });

  it('deselect ChartItem', () => {
    service.chartValueDeselect.subscribe((vals: ServiceItem<IChartItem>) => {
      expect(vals.chartId).toBe('test', 'chart values has changed');
      expect(vals.value.id).toBe('12', 'chart values has changed')  
    });
    service.deselectChartValue(new ServiceItem<Slice>('test', { id: '12', calculatedPercent: 0, color: 'red', draw: null, sourceItem: null }))
  });

});
