import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  HostListener,
  Inject,
  PLATFORM_ID,
  AfterViewInit,
  OnDestroy,
  signal,
  computed,
  inject,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { PageCardComponent } from './page-card/page-card.component';
import { I18nService, Lang } from '../core/i18n/i18n.service';
import { TranslatePipe } from '../core/i18n/translate.pipe';

export type PageFilter = 'todos' | 'advocacia' | 'consultorios' | 'vendas' | 'construcao' | 'outros';

@Component({
  selector: 'app-landing-pages',
  standalone: true,
  imports: [RouterLink, PageCardComponent, TranslatePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './landing-pages.component.html',
  styleUrl: './landing-pages.component.scss',
})
export class LandingPagesComponent implements AfterViewInit, OnDestroy {
  readonly i18n = inject(I18nService);

  menuOpen     = signal(false);
  langOpen     = signal(false);
  activeFilter = signal<PageFilter>('todos');

  readonly filters = computed<{ id: PageFilter; label: string }[]>(() => [
    { id: 'todos',        label: this.i18n.t('gallery.filters.todos')        },
    { id: 'advocacia',    label: this.i18n.t('gallery.filters.advocacia')    },
    { id: 'consultorios', label: this.i18n.t('gallery.filters.consultorios') },
    { id: 'vendas',       label: this.i18n.t('gallery.filters.vendas')       },
    { id: 'construcao',   label: this.i18n.t('gallery.filters.construcao')   },
    { id: 'outros',       label: this.i18n.t('gallery.filters.outros')       },
  ]);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

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

  setFilter(id: PageFilter): void {
    this.activeFilter.set(id);
  }

  isVisible(tag: PageFilter): boolean {
    return this.activeFilter() === 'todos' || this.activeFilter() === tag;
  }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.lp-gallery__eyebrow', { y: 20, opacity: 0, duration: 0.7 })
      .from('.lp-gallery__title',   { y: 40, opacity: 0, duration: 0.9 }, '-=0.4')
      .from('.lp-gallery__sub',     { y: 20, opacity: 0, duration: 0.7 }, '-=0.5');

    gsap.from('.lp-gallery__grid app-page-card', {
      y: 60, opacity: 0, duration: 0.8, stagger: 0.14, ease: 'power3.out',
      scrollTrigger: { trigger: '.lp-gallery__grid', start: 'top 85%', once: true },
    });

    gsap.from('.lp-footer', {
      opacity: 0, y: 20, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '.lp-footer', start: 'top 98%', once: true },
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    });
  }
}
