import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AnimalsStateQueries, LoadFavoriteAnimalsAction, NavigationService } from '@my-favorite-animals/animals-data';
import { AnimalCardComponent } from '@my-favorite-animals/ui';
import { Store } from '@ngxs/store';

@Component({
  selector: 'mfa-favorite-animals-widget',
  imports: [CommonModule, MatProgressSpinner, AnimalCardComponent, MatButton],
  templateUrl: './favorite-animals.widget.html',
  styleUrl: './favorite-animals.widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteAnimalsWidget implements OnInit {
  private readonly store = inject(Store);
  private readonly animalstateQueries = inject(AnimalsStateQueries);
  private readonly navigationService = inject(NavigationService);

  public $loading = this.animalstateQueries.$favoriteAnimalLoading;
  public $error = this.animalstateQueries.$favoriteAnimalError;
  public $animals = this.animalstateQueries.$favoriteAnimals;
  public $animalImage = computed(() => {
    const animals = this.$animals() ?? [];

    return animals.reduce((acc, animal) => {
      acc.set(animal.id, animal.gallery[0]);

      return acc;
    }, new Map<string, string>());
  });

  ngOnInit(): void {
    this.store.dispatch(new LoadFavoriteAnimalsAction());
  }

  protected onGoToFavoriteAnimals() {
    this.navigationService.navigateToFavoriteAnimalsPage();
  }
}
