import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'fyle-integrations-ui-lib-app-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss']
})
export class PaginatorComponent implements OnInit {

  pageNumbers: number[] = [10, 50, 100, 200];

  page: number = 1;

  @Output() offsetChangeEvent = new EventEmitter<number>();

  @Output() pageChangeEvent = new EventEmitter<number>();

  @Input() totalCount: number;

  dropDownValue: number = 10;

  totalPages: number;

  constructor() { }

  offsetChanges(event:any) {
    this.totalPages = Math.ceil(this.totalCount/this.dropDownValue);
    this.offsetChangeEvent.emit(event.value);
  }

  previousPageChange(currentPage: number) {
    this.page = this.page - 1;
    const offsetValue = (currentPage - 2) * this.dropDownValue;
    this.pageChangeEvent.emit(offsetValue);
  }

  nextPageChange(currentPage: number) {
    this.page = this.page + 1;
    const offsetValue = currentPage * this.dropDownValue;
    this.pageChangeEvent.emit(offsetValue);
  }

  ngOnInit(): void {
    this.totalPages = Math.ceil(this.totalCount/this.dropDownValue);
  }

}
