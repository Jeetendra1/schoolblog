import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { StudentdetailComponent } from './studentdetail/studentdetail.component';

const routes: Routes = [
  {path: '', children: [
    {path: '', component: ListComponent},
    {path: 'details', component: StudentdetailComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
