import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AnimalOfDayWidget, FavoriteAnimalsWidget } from '@my-favorite-animals/animals-widgets';

@Component({
  selector: 'mfa-dashboard',
  imports: [CommonModule, FavoriteAnimalsWidget, AnimalOfDayWidget],
  templateUrl: './dashboard.page.html',
  styleUrl: './dashboard.page.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardPage {}
