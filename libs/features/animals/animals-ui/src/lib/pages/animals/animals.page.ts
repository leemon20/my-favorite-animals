import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { LoadFavoriteAnimalsAction, NavigationService } from '@my-favorite-animals/animals-data';
import { Store } from '@ngxs/store';
import { AnimalsListComponent } from '../../components/animals-list/animals-list.component';

@Component({
  selector: 'mfa-animals-page',
  imports: [CommonModule, AnimalsListComponent, MatButton],
  templateUrl: './animals.page.html',
  styleUrl: './animals.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnimalsPage implements OnInit {
  private readonly store = inject(Store);
  private readonly navigationService = inject(NavigationService);

  ngOnInit(): void {
    this.store.dispatch(new LoadFavoriteAnimalsAction());
  }

  protected onBack() {
    this.navigationService.goBack();
  }
}
