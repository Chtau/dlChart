import { NgModule } from '@angular/core';
import { YAxisComponent } from '../shared/yaxis.component';
import { CommonModule } from '@angular/common';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    YAxisComponent,
  ],
  providers: [
  ],
  entryComponents: [
  ],
  exports: [
    YAxisComponent
  ]
})
export class ComponentsModule { }