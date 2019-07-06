import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.interface';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidebarToggled = new EventEmitter();

  user: User;

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.authService.decodedToken$
      .pipe(
        filter(token => token !== null),
        switchMap(() => this.authService.getMyUserInfo())
      )
      .subscribe((user: User) => this.user = user);
  }

  toggleSidebar() {
    this.sidebarToggled.emit();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.user = null;
    this.router.navigate(['/']);
    this.alertService.info('header.alert.logoutSuccess');
  }

}
