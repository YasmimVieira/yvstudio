export interface NavLink {
  /** Texto exibido no link */
  label: string;

  /** Hash ou URL do destino (ex: '#sobre', '#contact') */
  href: string;

  /** ID da seção para comparar com activeSection (opcional) */
  activeId?: string;

  /** Renderiza como luster-button em vez de link simples */
  isCta?: boolean;

  /** Variante do botão CTA ('primary' | 'secondary') */
  ctaVariant?: 'primary' | 'secondary';

  /** Tamanho do botão CTA ('sm' | 'md' | 'lg') */
  ctaSize?: string;
}
