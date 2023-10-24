import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { ChargeDataRecordModule } from './charge-data-record/charge-data-record.module';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    ChargeDataRecordModule,
    RouterModule
  ]
})
export class PagesModule { }
