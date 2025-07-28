import { CommonModule, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { LoadAnimalsAction } from '../state/animals.actions';
import { AnimalsStateQueries } from '../state/animals.queries';

@Component({
  selector: 'lib-animals',
  imports: [CommonModule, NgOptimizedImage],
  templateUrl: './animals.component.html',
  styleUrl: './animals.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalsComponent implements OnInit {
  private readonly animalsService = inject(Store);
  private readonly animalstateQueries = inject(AnimalsStateQueries);

  public $loading = this.animalstateQueries.$loading;
  public $error = this.animalstateQueries.$error;
  public $animals = this.animalstateQueries.$animals;

  ngOnInit(): void {
    this.animalsService.dispatch(new LoadAnimalsAction());
  }
}
