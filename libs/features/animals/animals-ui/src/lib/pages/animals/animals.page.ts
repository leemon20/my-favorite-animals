import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { LoadAnimalsAction } from '@my-favorite-animals/animals-data';
import { Store } from '@ngxs/store';
import { AnimalsListComponent } from '../../components/animals-list/animals-list.component';

@Component({
  selector: 'animals-page',
  imports: [CommonModule, AnimalsListComponent],
  templateUrl: './animals.page.html',
  styleUrl: './animals.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalsPage implements OnInit {
  private readonly store = inject(Store);

  ngOnInit(): void {
    this.store.dispatch(new LoadAnimalsAction());
  }
}
