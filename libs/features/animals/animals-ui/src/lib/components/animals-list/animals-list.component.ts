import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AnimalsStateQueries, NavigationService } from '@my-favorite-animals/animals-data';
import { AnimalGalleryComponent } from '../animal-gallery/animal-gallery.component';

@Component({
  selector: 'mfa-animals-list',
  imports: [CommonModule, MatProgressSpinner, MatButton, AnimalGalleryComponent],
  templateUrl: './animals-list.component.html',
  styleUrl: './animals-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalsListComponent {
  private readonly animalstateQueries = inject(AnimalsStateQueries);
  private readonly navigationService = inject(NavigationService);

  protected $loading = this.animalstateQueries.$favoriteAnimalLoading;
  protected $error = this.animalstateQueries.$favoriteAnimalsLoadingError;
  protected $animals = this.animalstateQueries.$favoriteAnimals;

  protected onBack() {
    this.navigationService.goBack();
  }
}
