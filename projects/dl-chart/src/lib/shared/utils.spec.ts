import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Utils } from './utils';
import { Value } from '../models/value.model';
import { Point } from '../models/point.model';

describe('Utils', () => {

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        
      ]
    })
    .compileComponents();
  }));


  it('Math round with scale 2 decimal', () => {
    expect(Utils.roundScale(0.109)).toBe(0.11, 'decimal round');
  });

  it('create Element Id', () => {
    expect(Utils.createElementId('test-', 1)).toBe('test-1', 'element id created');
  });

  it('generate text Value no config', () => {
    expect(Utils.textValue(
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
    expect(Utils.textValue(
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
    expect(Utils.textValue(
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
    expect(Utils.textValue(
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
    expect(Utils.textValue(
      null,
      {
        xValue: 1,
        yValue: 2,
        color: '',
        cssClass: null,
        data: null,
        name: 'Test',
        tooltipConfig: null,

      } as Point, 1)).toBe('Test (2)', 'test value 1 created');
  });

  it('generate text', () => {
    expect(Utils.textValue(
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
