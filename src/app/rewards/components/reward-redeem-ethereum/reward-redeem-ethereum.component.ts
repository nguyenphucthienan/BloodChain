import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-reward-redeem-ethereum',
  templateUrl: './reward-redeem-ethereum.component.html',
  styleUrls: ['./reward-redeem-ethereum.component.scss']
})
export class RewardRedeemEthereumComponent implements OnInit, OnDestroy {

  readonly defaultPhotoUrl = environment.photoUrl.defaultUser;

  user: User;
  userInfoOnBlockchain: any;

  modalRef: MDBModalRef;

  constructor(
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
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}
