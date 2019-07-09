import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { BloodPackService } from 'src/app/core/services/blood-pack.service';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';

import { BloodCampBloodPackTransferTableService } from '../../services/blood-camp-blood-pack-transfer-table.service';

@Component({
  selector: 'app-blood-camp-blood-pack-manager-transfer-blood-pack',
  templateUrl: './blood-camp-blood-pack-manager-transfer-blood-pack.component.html',
  styleUrls: ['./blood-camp-blood-pack-manager-transfer-blood-pack.component.scss'],
  providers: [BloodCampBloodPackTransferTableService]
})
export class BloodCampBloodPackManagerTransferBloodPackComponent implements OnInit, OnDestroy {

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private bloodPackService: BloodPackService,
    public bloodCampBloodPackTransferTableService: BloodCampBloodPackTransferTableService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation.extras.state) {
      const { bloodPacks } = navigation.extras.state;
      if (bloodPacks) {
        this.bloodCampBloodPackTransferTableService.setDataRows(bloodPacks);
      }
    }
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        this.navigateToBloodPackDetail(tableCellChange.row.cells._id.value);
        break;
    }
  }

  navigateToBloodPackDetail(id: string) {
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}
