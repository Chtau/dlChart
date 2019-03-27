import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { AxisComponentsModule } from './axis-components.module';
import { XAxisComponent } from './xaxis.component';
import { ChartOrientation } from '../models/enums';

describe('XAxisComponent', () => {
  let component: XAxisComponent;
  let fixture: ComponentFixture<XAxisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AxisComponentsModule
      ],
      providers: [
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(XAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('change orientation', () => {
    component.orientation = ChartOrientation.Bottom;
    expect(component.normOrientation("1", "2", "3", "4")).toBe("1", "Orientation value for Bottom");
    component.orientation = ChartOrientation.Left;
    expect(component.normOrientation("1", "2", "3", "4")).toBe("3", "Orientation value for Left");
    component.orientation = ChartOrientation.Right;
    expect(component.normOrientation("1", "2", "3", "4")).toBe("2", "Orientation value for Right");
    component.orientation = ChartOrientation.Top;
    expect(component.normOrientation("1", "2", "3", "4")).toBe("4", "Orientation value for Top");
  });

});

