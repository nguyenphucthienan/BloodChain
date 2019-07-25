import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { TableActionType } from 'src/app/datatable/models/table-action.interface';
import { TableCellChange } from 'src/app/datatable/models/table-cell-change.interface';
import { environment } from 'src/environments/environment';

import { ProfileBloodDonationHistoryTableService } from '../../services/profile-blood-donation-history-table.service';

@Component({
  selector: 'app-profile-donation-history',
  templateUrl: './profile-donation-history.component.html',
  styleUrls: ['./profile-donation-history.component.scss'],
  providers: [ProfileBloodDonationHistoryTableService]
})
export class ProfileDonationHistoryComponent implements OnInit, OnDestroy {

  readonly defaultPhotoUrl = environment.photoUrl.defaultUser;

  user: User;
  userForm: FormGroup;

  constructor(
    private router: Router,
    private renderer: Renderer2,
    private authService: AuthService,
    public profileBloodDonationHistoryTableService: ProfileBloodDonationHistoryTableService
  ) { }

  ngOnInit() {
    this.renderer.addClass(document.body, 'grey-background');
    this.authService.getMyUserInfo().subscribe((user: User) => this.user = user);
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
    this.router.navigate(['/profile', 'blood-packs', id]);
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}
