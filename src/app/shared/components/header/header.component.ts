import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AlertService } from 'src/app/core/services/alert.service';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidebarToggled = new EventEmitter();

  constructor(
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService,
    private translate: TranslateService) { }

  ngOnInit() {
  }

  toggleSidebar() {
    this.sidebarToggled.emit();
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
    this.translate.get('header.alert.logoutSuccess')
      .subscribe(logoutSuccess => this.alertService.info(logoutSuccess));
  }

}
