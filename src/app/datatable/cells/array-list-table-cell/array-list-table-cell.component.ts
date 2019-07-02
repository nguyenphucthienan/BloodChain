import { Component } from '@angular/core';
import { AbstractTableCellComponent } from '../abstract-table-cell/abstract-table-cell.component';

@Component({
  selector: 'app-array-list-table-cell',
  templateUrl: './array-list-table-cell.component.html',
  styleUrls: ['./array-list-table-cell.component.scss']
})
export class ArrayListTableCellComponent extends AbstractTableCellComponent {

  elements: any[] = [];
  textProperty = 'name';

  collapsible = false;
  isCollapsed = true;
  maxItems = 2;

  constructor() {
    super();
  }

  updateValue() {
    if (this.cell && this.cell.textProperty) {
      this.textProperty = this.cell.textProperty;
    }

    this.elements = this.cell && this.cell.value.map(el => el[this.textProperty]);
    this.collapsible = this.cell && this.cell.collapsible;
  }

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

}
