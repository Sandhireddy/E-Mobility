import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subscription } from 'rxjs';
import { PaginatorState } from '../models/paginator.model';
import { SortState } from '../models/sort.model';
import { GroupingState } from '../models/grouping.model';
import { ITableState, TableResponseModel } from '../models/table.model';
import { HttpClient } from '@angular/common/http';
import { baseFilter } from '../preDefineFunctions/pre-define-functions';
import { BaseModel } from '../models/base.model';



const DEFAULT_STATE: ITableState = {
  filter: {},
  paginator: new PaginatorState(),
  sorting: new SortState(),
  searchTerm: '',
  grouping: new GroupingState(),
  entityId: undefined
};

@Injectable({
  providedIn: 'root'
})
export abstract class TableActionsService<T> {

  // Private fields
  private _items$ = new BehaviorSubject<T[]>([]);
  private _isLoading$ = new BehaviorSubject<boolean>(false);
  private _isFirstLoading$ = new BehaviorSubject<boolean>(true);
  private _tableState$ = new BehaviorSubject<ITableState>(DEFAULT_STATE);
  private _errorMessage = new BehaviorSubject<string>('');
  private _subscriptions: Subscription[] = [];

  private tableMessageSource = new BehaviorSubject([]);
  tableCurrentMessage = this.tableMessageSource.asObservable();

  tableMessage = [];

  protected http: HttpClient;

  constructor(http: HttpClient) {
    this.http = http;
  }

  // Getters
  get items$() {
    return this._items$.asObservable();
  }
  get isLoading$() {
    return this._isLoading$.asObservable();
  }
  get isFirstLoading$() {
    return this._isFirstLoading$.asObservable();
  }
  get errorMessage$() {
    return this._errorMessage.asObservable();
  }
  get subscriptions() {
    return this._subscriptions;
  }


  // State getters
  get paginator() {
    return this._tableState$.value.paginator;
  }
  get filter() {
    return this._tableState$.value.filter;
  }
  get sorting() {
    return this._tableState$.value.sorting;
  }
  get searchTerm() {
    return this._tableState$.value.searchTerm;
  }
  get grouping() {
    return this._tableState$.value.grouping;
  }

  setisLoadable$(param: any) {
    this._isLoading$.next(param);
  }



  tableChangeMessage(message: any) {
    this.tableMessageSource.next(message)
  }

  find(tableState: ITableState): Observable<TableResponseModel<T>> {
    this.getTableCurrentMessage();
    const filteredResult = baseFilter(this.tableMessage, tableState);
    const result: any = {
      items: filteredResult.items,
      total: filteredResult.total
    };
    return result;
  }

  getTableCurrentMessage() {
    const sbget = this.tableCurrentMessage.subscribe((data: any) => {
      this.tableMessage = data;
    });
    this.subscriptions.push(sbget);
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  public fetch() {
    this._isLoading$.next(true);
    this._errorMessage.next('');
    const request: any = this.find(this._tableState$.value);
    this._items$.next(request.items);
    this.patchStateWithoutFetch({
      paginator: this._tableState$.value.paginator.recalculatePaginator(
        request.total
      )
    });

    this._isLoading$.next(false);
    const itemIds = this._items$.value.map((el: T) => {
      const item = (el as unknown) as BaseModel;
      return item.id;
    });
    // ---------------------- cleaning group after new filter ------ 

    this.patchStateWithoutFetch({
      grouping: this._tableState$.value.grouping.clearRows(itemIds),
    });
    // ---------------------- cleaning group after end new filter ------
  }

  public setDefaults() {
    this.patchStateWithoutFetch({ filter: {} });
    this.patchStateWithoutFetch({ sorting: new SortState() });
    this.patchStateWithoutFetch({ grouping: new GroupingState() });
    this.patchStateWithoutFetch({ searchTerm: '' });
    this.patchStateWithoutFetch({
      paginator: new PaginatorState()
    });
    this._isFirstLoading$.next(true);
    this._isLoading$.next(true);
    this._tableState$.next(DEFAULT_STATE);
    this._errorMessage.next('');
  }

  // Base Methods
  public patchState(patch: Partial<ITableState>) {
    this.patchStateWithoutFetch(patch);
    this.fetch();
  }

  public patchStateWithoutFetch(patch: Partial<ITableState>) {
    const newState = Object.assign(this._tableState$.value, patch);
    this._tableState$.next(newState);
  }

}
