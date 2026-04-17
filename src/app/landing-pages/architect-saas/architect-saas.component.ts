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
  selector: 'app-architect-saas',
  standalone: true,
  imports: [RouterLink, SharedNavComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './architect-saas.component.html',
  styleUrl: './architect-saas.component.scss',
})
export class ArchitectSaasComponent implements AfterViewInit, OnDestroy {
  readonly navLinks: NavLink[] = [
    { label: 'Funcionalidades', href: '#funcionalidades' },
    { label: 'Preços',          href: '#precos' },
    { label: 'Depoimentos',     href: '#depoimento' },
    { label: 'Começar Grátis',  href: '#precos', isCta: true },
  ];

  readonly plans = [
    {
      name: 'Starter',
      price: '49',
      desc: 'Para times pequenos que estão começando.',
      features: ['1 projeto', 'Até 5 usuários', 'Integrações básicas', 'Suporte por e-mail'],
      cta: 'Começar Grátis',
      highlight: false,
    },
    {
      name: 'Pro',
      price: '149',
      desc: 'A escolha de times de alta performance.',
      features: ['Projetos ilimitados', 'Até 25 usuários', 'Todas as integrações', 'Suporte prioritário', 'Acesso à API'],
      cta: 'Começar com o Pro',
      highlight: true,
    },
    {
      name: 'Enterprise',
      price: '499',
      desc: 'Para organizações que exigem o melhor.',
      features: ['Projetos ilimitados', 'Usuários ilimitados', 'Suporte dedicado 24/7', 'SLA garantido', 'Customizações exclusivas'],
      cta: 'Falar com Vendas',
      highlight: false,
    },
  ];

  constructor(@Inject(PLATFORM_ID) private platformId: object) {}

  async ngAfterViewInit(): Promise<void> {
    if (!isPlatformBrowser(this.platformId)) return;

    const { gsap }          = await import('gsap');
    const { ScrollTrigger } = await import('gsap/ScrollTrigger');
    gsap.registerPlugin(ScrollTrigger);

    gsap.timeline({ defaults: { ease: 'power3.out' } })
      .from('.arc-hero__badge',     { y: 16, opacity: 0, duration: 0.6 })
      .from('.arc-hero__title',     { y: 50, opacity: 0, duration: 1.0 }, '-=0.3')
      .from('.arc-hero__body',      { y: 28, opacity: 0, duration: 0.8 }, '-=0.5')
      .from('.arc-hero__actions',   { y: 18, opacity: 0, duration: 0.6 }, '-=0.4')
      .from('.arc-hero__dashboard', { opacity: 0, y: 30, duration: 1.0 }, '-=0.8');

    gsap.from('.arc-feature', {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.14, ease: 'power2.out',
      scrollTrigger: { trigger: '.arc-features__grid', start: 'top 82%', once: true },
    });

    gsap.from('.arc-testimonial__card', {
      y: 30, opacity: 0, duration: 0.9, ease: 'power2.out',
      scrollTrigger: { trigger: '.arc-testimonial', start: 'top 82%', once: true },
    });

    gsap.from('.arc-plan', {
      y: 40, opacity: 0, duration: 0.7, stagger: 0.14, ease: 'power2.out',
      scrollTrigger: { trigger: '.arc-pricing__grid', start: 'top 80%', once: true },
    });

    gsap.from(['.arc-cta__title', '.arc-cta__body', '.arc-cta__actions'], {
      y: 30, opacity: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out',
      scrollTrigger: { trigger: '.arc-cta', start: 'top 82%', once: true },
    });
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
      ScrollTrigger.getAll().forEach(st => st.kill());
    });
  }
}
