import { computed, Injectable, Signal } from '@angular/core';
import { select } from '@ngxs/store';
import { AnimalsStateModel } from './animals.model';
import { ANIMALS_STATE_TOKEN } from './animals.state';

@Injectable({ providedIn: 'root' })
export class AnimalsStateQueries {
  public $loading = computed(() => this.$state().loading);
  public $error = computed(() => this.$state().error);
  public $animals = computed(() => this.$state().animals);

  private readonly $state: Signal<AnimalsStateModel> = select(ANIMALS_STATE_TOKEN);
}
