import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path:'',
    component : LayoutComponent,
    children:[
      {
        path:'page',
        loadChildren: ()=>import('./pages/pages.module').then((pages)=> pages.PagesModule)
      },
      {
        path:'',
        redirectTo:'page',
        pathMatch: 'full'
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
export class LayoutsRoutingModule { }
