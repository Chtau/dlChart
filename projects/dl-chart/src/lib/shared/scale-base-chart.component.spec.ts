import { async, TestBed } from '@angular/core/testing';
import { ChartItemService } from '../services/chart-item.service';
import { ScaleBaseChartComponent } from './scale-base-chart.component';
import { IValue } from '../models/value.interface';

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
    baseChart = new ScaleBaseChartComponent(service);
  });

  it('should create', () => {
    expect(baseChart).toBeTruthy();
  });

});

