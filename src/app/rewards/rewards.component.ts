import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { environment } from 'src/environments/environment';

import { User } from '../core/models/user.interface';
import { AuthService } from '../core/services/auth.service';
import { TableActionType } from '../datatable/models/table-action.interface';
import { TableCellChange } from '../datatable/models/table-cell-change.interface';
import { PointHistoryTableService } from './services/point-history-table.service';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss'],
  providers: [PointHistoryTableService]
})
export class RewardsComponent implements OnInit, OnDestroy {

  readonly defaultPhotoUrl = environment.photoUrl.defaultUser;
  readonly rewardGiftPhotoUrl = environment.photoUrl.awardGift;
  readonly rewardEthereumPhotoUrl = environment.photoUrl.awardEthereum;

  user: User;
  userInfoOnBlockchain: any;
  pointHistoriesOnBlockchain: any[] = [];

  modalRef: MDBModalRef;

  constructor(
    public pointHistoryTableService: PointHistoryTableService,
    private renderer: Renderer2,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.authService.getMyUserInfo().subscribe((user: User) => {
      this.user = user;
    });

    this.authService.getMyUserInfoOnBlockchain().subscribe((user: any) => {
      this.userInfoOnBlockchain = user;
    });

    this.authService.getMyPointHistoriesOnBlockchain().subscribe((pointHistories: any[]) => {
      this.pointHistoriesOnBlockchain = pointHistories;
    });
  }

  onTableCellChanged(tableCellChange: TableCellChange) {
    const action = tableCellChange.newValue;
    switch (action.type) {
      case TableActionType.GetDetail:
        break;
    }
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}
