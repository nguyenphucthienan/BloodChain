import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { filter, switchMap } from 'rxjs/operators';
import { User } from 'src/app/core/models/user.interface';
import { AuthService } from 'src/app/core/services/auth.service';
import { Language, LanguageService } from 'src/app/core/services/language.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  readonly englishPhotoUrl = environment.photoUrl.language.english;
  readonly vietnamesePhotoUrl = environment.photoUrl.language.vietnamese;

  @Output() sidebarToggled = new EventEmitter();

  user: User;

  constructor(
    private authService: AuthService,
    private languageService: LanguageService
  ) { }

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

  selectEnglish() {
    this.languageService.setLanguage(Language.ENGLISH);
  }

  selectVietnamese() {
    this.languageService.setLanguage(Language.VIETNAMESE);
  }

  isLoggedIn() {
    return this.authService.isLoggedIn();
  }

}
