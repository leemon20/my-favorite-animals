import { Locator, Page } from '@playwright/test';

export class FavoriteAnimalsWidgetPom {
  private self: Locator;

  constructor(page: Page) {
    this.self = page.locator('mfa-favorite-animals-widget');
  }

  public get loadingIndicator(): Locator {
    return this.self.locator('mat-spinner');
  }

  public get animalCards(): Locator {
    return this.self.locator('ui-animal-card');
  }

  public get animalCardsCount(): Promise<number> {
    return this.self.locator('ui-animal-card').count();
  }

  public async clickShowAllButton() {
    await this.showAllButton.click();
  }

  private get showAllButton(): Locator {
    return this.self.locator('[data-test-id="back-button"]');
  }
}
