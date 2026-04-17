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
import { SharedNavComponent } from '../../shared/components/nav/nav.component';
import { NavLink } from '../../shared/models/nav-link.model';

@Component({
  selector: 'app-the-kinetic',
  standalone: true,
  imports: [RouterLink, SharedNavComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './the-kinetic.component.html',
  styleUrl: './the-kinetic.component.scss',
})
export class TheKineticComponent implements AfterViewInit, OnDestroy {
  activeIdx = signal(0);

  readonly navLinks: NavLink[] = [
    { label: 'Serviços',        href: '#services' },
    { label: 'Portfólio',       href: '#portfolio' },
    { label: 'Depoimentos',     href: '#testimonials' },
    { label: 'Iniciar Projeto', href: '#contact', isCta: true },
  ];

  readonly testimonials = [
    {
      quote: '"A Kinetic transformou nossa marca em uma potência digital. Seu olhar para detalhes editoriais de alto nível é incomparável no mercado de agências."',
      author: 'John Viera',
      role: 'CEO, Mela Industries',
    },
    {
      quote: '"Trabalhar com a Kinetic foi a melhor decisão que tomamos no ano. Eles entregaram uma experiência digital que chama atenção e gera resultados reais."',
      author: 'Sara Melo',
      role: 'Fundadora, Lumière Studio',
    },
    {
      quote: '"Criatividade sem igual aliada a pensamento estratégico. Nossas taxas de conversão dobraram em três meses após o lançamento do novo site."',
      author: 'Marcus Reid',
      role: 'CMO, Aether Collective',
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
      .from('.tk-hero__eyebrow', { y: 20, opacity: 0, duration: 0.6 })
      .from('.tk-hero__title',   { y: 60, opacity: 0, duration: 1.1 }, '-=0.3')
      .from('.tk-hero__body',    { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.tk-hero__actions', { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.tk-hero__visual',  { opacity: 0, x: 40, duration: 1.2 }, '-=1.0');

    gsap.from('.tk-service-card', {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.14, ease: 'power2.out',
      scrollTrigger: { trigger: '.tk-services__grid', start: 'top 82%', once: true },
    });

    gsap.from('.tk-reel', {
      y: 50, opacity: 0, duration: 0.8, stagger: 0.12, ease: 'power2.out',
      scrollTrigger: { trigger: '.tk-portfolio__grid', start: 'top 80%', once: true },
    });

    gsap.from('.tk-testimonials__inner', {
      y: 30, opacity: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: '.tk-testimonials', start: 'top 82%', once: true },
    });

    gsap.from(['.tk-contact__header', '.tk-contact__info', '.tk-form'], {
      y: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.tk-contact', start: 'top 80%', once: true },
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    });
  }
}
