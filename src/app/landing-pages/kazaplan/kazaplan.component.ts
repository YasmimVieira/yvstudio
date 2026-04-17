import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SharedNavComponent } from '../../shared/components/nav/nav.component';
import { NavLink } from '../../shared/models/nav-link.model';

@Component({
  selector: 'app-kazaplan',
  standalone: true,
  imports: [RouterLink, SharedNavComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './kazaplan.component.html',
  styleUrl: './kazaplan.component.css',
})
export class KazaPlanComponent implements AfterViewInit, OnDestroy {
  readonly navLinks: NavLink[] = [
    { label: 'Benefícios',       href: '#dores' },
    { label: 'Funcionalidades',  href: '#funcional' },
    { label: 'Preços',           href: '#precos' },
    { label: 'Ver Demonstração', href: '#precos', isCta: true, ctaVariant: 'secondary', ctaSize: 'sm' },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.set(['.kp-hero__tag', '.kp-hero__sub', '.kp-hero__actions'], { opacity: 0, y: 20 });
    gsap.set('.kp-hero__title', { opacity: 0, y: 50 });
    gsap.set('.kp-hero__visual', { opacity: 0, x: 40 });

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .to('.kp-hero__tag',     { opacity: 1, y: 0, duration: 0.6 })
      .to('.kp-hero__title',   { opacity: 1, y: 0, duration: 1 },   '-=0.3')
      .to('.kp-hero__sub',     { opacity: 1, y: 0, duration: 0.8 }, '-=0.5')
      .to('.kp-hero__actions', { opacity: 1, y: 0, duration: 0.7 }, '-=0.4')
      .to('.kp-hero__visual',  { opacity: 1, x: 0, duration: 1 },   '-=1.1');

    document.querySelectorAll<Element>('.kp-scroll-anim').forEach(el => {
      gsap.from(el, {
        y: 30, opacity: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 87%', once: true },
      });
    });

    gsap.from('.kp-pain__card', {
      y: 50, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.kp-pain__grid', start: 'top 84%', once: true },
    });

    gsap.from('.kp-feat-card', {
      y: 50, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.kp-features__grid', start: 'top 84%', once: true },
    });

    gsap.from('.kp-feat-item', {
      x: -30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.kp-feat-list', start: 'top 84%', once: true },
    });

    gsap.from('.kp-phone', {
      x: 40, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.kp-exp__inner', start: 'top 80%', once: true },
    });

    gsap.from('.kp-plan', {
      y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.kp-pricing__grid', start: 'top 84%', once: true },
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    });
  }
}
