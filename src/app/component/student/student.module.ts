import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StudentRoutingModule } from './student-routing.module';
import { ListComponent } from './list/list.component';
import { StudentdetailComponent } from './studentdetail/studentdetail.component';


@NgModule({
  declarations: [
    ListComponent,
    StudentdetailComponent
  ],
  imports: [
    CommonModule,
    StudentRoutingModule
  ]
})
export class StudentModule { }
