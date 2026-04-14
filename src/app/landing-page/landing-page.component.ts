import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  AfterViewInit,
  OnDestroy,
  OnInit,
  HostListener,
  Inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent implements OnInit, AfterViewInit, OnDestroy {
  menuOpen = signal(false);
  activeSection = signal('');

  private readonly sectionOrder = ['contatos', 'ecosystem', 'projetos', 'produtos', 'sobre', 'hero'];
  private heroMouseHandlers: (() => void)[] = [];

  constructor(
    @Inject(PLATFORM_ID) private platformId: object,
    private meta: Meta,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle('YV Studio | Criação de Sites, Desenvolvimento de Software e Landing Pages');

    this.meta.updateTag({ name: 'description', content: 'YV Studio — Estúdio especializado em criação de sites, desenvolvimento de software, landing pages e produtos SaaS de alto padrão. Frontend sofisticado com performance impecável.' });
    this.meta.updateTag({ property: 'og:title', content: 'YV Studio | Criação de Sites, Desenvolvimento de Software e Landing Pages' });
    this.meta.updateTag({ property: 'og:description', content: 'Estúdio especializado em criação de sites, desenvolvimento de software, landing pages e SaaS. Frontend sofisticado com design de alto padrão.' });
    this.meta.updateTag({ property: 'og:url', content: 'https://yvstudio.dev/' });
    this.meta.updateTag({ name: 'twitter:title', content: 'YV Studio | Criação de Sites, Software e Landing Pages' });
    this.meta.updateTag({ name: 'twitter:description', content: 'Estúdio especializado em criação de sites, desenvolvimento de software, landing pages e SaaS de alto padrão.' });
  }

  toggleMenu(): void {
    this.menuOpen.update(v => !v);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    this.initScrollAnimations(gsap, ScrollTrigger);
    this.initHeroParallax(gsap);
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    this.heroMouseHandlers.forEach(fn => fn());
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    });
  }

  // ── Scroll-based animations ──────────────────────────────────
  private initScrollAnimations(gsap: any, ScrollTrigger: any): void {

    // Hero entrance (runs immediately on load)
    gsap.set('.lp-hero__title',      { y: 80, opacity: 0 });
    gsap.set('.lp-hero__subtitle',   { y: 30, opacity: 0 });
    gsap.set('.lp-cta',              { y: 30, opacity: 0 });
    gsap.set('.lp-hero__scroll-cue', { opacity: 0 });

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.lp-hero__title',       { y: 0, opacity: 1, duration: 1.2 })
      .to('.lp-hero__subtitle',    { y: 0, opacity: 1, duration: 0.8 }, '-=0.7')
      .to('.lp-cta',               { y: 0, opacity: 1, duration: 0.8 }, '-=0.5')
      .to('.lp-hero__scroll-cue',  { opacity: 1, duration: 0.6 }, '-=0.2');

    // Dividers — expand from left
    (gsap.utils.toArray('.lp-divider') as Element[]).forEach((el: Element) => {
      gsap.fromTo(el,
        { scaleX: 0, transformOrigin: '0% 50%' },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power2.inOut',
          scrollTrigger: { trigger: el, start: 'top 95%', once: true },
        }
      );
    });

    // Section headers — meta label then title
    document.querySelectorAll<Element>('.lp-sobre__header, .lp-section__header').forEach(header => {
      gsap.from(header.querySelectorAll('.lp-meta, .lp-section__title'), {
        y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out',
        scrollTrigger: { trigger: header, start: 'top 88%', once: true },
      });
    });

    // Ecosystem standalone header
    gsap.from(['.lp-ecosystem__meta', '.lp-ecosystem .lp-section__title'], {
      y: 30, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.lp-ecosystem', start: 'top 85%', once: true },
    });

    // Sobre — body text slides from left
    gsap.from(['.lp-sobre__body > p', '.lp-sobre__quote'], {
      x: -40, opacity: 0, duration: 0.9, stagger: 0.2, ease: 'power2.out',
      scrollTrigger: { trigger: '.lp-sobre__body', start: 'top 82%', once: true },
    });

    // Work cards — stagger up
    gsap.from('.lp-works__grid luster-card', {
      y: 60, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.lp-works__grid', start: 'top 82%', once: true },
    });

    // Ecosystem nodes — scale in with spring
    gsap.from('.lp-graph__node', {
      scale: 0.8, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'back.out(1.4)',
      scrollTrigger: { trigger: '.lp-graph', start: 'top 78%', once: true },
    });

    // Contact cards — stagger up
    gsap.from('.lp-contact-card', {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: '.lp-contatos__grid', start: 'top 84%', once: true },
    });

    // Footer fade in
    gsap.from('.lp-footer', {
      opacity: 0, y: 20, duration: 0.8, ease: 'power2.out',
      scrollTrigger: { trigger: '.lp-footer', start: 'top 98%', once: true },
    });
  }

  // ── Hero mouse parallax ──────────────────────────────────────
  private initHeroParallax(gsap: any): void {
    const heroEl = document.getElementById('hero');
    const glowEl = heroEl?.querySelector<HTMLElement>('.lp-hero__glow');
    if (!heroEl || !glowEl) return;

    const moveX = gsap.quickTo(glowEl, 'x', { duration: 1, ease: 'power2.out' });
    const moveY = gsap.quickTo(glowEl, 'y', { duration: 1, ease: 'power2.out' });

    const onMouseMove = (e: MouseEvent) => {
      const rect = heroEl.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width  / 2) * 0.25;
      const y = (e.clientY - rect.top  - rect.height / 2) * 0.25;
      moveX(x);
      moveY(y);
    };

    const onMouseLeave = () => {
      moveX(0);
      moveY(0);
    };

    heroEl.addEventListener('mousemove', onMouseMove);
    heroEl.addEventListener('mouseleave', onMouseLeave);

    // Store cleanup functions
    this.heroMouseHandlers = [
      () => heroEl.removeEventListener('mousemove', onMouseMove),
      () => heroEl.removeEventListener('mouseleave', onMouseLeave),
    ];
  }

  // ── Active section tracking on scroll ───────────────────────
  @HostListener('window:scroll')
  onScroll(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    for (const id of this.sectionOrder) {
      const el = document.getElementById(id);
      if (el && el.getBoundingClientRect().top <= 80) {
        this.activeSection.set(id);
        return;
      }
    }
    this.activeSection.set('');
  }
}
