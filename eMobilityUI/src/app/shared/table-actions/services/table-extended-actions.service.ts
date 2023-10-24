import { Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TableActionsService } from './table-actions.service';

@Injectable({
  providedIn: 'root'
})
export class TableExtendedActionsService extends TableActionsService<any> {
  constructor(@Inject(HttpClient) http:any) {
    super(http);
  }
}
