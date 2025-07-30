import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AnimalsStateQueries, LoadAnimalOfDayAction } from '@my-favorite-animals/animals-data';
import { AnimalCardComponent } from '@my-favorite-animals/ui';
import { Store } from '@ngxs/store';

@Component({
  selector: 'mfa-animal-of-day-widget',
  imports: [CommonModule, MatProgressSpinner, AnimalCardComponent],
  templateUrl: './animal-of-day.widget.html',
  styleUrl: './animal-of-day.widget.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalOfDayWidget implements OnInit {
  private readonly store = inject(Store);
  private readonly animalstateQueries = inject(AnimalsStateQueries);

  protected $loading = this.animalstateQueries.$animalOfDayLoading;
  protected $error = this.animalstateQueries.$animalOfDayLoadingError;
  protected $animal = this.animalstateQueries.$animalOfDay;

  ngOnInit(): void {
    this.store.dispatch(new LoadAnimalOfDayAction());
  }
}
