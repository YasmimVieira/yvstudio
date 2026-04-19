import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  AfterViewInit,
  OnDestroy,
  Inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { isPlatformBrowser, UpperCasePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { SharedNavComponent } from '../../shared/components/nav/nav.component';
import { NavLink } from '../../shared/models/nav-link.model';

@Component({
  selector: 'app-apex-kinetic',
  standalone: true,
  imports: [RouterLink, SharedNavComponent, UpperCasePipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './apex-kinetic.component.html',
  styleUrl: './apex-kinetic.component.scss',
})
export class ApexKineticComponent implements AfterViewInit, OnDestroy {
  activeIdx = signal(0);

  readonly navLinks: NavLink[] = [
    { label: 'Programas',  href: '#programs' },
    { label: 'Coaching',   href: '#features' },
    { label: 'Gear',       href: '#features' },
    { label: 'Comunidade', href: '#testimonials' },
    { label: 'Começar',    href: '#cta', isCta: true },
  ];

  readonly testimonials = [
    {
      quote: 'O Apex Kinetic mudou completamente meu pré-treino. O foco mental é algo que eu nunca tinha experienciado com outras marcas. Recomendo para todos meus alunos.',
      author: 'Marcus Riva',
      role: 'Coach de Elite',
    },
    {
      quote: 'A pureza dos ingredientes é visível nos meus exames e no espelho. Recuperei 40% mais rápido entre as sessões de treino intenso.',
      author: 'Juliana Lins',
      role: 'Atleta Pro',
    },
    {
      quote: 'Nenhuma outra marca entrega a mesma densidade muscular em tão pouco tempo. O sabor é excelente e a dissolução é perfeita.',
      author: 'Ricardo Sales',
      role: 'Entusiasta Fitness',
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  prev(): void {
    this.activeIdx.update(i => (i - 1 + this.testimonials.length) % this.testimonials.length);
  }

  next(): void {
    this.activeIdx.update(i => (i + 1) % this.testimonials.length);
  }

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { gsap }          = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.ak-hero__eyebrow', { y: 20, opacity: 0, duration: 0.6 })
      .from('.ak-hero__title',   { y: 60, opacity: 0, duration: 1.1 }, '-=0.3')
      .from('.ak-hero__body',    { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.ak-hero__actions', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4');

    gsap.from('.ak-feature-card', {
      y: 50, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power2.out',
      scrollTrigger: { trigger: '.ak-features__grid', start: 'top 82%', once: true },
    });

    gsap.from('.ak-testimonial-card', {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.ak-testimonials__cards', start: 'top 80%', once: true },
    });

    gsap.from('.ak-cta__inner', {
      y: 40, opacity: 0, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: '.ak-cta', start: 'top 80%', once: true },
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    });
  }
}
