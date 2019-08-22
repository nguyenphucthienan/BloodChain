import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { environment } from 'src/environments/environment';

export class Language {

  static readonly ENGLISH = 'en';
  static readonly VIETNAMESE = 'vi';

}

@Injectable()
export class LanguageService {

  constructor(private translate: TranslateService) { }

  readLanguageSettingFromStorage() {
    const language = localStorage.getItem(environment.tokenName.language);
    if (!language) {
      this.setDefaultLanguage();
      return;
    }

    this.setLanguage(language);
  }

  setLanguage(language: Language) {
    this.setLanguageToken(language);
    switch (language) {
      case Language.ENGLISH:
        this.translate.use(Language.ENGLISH);
        break;
      case Language.VIETNAMESE:
        this.translate.use(Language.VIETNAMESE);
        break;
    }
  }

  private setDefaultLanguage() {
    this.translate.addLangs([Language.ENGLISH, Language.VIETNAMESE]);
    this.translate.setDefaultLang(Language.ENGLISH);

    const browserLangague = this.translate.getBrowserLang();
    const language = browserLangague.match(/en|vi/) ? browserLangague : Language.ENGLISH;

    this.translate.use(language);
    this.setLanguageToken(language);
  }

  private setLanguageToken(language: Language) {
    localStorage.setItem(environment.tokenName.language, language.toString());
  }

}
