import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  GroupingState,
  PaginatorState,
  SortState,
  ISortView,
  IGroupingView,
  ISearchView,
} from 'src/app/shared/table-actions/index';
import { TableExtendedActionsService } from 'src/app/shared/table-actions/index';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';


import { FormGroup, FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { chargeDataRecordsModel } from 'src/app/shared/data.shared';
import { CdrService } from 'src/app/service/apis/cdr.service';

@Component({
  selector: 'app-charge-data-record-list',
  templateUrl: './charge-data-record-list.component.html',
  styleUrls: ['./charge-data-record-list.component.scss']
})
export class ChargeDataRecordListComponent implements OnInit, OnDestroy, ISortView, IGroupingView, ISearchView {

  paginator: PaginatorState;
  sorting: SortState;
  grouping: GroupingState;
  isLoading: boolean = false;
  filterGroup: FormGroup;
  searchGroup: FormGroup;


  private subscriptions: Subscription[] = [];



  constructor(public tableExtendedActionsShareService: TableExtendedActionsService,
    private fb: FormBuilder,
    private cdrService: CdrService
  ) { }

  ngOnInit(): void {
    this.searchForm();
    this.setTableValues([]);
    this.loadData();
  }

  loadData() {
    const getCDR = this.cdrService.getFullRecords().subscribe((response: any) => {
      console.log(response);
      const result = response.items;
      let index = 1
      result.forEach((item:any)=>{
        item['id'] = index;
        index += 1;
      })
      this.setTableValues(result)

    }, (error: Error) => {
      console.log(error);
    });
    this.subscriptions.push(getCDR);
  }


  setTableValues(value: chargeDataRecordsModel[] | []) {
    this.tableExtendedActionsShareService.tableChangeMessage(value);
    this.tableExtendedActionsShareService.fetch();
    this.grouping = this.tableExtendedActionsShareService.grouping;
    this.paginator = this.tableExtendedActionsShareService.paginator;
    this.sorting = this.tableExtendedActionsShareService.sorting;
  }

  // search
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [''],
    });
    const searchEvent = this.searchGroup.controls['searchTerm'].valueChanges
      .pipe(
        /*
        The user can type quite quickly in the input box, and that could trigger a lot of server requests. With this operator,
        we are limiting the amount of server requests emitted to a maximum of one every 150ms
        */
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe((val) => this.search(val));
    this.subscriptions.push(searchEvent);
  }

  search(searchTerm: string) {
    this.tableExtendedActionsShareService.patchState({ searchTerm });
  }

  // sorting
  sort(column: string) {
    const sorting = this.sorting;
    const isActiveColumn = sorting.column === column;
    if (!isActiveColumn) {
      sorting.column = column;
      sorting.direction = 'asc';
    } else {
      sorting.direction = sorting.direction === 'asc' ? 'desc' : 'asc';
    }
    this.tableExtendedActionsShareService.patchState({ sorting });
  }

  // pagination
  paginate(paginator: PaginatorState) {
    this.tableExtendedActionsShareService.patchState({ paginator });
  }

  ngOnDestroy() {
    this.subscriptions.forEach((sb) => sb.unsubscribe());
  }


  /**
   * 
   * Generating Sample Data Set
   * ----------------------------------------------------------------------------------------------------------------
   */

  // getRandomString(length: number): string {
  //   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  //   let result = '';
  //   for (let i = 0; i < length; i++) {
  //     result += characters.charAt(Math.floor(Math.random() * characters.length));
  //   }
  //   return result;
  // }

  // getRandomDate(): Date {
  //   const startDate = new Date(2023, 0, 1); // January 1, 2023
  //   const endDate = new Date(2023, 9, 31, 23, 59, 59); // December 31, 2023, 23:59:59
  //   const randomTime = startDate.getTime() + Math.random() * (endDate.getTime() - startDate.getTime());
  //   return new Date(randomTime);
  // }

  // formatISODate(date: Date): string {
  //   const year = date.getFullYear();
  //   const month = String(date.getMonth() + 1).padStart(2, '0');
  //   const day = String(date.getDate()).padStart(2, '0');
  //   const hours = String(date.getHours()).padStart(2, '0');
  //   const minutes = String(date.getMinutes()).padStart(2, '0');
  //   const seconds = String(date.getSeconds()).padStart(2, '0');
  //   return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
  // }

  // generateRandomData(numRecords: number): chargeDataRecordsModel[] {
  //   const data: chargeDataRecordsModel[] = [];

  //   for (let i = 0; i < numRecords; i++) {
  //     const id = i + 1;
  //     const sessionIdentification = ""+Math.floor(Math.random() * 1000000000)+this.getRandomString(3);
  //     const vehicleIdentification = `${this.getRandomString(3)}-${Math.floor(
  //       Math.random() * (9999 - 1000 + 1) + 1000
  //     )}`;

  //     const startDate = this.getRandomDate();
  //     const endDate = new Date(startDate.getTime() + Math.random() * 14400000); // Adding random seconds (up to 4 hours)

  //     const startTime = this.formatISODate(startDate);
  //     const endTime = this.formatISODate(endDate);

  //     const totalCost = parseFloat((Math.random() * (100 - 10) + 10).toFixed(2));

  //     const record: chargeDataRecordsModel = {
  //       id,
  //       sessionIdentification,
  //       vehicleIdentification,
  //       startTime,
  //       endTime,
  //       totalCost,
  //     };

  //     data.push(record);
  //   }

  //   return data;
  // }

  /**
 * 
 * End of Generating Sample Data Set
 * ----------------------------------------------------------------------------------------------------------------
 */



}
