import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DlLegendModule } from "./legend.module";
import { LegendComponent } from "./legend.component";
import { Value } from '../models/value.model';

describe('LegendComponent', () => {
  let component: LegendComponent;
  let fixture: ComponentFixture<LegendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        DlLegendModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LegendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});
