import { ChangeDetectorRef } from "@angular/core";

export class CD implements ChangeDetectorRef {
  markForCheck(): void {
    return;
  }  
  detach(): void {
    return;
  }
  detectChanges(): void {
    return;
  }
  checkNoChanges(): void {
    return;
  }
  reattach(): void {
    return;
  }


}