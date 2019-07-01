import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
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
    private alertService: AlertService) { }

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
    this.alertService.info('Logout successfully');
    this.router.navigate(['/']);
  }

}
