import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  input,
  signal,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NavLink } from '../../models/nav-link.model';

@Component({
  selector: 'app-shared-nav',
  standalone: true,
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './nav.component.html',
})
export class SharedNavComponent {
  /** Rota Angular para o link "← Galeria" (ex: '/landing-pages'). Omitir para esconder. */
  backLink = input<string>('');

  /** Texto do logotipo */
  logoText = input.required<string>();

  /** href do logotipo (padrão '#') */
  logoHref = input<string>('#');

  /** Links do menu. isCta=true renderiza luster-button. */
  links = input<NavLink[]>([]);

  /** Seção ativa (passada do componente pai via activeSection()) */
  activeSection = input<string>('');

  readonly menuOpen = signal(false);
  toggleMenu(): void { this.menuOpen.update(v => !v); }
  closeMenu():  void { this.menuOpen.set(false); }
}
