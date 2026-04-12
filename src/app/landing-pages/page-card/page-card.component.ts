import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  Input,
  ViewEncapsulation,
} from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-page-card',
  standalone: true,
  imports: [RouterLink],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './page-card.component.html',
  styleUrl: './page-card.component.scss',
  encapsulation: ViewEncapsulation.None,
})
export class PageCardComponent {
  @Input() title = '';
  @Input() category = '';
  @Input() description = '';
  @Input() status: 'available' | 'coming-soon' = 'available';
  @Input() link = '';
}
