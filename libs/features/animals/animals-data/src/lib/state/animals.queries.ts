import { computed, Injectable, Signal } from '@angular/core';
import { select } from '@ngxs/store';
import { AnimalsStateModel } from './animals.model';
import { ANIMALS_STATE_TOKEN } from './animals.state';

@Injectable({ providedIn: 'root' })
export class AnimalsStateQueries {
  public $favoriteAnimalLoading = computed(() => this.$state().favoriteAnimalsLoading);
  public $favoriteAnimalError = computed(() => this.$state().favoriteAnimalsLoadingError);
  public $favoriteAnimals = computed(() => this.$state().favoriteAnimals);

  public $animalOfDayLoading = computed(() => this.$state().animalOfDayLoading);
  public $animalOfDayError = computed(() => this.$state().animalOfDayLoadingError);
  public $animalOfDay = computed(() => this.$state().animalOfDay);

  private readonly $state: Signal<AnimalsStateModel> = select(ANIMALS_STATE_TOKEN);
}
