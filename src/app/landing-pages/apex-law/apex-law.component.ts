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
  selector: 'app-apex-law',
  standalone: true,
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './apex-law.component.html',
  styleUrl: './apex-law.component.scss',
})
export class ApexLawComponent implements AfterViewInit, OnDestroy {
  menuOpen = signal(false);

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  toggleMenu(): void { this.menuOpen.update(v => !v); }
  closeMenu(): void  { this.menuOpen.set(false); }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { gsap }          = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.ap-hero__eyebrow', { y: 20, opacity: 0, duration: 0.6 })
      .from('.ap-hero__title',   { y: 60, opacity: 0, duration: 1.1 }, '-=0.3')
      .from('.ap-hero__body',    { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.ap-hero__actions', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.ap-hero__badge',   { opacity: 0, x: 30, duration: 1 },   '-=0.9');

    gsap.from(['.ap-about__text > *'], {
      y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: '.ap-about', start: 'top 82%', once: true },
    });

    gsap.from('.ap-about__metric', {
      y: 30, opacity: 0, duration: 0.6, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.ap-about__metrics', start: 'top 84%', once: true },
    });

    gsap.from('.ap-area', {
      y: 30, opacity: 0, duration: 0.65, stagger: 0.1, ease: 'power2.out',
      scrollTrigger: { trigger: '.ap-areas__list', start: 'top 82%', once: true },
    });

    gsap.from('.ap-figure', {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.14, ease: 'power2.out',
      scrollTrigger: { trigger: '.ap-track__grid', start: 'top 82%', once: true },
    });

    gsap.from('.ap-partner', {
      x: -40, opacity: 0, duration: 0.8, stagger: 0.18, ease: 'power2.out',
      scrollTrigger: { trigger: '.ap-partners__grid', start: 'top 80%', once: true },
    });

    gsap.from(['.ap-contact__title', '.ap-contact__body', '.ap-contact__btn'], {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.ap-contact', start: 'top 80%', once: true },
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    });
  }
}
