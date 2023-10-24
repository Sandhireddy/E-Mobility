import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './not-found/not-found.component';
import { ErrorComponent } from './error.component';

const routes: Routes = [
  {
    path:'',
    component:ErrorComponent,
    children:[
      {
        path:'notFound',
        component : NotFoundComponent,
      },
      {
        path:'',
        redirectTo: 'notFound',
        pathMatch:"full"
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ErrorRoutingModule { }
