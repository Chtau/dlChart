import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { AxisComponentsModule } from './axis-components.module';
import { YAxisComponent } from './yaxis.component';
import { ChartOrientation } from '../models/enums';

describe('YAxisComponent', () => {
  let component: YAxisComponent;
  let fixture: ComponentFixture<YAxisComponent>;

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
    fixture = TestBed.createComponent(YAxisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('change orientation', () => {
    component.orientation = ChartOrientation.Bottom;
    expect(component.normOrientation("1", "2", "3", "4", "5", "6", "7", "8")).toBe("1", "Orientation value for Bottom");
    component.orientation = ChartOrientation.Left;
    expect(component.normOrientation("1", "2", "3", "4", "5", "6", "7", "8")).toBe("3", "Orientation value for Left");
    component.orientation = ChartOrientation.Right;
    expect(component.normOrientation("1", "2", "3", "4", "5", "6", "7", "8")).toBe("2", "Orientation value for Right");
    component.orientation = ChartOrientation.Top;
    expect(component.normOrientation("1", "2", "3", "4", "5", "6", "7", "8")).toBe("4", "Orientation value for Top");

    component.isLeft = false;
    component.orientation = ChartOrientation.Bottom;
    expect(component.normOrientation("1", "2", "3", "4", "5", "6", "7", "8")).toBe("5", "Orientation value for Bottom (for right Y axis)");
    component.orientation = ChartOrientation.Left;
    expect(component.normOrientation("1", "2", "3", "4", "5", "6", "7", "8")).toBe("7", "Orientation value for Left (for right Y axis)");
    component.orientation = ChartOrientation.Right;
    expect(component.normOrientation("1", "2", "3", "4", "5", "6", "7", "8")).toBe("6", "Orientation value for Right (for right Y axis)");
    component.orientation = ChartOrientation.Top;
    expect(component.normOrientation("1", "2", "3", "4", "5", "6", "7", "8")).toBe("8", "Orientation value for Top (for right Y axis)");

  });

});

