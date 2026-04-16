import {
  CUSTOM_ELEMENTS_SCHEMA,
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
  selector: 'app-marmoraria',
  standalone: true,
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './marmoraria.component.html',
  styleUrl: './marmoraria.component.scss',
})
export class MarmorariaComponent implements AfterViewInit, OnDestroy {
  menuOpen = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  toggleMenu(): void { this.menuOpen.update(v => !v); }
  closeMenu(): void  { this.menuOpen.set(false); }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { gsap }          = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    // Hero
    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.mm-hero__eyebrow', { y: 20, opacity: 0, duration: 0.6 })
      .from('.mm-hero__title',   { y: 60, opacity: 0, duration: 1.1 }, '-=0.3')
      .from('.mm-hero__body',    { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.mm-hero__cta',     { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.mm-hero__image',   { x: 40, opacity: 0, duration: 1.2 }, '-=1.1');

    // Craft section
    gsap.from(['.mm-craft__image', '.mm-craft__content > *'], {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.18, ease: 'power2.out',
      scrollTrigger: { trigger: '.mm-craft', start: 'top 82%', once: true },
    });

    // Materials grid
    gsap.from('.mm-material', {
      y: 30, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.mm-materials__grid', start: 'top 82%', once: true },
    });

    // Projects
    gsap.from('.mm-project', {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.14, ease: 'power2.out',
      scrollTrigger: { trigger: '.mm-projects__grid', start: 'top 82%', once: true },
    });

    // CTA
    gsap.from(['.mm-cta__title', '.mm-cta__body', '.mm-cta__form'], {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.18, ease: 'power3.out',
      scrollTrigger: { trigger: '.mm-cta', start: 'top 80%', once: true },
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    });
  }
}
