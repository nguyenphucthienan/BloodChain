import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() totalItems = 0;
  @Input() itemsPerPage = 1;
  @Input() pagesPerSide = 2;
  @Input() showDots = false;

  @Output() pageChanged = new EventEmitter();

  totalPages = 0;
  currentPage = 1;
  totalPagesArray: any[];

  constructor() { }

  ngOnInit() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.totalPagesArray = this.fakeArray(this.totalPages);
  }

  ngOnChanges() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.totalPagesArray = this.fakeArray(this.totalPages);
  }

  select(index: number) {
    this.currentPage = index;
    this.pageChanged.emit(this.currentPage);
  }

  previous() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.pageChanged.emit(this.currentPage);
    }
  }

  next() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.pageChanged.emit(this.currentPage);
    }
  }

  first() {
    this.currentPage = 1;
    this.pageChanged.emit(this.currentPage);
  }

  last() {
    this.currentPage = this.totalPages;
    this.pageChanged.emit(this.currentPage);
  }

  private fakeArray(numberOfItems: number) {
    return (numberOfItems > 0)
      ? new Array(numberOfItems)
      : [];
  }

}
