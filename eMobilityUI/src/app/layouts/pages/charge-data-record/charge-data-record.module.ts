import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ChargeDataRecordRoutingModule } from './charge-data-record-routing.module';
import { ChargeDataRecordListComponent } from './charge-data-record-list/charge-data-record-list.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CdrService } from 'src/app/service/apis/cdr.service';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ChargeDataRecordListComponent,
    
  ],
  imports: [
    CommonModule,
    ChargeDataRecordRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers:[CdrService]
})
export class ChargeDataRecordModule { }
