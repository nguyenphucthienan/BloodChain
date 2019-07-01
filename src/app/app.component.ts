import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { AuthService } from './core/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  sidebarOpened = false;

  constructor(
    private authService: AuthService,
    translate: TranslateService
  ) {
    const browserLang = translate.getBrowserLang();
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('en');
    translate.use(browserLang.match(/en|vi/) ? browserLang : 'en');
  }

  ngOnInit() {
    this.authService.readTokenFromStorage();
  }

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }

}
