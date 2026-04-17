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
  selector: 'app-neapolitan',
  standalone: true,
  imports: [RouterLink, SharedNavComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './neapolitan.component.html',
  styleUrl: './neapolitan.component.scss',
})
export class NeapolitanComponent implements AfterViewInit, OnDestroy {
  readonly navLinks: NavLink[] = [
    { label: 'Heritage', href: '#heritage' },
    { label: 'Maestro',  href: '#maestro' },
    { label: 'Reserve',  href: '#reserve', isCta: true },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { gsap } = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.np-hero__eyebrow', { y: 20, opacity: 0, duration: 0.6 })
      .from('.np-hero__title',   { y: 60, opacity: 0, duration: 1 },    '-=0.3')
      .from('.np-hero__body',    { y: 30, opacity: 0, duration: 0.8 },  '-=0.5')
      .from('.np-hero__cta',     { y: 20, opacity: 0, duration: 0.6 },  '-=0.4')
      .from('.np-hero__visual',  { x: 40, opacity: 0, duration: 1 },    '-=1.2');

    document.querySelectorAll<Element>('.np-section').forEach(section => {
      gsap.from(section.querySelectorAll('.np-eyebrow, .np-section__title, .np-body'), {
        y: 40, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
        scrollTrigger: { trigger: section, start: 'top 82%', once: true },
      });
    });

    gsap.from('.np-heritage__images .np-img', {
      y: 50, opacity: 0, duration: 0.9, stagger: 0.2, ease: 'power2.out',
      scrollTrigger: { trigger: '.np-heritage__images', start: 'top 80%', once: true },
    });

    gsap.from('.np-maestro__photo', {
      x: -60, opacity: 0, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: '.np-maestro', start: 'top 78%', once: true },
    });

    gsap.from('.np-step', {
      x: -40, opacity: 0, duration: 0.7, stagger: 0.18, ease: 'power2.out',
      scrollTrigger: { trigger: '.np-timeline__steps', start: 'top 82%', once: true },
    });

    gsap.from('.np-gallery__img', {
      scale: 0.95, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.np-gallery__grid', start: 'top 84%', once: true },
    });

    gsap.from(['.np-cta-section__title', '.np-cta-btn'], {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: '.np-cta-section', start: 'top 80%', once: true },
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    });
  }
}
