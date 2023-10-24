import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path:'',
    component: AppComponent,
    children:[
      {
        path:'layout',
        loadChildren: ()=> import('./layouts/layouts.module').then((layout)=> layout.LayoutsModule)
      },
      {
        path:'error',
        loadChildren: ()=> import('./error/error.module').then((error)=> error.ErrorModule)
      },
      {
        path:'',
        redirectTo:'layout',
        pathMatch: 'full'
      },
      {
        path:'**',
        redirectTo: "error/notFound"
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
