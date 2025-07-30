import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { AnimalModel } from '@my-favorite-animals/animals-data';
import { AnimalCardComponent } from '@my-favorite-animals/ui';

@Component({
  selector: 'mfa-animal-gallery',
  imports: [CommonModule, AnimalCardComponent],
  templateUrl: './animal-gallery.component.html',
  styleUrls: ['./animal-gallery.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalGalleryComponent {
  public animal = input.required<AnimalModel>();
}
