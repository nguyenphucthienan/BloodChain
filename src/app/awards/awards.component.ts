import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { MDBModalRef } from 'angular-bootstrap-md';
import { environment } from 'src/environments/environment';

import { User } from '../core/models/user.interface';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-awards',
  templateUrl: './awards.component.html',
  styleUrls: ['./awards.component.scss']
})
export class AwardsComponent implements OnInit, OnDestroy {

  readonly defaultPhotoUrl = environment.photoUrl.defaultUser;

  user: User;
  userOnBlockchain: any;

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
      this.userOnBlockchain = user;
    });
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'grey-background');
  }

}
