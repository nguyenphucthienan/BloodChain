import { Component, OnInit } from '@angular/core';

import { AuthService } from './core/services/auth.service';
import { LanguageService } from './core/services/language.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  sidebarOpened = false;

  constructor(
    private authService: AuthService,
    private languageService: LanguageService
    ) { }

  ngOnInit() {
    this.authService.readTokenFromStorage();
    this.languageService.readLanguageSettingFromStorage();
  }

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }

}
