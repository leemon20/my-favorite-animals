import { Page } from '@playwright/test';
import { AnimalOfDayWidgetPom } from '../../animals/poms/animal-of-day.widget.pom';
import { FavoriteAnimalsWidgetPom } from '../../animals/poms/favorite-animals.widget.pom';

export class DashboardPagePom {
  readonly page: Page;
  readonly favoriteAnimalsWidget: FavoriteAnimalsWidgetPom;
  readonly animalOfDayWidget: AnimalOfDayWidgetPom;

  constructor(page: Page) {
    this.page = page;
    this.favoriteAnimalsWidget = new FavoriteAnimalsWidgetPom(page);
    this.animalOfDayWidget = new AnimalOfDayWidgetPom(page);
  }

  async goto() {
    await this.page.goto('/dashboard');
  }
}
