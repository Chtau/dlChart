import { async, TestBed } from '@angular/core/testing';
import { ChartItemService } from '../services/chart-item.service';
import { BaseChartComponent } from './base-chart.component';
import { IChartItem } from '../models/chartitem.interface';

describe('BaseChartComponent', () => {
  let baseChart: BaseChartComponent;

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
    baseChart = new BaseChartComponent(service);
  });

  it('should create', () => {
    expect(baseChart).toBeTruthy();
  });

  it('chartId', () => {
    expect(baseChart.chartid).toBe('dl-chart-1', 'default ChartId value');
    baseChart.chartid = 'chart-1';
    expect(baseChart.chartid).toBe('chart-1', 'changed ChartId');
  });

  it('allow select', () => {
    expect(baseChart.currentAllowSelect).toBe(true, 'default allow select value');
    baseChart.allowSelect = false;
    expect(baseChart.currentAllowSelect).toBe(false, 'changed allow select');
  });

  it('get tooltipValue not item', () => {
    expect(baseChart.tooltipValue).toBeNull('no tooltipValue');
  });

  it('hover/leave Segement', () => {
    baseChart.onHoverSegment({ clientX: 100, clientY: 100 }, 
      { 
        id: '0', 
        color: 'red', 
        allowActivate: true, 
        calculatedPercent: 0, 
        sourceItem: {  
          color: 'red',
          cssClass: null,
          data: null,
          name: 'Red',
          tooltipConfig: null,
          value: 0
        } 
      }
    );
    
    expect(baseChart.tooltipContentChartItem.id).toBe('0', 'tooltip content chart item');
    expect(baseChart.tooltipContentItem.value).toBe(0, 'tooltip content item');
    expect(baseChart.tooltipLeft).toBe(110, 'tooltip left position');
    expect(baseChart.tooltipTop).toBe(110, 'tooltip top position');
    expect(baseChart.tooltipShow).toBe(true, 'show tooltip');

    baseChart.onLeaveSegment(null);
    expect(baseChart.tooltipContentChartItem).toBeNull('tooltip content chart item');
    expect(baseChart.tooltipContentItem).toBeNull('tooltip content item');
    expect(baseChart.tooltipShow).toBe(false, 'show tooltip');

    baseChart.onHoverSegment({ clientX: 100, clientY: 100 }, 
      { 
        id: '0', 
        color: 'red', 
        allowActivate: false, 
        calculatedPercent: 0, 
        sourceItem: {  
          color: 'red',
          cssClass: null,
          data: null,
          name: 'Red',
          tooltipConfig: null,
          value: 0
        } 
      }
    );
    expect(baseChart.tooltipContentChartItem).toBeNull('tooltip content chart item (not allowed to activeate)');
    expect(baseChart.tooltipContentItem).toBeNull('tooltip content item (not allowed to activeate)');
    expect(baseChart.tooltipShow).toBe(false, 'show tooltip (not allowed to activeate)');
  });

  it('click Segement', () => {
    var segement: IChartItem = { 
      id: '0', 
      color: 'red', 
      allowActivate: true, 
      calculatedPercent: 0, 
      sourceItem: {  
        color: 'red',
        cssClass: null,
        data: null,
        name: 'Red',
        tooltipConfig: null,
        value: 0
      } 
    };

    expect(baseChart.currentActiveChartItem).toBeUndefined('no segement selected');

    baseChart.onClickSegment(segement);
    expect(baseChart.currentActiveChartItem.id).toBe('0', 'segement selected');

    baseChart.onClickSegment(segement);
    expect(baseChart.currentActiveChartItem).toBeNull('segement deselected');

    baseChart.currentAllowSelect = false;
    baseChart.onClickSegment(segement);
    expect(baseChart.currentActiveChartItem).toBeNull('not allowed to select segement');

    var segement1: IChartItem = { 
      id: '0', 
      color: 'red', 
      allowActivate: false, 
      calculatedPercent: 0, 
      sourceItem: {  
        color: 'red',
        cssClass: null,
        data: null,
        name: 'Red',
        tooltipConfig: null,
        value: 0
      } 
    };

    baseChart.onClickSegment(segement1);
    expect(baseChart.currentActiveChartItem).toBeNull('segement not allowed to activate');
  });

});

