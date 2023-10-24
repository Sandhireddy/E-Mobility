import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path:'',
    component : PagesComponent,
    children:[
      {
        path:'chargeDataRecord',
        loadChildren: ()=>import('./charge-data-record/charge-data-record.module').then((CDR)=> CDR.ChargeDataRecordModule)
      },
      {
        path:'',
        redirectTo:'chargeDataRecord',
        pathMatch:'full'
      },
      {
        path:'**',
        redirectTo:'error/notFound'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
