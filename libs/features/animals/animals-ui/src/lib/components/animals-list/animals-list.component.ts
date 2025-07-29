import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AnimalsStateQueries, NavigationService } from '@my-favorite-animals/animals-data';
import { AnimalCardComponent } from '@my-favorite-animals/ui';

@Component({
  selector: 'mfa-animals-list',
  imports: [CommonModule, MatProgressSpinner, AnimalCardComponent, MatButton],
  templateUrl: './animals-list.component.html',
  styleUrl: './animals-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalsListComponent {
  private readonly animalstateQueries = inject(AnimalsStateQueries);
  private readonly navigationService = inject(NavigationService);

  public $loading = this.animalstateQueries.$favoriteAnimalLoading;
  public $error = this.animalstateQueries.$favoriteAnimalError;
  public $animals = this.animalstateQueries.$favoriteAnimals;

  protected onBack() {
    this.navigationService.goBack();
  }
}
