import { async, TestBed } from '@angular/core/testing';
import { CD } from './mock-change-detector';


describe('CD', () => {
  let cd: CD;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
      ],
      providers: [
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    cd = new CD();
  });

  it('should create', () => {
    cd.markForCheck();
    cd.detach();
    cd.detectChanges();
    cd.checkNoChanges();
    cd.reattach();
    expect(cd).toBeTruthy();
  });

});

