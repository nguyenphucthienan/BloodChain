import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { concat, Observable, of, Subject } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, filter, map, switchMap, tap } from 'rxjs/operators';
import { BloodPack } from 'src/app/core/models/blood-pack.interface';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { BloodPackService } from 'src/app/core/services/blood-pack.service';
import { DatatableComponent } from 'src/app/datatable/datatable.component';
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

  @ViewChild(DatatableComponent) datatable: DatatableComponent;

  bloodPacks$: Observable<BloodPack[]>;
  bloodPacksInput$ = new Subject<string>();
  bloodPacksLoading = false;
  bloodPack: BloodPack;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private authService: AuthService,
    private bloodPackService: BloodPackService,
    private alertService: AlertService,
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
    this.bloodPacks$ = concat(
      of([]), // default items
      this.bloodPacksInput$.pipe(
        debounceTime(200),
        distinctUntilChanged(),
        filter(id => id && id.length === 24),
        tap(() => this.bloodPacksLoading = true),
        switchMap(id => this.bloodPackService.getBloodPack(id).pipe(
          map((bloodPack: BloodPack) => [bloodPack]),
          catchError(() => of([])), // empty list on error
          tap(() => this.bloodPacksLoading = false)
        ))
      )
    );
  }

  selectBloodPack(bloodPack: BloodPack) {
    if (!bloodPack) {
      return;
    }

    this.addBlookPack(bloodPack);
  }

  addBlookPack(bloodPack: BloodPack) {
    this.authService.getMyUserInfo()
      .subscribe((user: User) => {
        if (user.bloodCamp._id !== bloodPack.currentLocation) {
          this.alertService.error('bloodPackManager.alert.cannotSelect');
          return;
        }

        this.bloodCampBloodPackTransferTableService.addRawDataRow(bloodPack);
        this.datatable.refresh();
      });
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
