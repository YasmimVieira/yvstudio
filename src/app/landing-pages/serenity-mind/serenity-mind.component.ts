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
  selector: 'app-serenity-mind',
  standalone: true,
  imports: [RouterLink, SharedNavComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './serenity-mind.component.html',
  styleUrl: './serenity-mind.component.scss',
})
export class SerenityMindComponent implements AfterViewInit, OnDestroy {
  readonly navLinks: NavLink[] = [
    { label: 'Sobre',      href: '#philosophy' },
    { label: 'Serviços',   href: '#services' },
    { label: 'Abordagem',  href: '#testimonials' },
    { label: 'Agendar',    href: '#cta', isCta: true },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { gsap }          = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.sm-hero__content', { y: 40, opacity: 0, duration: 0.9 })
      .from('.sm-hero__visual',  { y: 30, opacity: 0, duration: 0.9 }, '-=0.5');

    gsap.from('.sm-philosophy__inner', {
      y: 40, opacity: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: '.sm-philosophy', start: 'top 82%', once: true },
    });

    gsap.from('.sm-service-card', {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.14, ease: 'power2.out',
      scrollTrigger: { trigger: '.sm-services__grid', start: 'top 82%', once: true },
    });

    gsap.from(['.sm-testimonials__visual', '.sm-testimonials__content'], {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: '.sm-testimonials', start: 'top 80%', once: true },
    });

    gsap.from('.sm-cta__inner', {
      y: 30, opacity: 0, duration: 0.8, ease: 'power3.out',
      scrollTrigger: { trigger: '.sm-cta', start: 'top 82%', once: true },
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    });
  }
}
