import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InlineSVGModule } from 'ng-inline-svg-2';
import { FormsModule } from '@angular/forms';
import { SortIconComponent } from './table-actions/components/sort-icon/sort-icon.component';
import { PaginatorComponent } from './table-actions/components/paginator/paginator.component';
import { NgPagination } from './table-actions/components/paginator/ng-pagination/ng-pagination.component';
import { TableExtendedActionsService } from './table-actions';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SortIconComponent,
    PaginatorComponent,
    NgPagination
  ],
  imports: [
    CommonModule,
    InlineSVGModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  exports: [
    SortIconComponent,
    PaginatorComponent,
    NgPagination
  ],
  providers:[TableExtendedActionsService]
})
export class SharedModule { }
