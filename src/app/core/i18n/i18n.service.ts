import { Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ptBR } from './pt-BR';
import { enUS } from './en-US';

export type Lang = 'pt-BR' | 'en-US';

const TRANSLATIONS: Record<Lang, typeof ptBR> = {
  'pt-BR': ptBR,
  'en-US': enUS,
};

const STORAGE_KEY = 'yvstudio-lang';

@Injectable({ providedIn: 'root' })
export class I18nService {
  private readonly platformId = inject(PLATFORM_ID);
  private readonly _lang = signal<Lang>('pt-BR');

  readonly lang = this._lang.asReadonly();

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      const saved = localStorage.getItem(STORAGE_KEY) as Lang | null;
      if (saved === 'pt-BR' || saved === 'en-US') {
        this._lang.set(saved);
      }
    }
  }

  setLang(lang: Lang): void {
    this._lang.set(lang);
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(STORAGE_KEY, lang);
    }
  }

  t(key: string): string {
    const parts = key.split('.');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let node: any = TRANSLATIONS[this._lang()];
    for (const p of parts) {
      if (node == null || typeof node !== 'object') return key;
      node = node[p];
    }
    return typeof node === 'string' ? node : key;
  }
}
