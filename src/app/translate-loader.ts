import { TranslateLoader } from '@ngx-translate/core';
import { of } from 'rxjs';

import * as enLocale from '../locales/en.json';
// import * as deLocale from 'locales/de.json';

export class StaticTranslateLoader implements TranslateLoader {
  locales = {
    'en': enLocale
  };

  getTranslation(lang: string): any {
    if (this.locales[lang]) {
      return of(this.locales[lang].default);
    } else {
      return of(this.locales['en']);
    }
  }
}
