import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChargeDataRecordListComponent } from './charge-data-record-list/charge-data-record-list.component';

const routes: Routes = [
  {
    path:'list',
    component: ChargeDataRecordListComponent
  },
  {
    path:'',
    redirectTo:'list',
    pathMatch:'full'
  },
  {
    path:'**',
    redirectTo:'error/notFound'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChargeDataRecordRoutingModule { }
