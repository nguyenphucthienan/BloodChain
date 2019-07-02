import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SharedModule } from '../shared/shared.module';
import { ActionsTableCellComponent } from './cells/actions-table-cell/actions-table-cell.component';
import { ArrayListTableCellComponent } from './cells/array-list-table-cell/array-list-table-cell.component';
import { BooleanTableCellComponent } from './cells/boolean-table-cell/boolean-table-cell.component';
import { DateTableCellComponent } from './cells/date-table-cell/date-table-cell.component';
import { DateTimeTableCellComponent } from './cells/date-time-table-cell/date-time-table-cell.component';
import { IdTableCellComponent } from './cells/id-table-cell/id-table-cell.component';
import { ImageTableCellComponent } from './cells/image-table-cell/image-table-cell.component';
import { ObjectTextTableCellComponent } from './cells/object-text-table-cell/object-text-table-cell.component';
import { PipedTextTableCellComponent } from './cells/piped-text-table-cell/piped-text-table-cell.component';
import { TableCellComponent } from './cells/table-cell/table-cell.component';
import { TextTableCellComponent } from './cells/text-table-cell/text-table-cell.component';
import { DatatableComponent } from './datatable.component';
import { TableRowSelectTrackingService } from './services/table-row-select-tracking.service';

@NgModule({
  declarations: [
    DatatableComponent,
    TableCellComponent,
    IdTableCellComponent,
    TextTableCellComponent,
    ObjectTextTableCellComponent,
    PipedTextTableCellComponent,
    BooleanTableCellComponent,
    ActionsTableCellComponent,
    ImageTableCellComponent,
    DateTableCellComponent,
    DateTimeTableCellComponent,
    ArrayListTableCellComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([])
  ],
  exports: [
    DatatableComponent
  ],
  providers: [
    TableRowSelectTrackingService
  ]
})
export class DatatableModule { }
