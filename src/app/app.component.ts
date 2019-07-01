import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  sidebarOpened = false;

  constructor(translate: TranslateService) {
    const browserLang = translate.getBrowserLang();
    translate.addLangs(['en', 'vi']);
    translate.setDefaultLang('en');
    translate.use(browserLang.match(/en|vi/) ? browserLang : 'en');
  }

  toggleSidebar() {
    this.sidebarOpened = !this.sidebarOpened;
  }

}
