import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AnimalsStateQueries } from '@my-favorite-animals/animals-data';
import { AnimalCardComponent } from '@my-favorite-animals/ui';

@Component({
  selector: 'mfa-animals-list',
  imports: [CommonModule, MatProgressSpinner, AnimalCardComponent],
  templateUrl: './animals-list.component.html',
  styleUrl: './animals-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalsListComponent {
  private readonly animalstateQueries = inject(AnimalsStateQueries);

  public $loading = this.animalstateQueries.$favoriteAnimalLoading;
  public $error = this.animalstateQueries.$favoriteAnimalError;
  public $animals = this.animalstateQueries.$favoriteAnimals;
}
