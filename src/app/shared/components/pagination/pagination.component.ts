import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit, OnChanges {

  @Input() totalItems = 0;
  @Input() itemsPerPage = 1;

  @Output() pageChanged = new EventEmitter();

  totalPages = 0;
  currentPage = 1;

  constructor() { }

  ngOnInit() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
  }

  ngOnChanges() {
    this.totalPages = Math.ceil(this.totalItems / this.itemsPerPage);
    this.currentPage = 1;
  }

  change(event: any) {
    const page = event.target.value;
    if (page < 1 || page > this.totalPages) {
      return;
    }

    this.currentPage = event.target.value;
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

}
