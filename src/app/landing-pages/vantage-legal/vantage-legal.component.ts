import {
  Component,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-vantage-legal',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './vantage-legal.component.html',
  styleUrl: './vantage-legal.component.scss',
})
export class VantageLegalComponent implements AfterViewInit, OnDestroy {
  menuOpen = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  toggleMenu(): void { this.menuOpen.update(v => !v); }
  closeMenu(): void  { this.menuOpen.set(false); }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { gsap }        = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.vl-hero__tag',   { y: 20, opacity: 0, duration: 0.6 })
      .from('.vl-hero__title', { y: 70, opacity: 0, duration: 1.1 }, '-=0.3')
      .from('.vl-hero__sub',   { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.vl-hero__cta',   { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.vl-hero__deco',  { opacity: 0, duration: 1.4 },        '-=1.0');

    gsap.from('.vl-pillar', {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.14, ease: 'power2.out',
      scrollTrigger: { trigger: '.vl-pillars__grid', start: 'top 82%', once: true },
    });

    gsap.from('.vl-callout', {
      y: 30, opacity: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: '.vl-callout', start: 'top 84%', once: true },
    });

    gsap.from('.vl-domain', {
      y: 30, opacity: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out',
      scrollTrigger: { trigger: '.vl-domains__grid', start: 'top 82%', once: true },
    });

    gsap.from('.vl-stat', {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
      scrollTrigger: { trigger: '.vl-stats__inner', start: 'top 82%', once: true },
    });

    gsap.from('.vl-partner', {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.2, ease: 'power2.out',
      scrollTrigger: { trigger: '.vl-team__grid', start: 'top 80%', once: true },
    });

    gsap.from(['.vl-cta__title', '.vl-cta__sub', '.vl-cta__btn'], {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.vl-cta', start: 'top 80%', once: true },
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    });
  }
}
