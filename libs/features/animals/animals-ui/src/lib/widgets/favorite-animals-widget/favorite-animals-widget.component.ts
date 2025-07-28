import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AnimalsStateQueries, LoadAnimalsAction } from '@my-favorite-animals/animals-data';
import { AnimalCardComponent } from '@my-favorite-animals/ui';
import { Store } from '@ngxs/store';

@Component({
  selector: 'mfa-favorite-animals-widget',
  imports: [CommonModule, MatProgressSpinner, AnimalCardComponent],
  templateUrl: './favorite-animals-widget.component.html',
  styleUrl: './favorite-animals-widget.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FavoriteAnimalsWidgetComponent implements OnInit {
  private readonly store = inject(Store);
  private readonly animalstateQueries = inject(AnimalsStateQueries);

  public $loading = this.animalstateQueries.$loading;
  public $error = this.animalstateQueries.$error;
  public $animals = this.animalstateQueries.$animals;
  public $animalImage = computed(() => {
    const animals = this.$animals() ?? [];

    return animals.reduce((acc, animal) => {
      acc.set(animal.id, animal.gallery[0]);

      return acc;
    }, new Map<string, string>());
  });

  ngOnInit(): void {
    this.store.dispatch(new LoadAnimalsAction());
  }
}
