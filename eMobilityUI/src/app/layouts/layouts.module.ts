import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutsRoutingModule } from './layouts-routing.module';
import { LayoutComponent } from './layout/layout.component';
import { PagesModule } from './pages/pages.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    LayoutsRoutingModule,
    PagesModule,
    RouterModule
  ]
})
export class LayoutsModule { }
