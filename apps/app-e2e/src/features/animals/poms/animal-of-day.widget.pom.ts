import { Locator, Page } from '@playwright/test';

export class AnimalOfDayWidgetPom {
  private self: Locator;

  constructor(page: Page) {
    this.self = page.locator('mfa-animal-of-day-widget');
  }

  public get loadingIndicator(): Locator {
    return this.self.locator('mat-spinner');
  }

  public get animalCard(): Locator {
    return this.self.locator('ui-animal-card');
  }
}
