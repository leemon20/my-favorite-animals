import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AnimalsStateQueries } from '@my-favorite-animals/animals-data';
import { AnimalGalleryComponent } from '../animal-gallery/animal-gallery.component';

@Component({
  selector: 'mfa-animals-list',
  imports: [CommonModule, MatProgressSpinner, AnimalGalleryComponent],
  templateUrl: './animals-list.component.html',
  styleUrl: './animals-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalsListComponent {
  private readonly animalstateQueries = inject(AnimalsStateQueries);

  protected $loading = this.animalstateQueries.$favoriteAnimalLoading;
  protected $error = this.animalstateQueries.$favoriteAnimalsLoadingError;
  protected $animals = this.animalstateQueries.$favoriteAnimals;
}
