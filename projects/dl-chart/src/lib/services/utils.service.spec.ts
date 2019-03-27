import { async, TestBed } from '@angular/core/testing';
import { Value } from '../models/value.model';
import { Point } from '../models/point.model';
import { UtilsService } from './utils.service';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        
      ], providers: [
        UtilsService
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    service = TestBed.get(UtilsService);
  });

  it('Math round with scale 2 decimal', () => {
    expect(service.roundScale(0.109)).toBe(0.11, 'decimal round');
  });

  it('create Element Id', () => {
    expect(service.createElementId('test-', 1)).toBe('test-1', 'element id created');
  });

  it('generate text Value no config', () => {
    expect(service.textValue(
      null,
      {
        value: 1,
        color: '',
        cssClass: null,
        data: null,
        name: 'Test',
        tooltipConfig: null,

      } as Value, 1)).toBe('Test (1)', 'test value 1 created');
  });

  it('generate text Value with config', () => {
    expect(service.textValue(
      { HideValue: false, ValueFunction: null },
      {
        value: 1,
        color: '',
        cssClass: null,
        data: null,
        name: 'Test',
        tooltipConfig: null,

      } as Value, 1)).toBe('Test (1)', 'test value 1 created');
  });

  it('generate text Value with config (hide value)', () => {
    expect(service.textValue(
      { HideValue: true, ValueFunction: null },
      {
        value: 1,
        color: '',
        cssClass: null,
        data: null,
        name: 'Test',
        tooltipConfig: null,

      } as Value, 1)).toBe('Test', 'test value 1 created');
  });

  it('generate text Value with config (function => to upper)', () => {
    expect(service.textValue(
      { HideValue: false, ValueFunction: (n) => { return n.name.toLocaleUpperCase() } },
      {
        value: 1,
        color: '',
        cssClass: null,
        data: null,
        name: 'Test',
        tooltipConfig: null,

      } as Value, 1)).toBe('TEST', 'test value 1 created');
  });

  it('generate text from Point', () => {
    expect(service.textValue(
      null,
      {
        xValue: 1,
        yValue: 2,
        color: '',
        cssClass: null,
        data: null,
        name: 'Test',
        tooltipConfig: null,

      } as Point, 1)).toBe('Test (2, 1)', 'test value 1 created');
  });

  it('generate text', () => {
    expect(service.textValue(
      null,
      {
        color: '',
        cssClass: null,
        data: null,
        name: 'Test',
        tooltipConfig: null,

      }, 1)).toBe('Test', 'test value 1 created');
  });

});
