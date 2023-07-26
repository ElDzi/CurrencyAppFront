// requests-list.component.ts

import { Component, OnInit, ViewChild } from '@angular/core';
import { Request, Pageable } from './request.interface';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { CurrencyInputService } from '../currency-input/currency-input.service';
import {CurrencyService} from "../currency-service/currency-service.service";

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css'],
})
export class RequestsListComponent implements OnInit {
  requests: Request[] = [];
  totalItems: number = 0;
  currentPage: number = 0;
  totalPages: number = 0;
  pageSize: number = 5;
  pageSizeOptions: number[] = [5, 10, 15, 20];
  displayedColumns: string[] = ['currencyCode', 'name', 'date', 'value', 'valid'];
  dataSource: MatTableDataSource<Request> = new MatTableDataSource<Request>(this.requests);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private currencyService: CurrencyService, private currencyInputService: CurrencyInputService) {}

  ngOnInit() {
    this.getRequests();
    this.currencyInputService.currencyInput.subscribe(() => {
      this.getRequests();
    });
  }

  getRequests(page: number = 0, size: number = this.pageSize) {
    const pageable: Pageable = { page: page, size: size };
    this.currencyService.getRequests(pageable).subscribe((response) => {
      this.requests = response.data;
      this.totalItems = response.totalItems;
      this.currentPage = response.currentPage;
      this.totalPages = response.totalPages;


      this.dataSource.data = this.requests;
    });
  }
  nextPage(event: PageEvent) {
    const page= event.pageIndex;
    const size = event.pageSize;
    this.getRequests(page,size);
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.paginator.page.subscribe(() => {
      console.log(this.paginator.pageIndex, this.paginator.pageSize);
      this.getRequests(this.paginator.pageIndex, this.paginator.pageSize);
    });
    this.paginator.length = this.totalItems;
    this.paginator.pageIndex = this.currentPage;
  }
}
