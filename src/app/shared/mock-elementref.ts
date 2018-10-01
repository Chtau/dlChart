import { ElementRef } from "@angular/core";

export class MockElementRef extends ElementRef {
  constructor() { super(null); }

  nativeElement = {
    parentElement: {
      clientHeight: 400,
      clientWidth: 400,
      parentElement: {
        clientHeight: 400,
        clientWidth: 400 
      }  
    }
  };
}