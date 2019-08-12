import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Output() sidebarToggled = new EventEmitter();

  user: User;

  constructor(private authService: AuthService) { }

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

}
