import { CUSTOM_ELEMENTS_SCHEMA, Component, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-template-card',
  standalone: true,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './template-card.component.html',
  styleUrl: './template-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class TemplateCardComponent {
  @Input() name = '';
  @Input() description = '';
  @Input() variant: 'aion' | 'clinic' = 'aion';
}
