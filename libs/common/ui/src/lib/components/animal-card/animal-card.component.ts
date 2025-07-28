import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatCard, MatCardContent, MatCardHeader } from '@angular/material/card';
import { PLACEHOLDER_IMAGE } from '../../placeholder-image';

@Component({
  selector: 'ui-animal-card',
  imports: [CommonModule, NgOptimizedImage, MatCard, MatCardHeader, MatCardContent],
  templateUrl: './animal-card.component.html',
  styleUrls: ['./animal-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalCardComponent {
  protected readonly PLACEHOLDER_IMAGE = PLACEHOLDER_IMAGE;

  name = input.required<string>();
  image = input.required<string>();
  description = input.required<string>();
}
