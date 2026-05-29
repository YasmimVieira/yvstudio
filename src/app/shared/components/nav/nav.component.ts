import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  HostListener,
  input,
  signal,
  inject,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavLink } from '../../models/nav-link.model';
import { I18nService, Lang } from '../../../core/i18n/i18n.service';
import { TranslatePipe } from '../../../core/i18n/translate.pipe';

@Component({
  selector: 'app-shared-nav',
  standalone: true,
  imports: [RouterLink, TranslatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './nav.component.html',
})
export class SharedNavComponent {
  readonly i18n = inject(I18nService);

  backLink      = input<string>('');
  logoText      = input.required<string>();
  logoHref      = input<string>('#');
  links         = input<NavLink[]>([]);
  activeSection = input<string>('');

  readonly menuOpen = signal(false);
  readonly langOpen = signal(false);

  toggleMenu(): void { this.menuOpen.update(v => !v); }
  closeMenu():  void { this.menuOpen.set(false); }

  toggleLang(): void { this.langOpen.update(v => !v); }

  setLang(lang: Lang): void {
    this.i18n.setLang(lang);
    this.langOpen.set(false);
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.langOpen.set(false);
  }
}
