import { Locator, Page } from '@playwright/test';

export class AnimalsPage {
  constructor(private page: Page) {}

  public async goto() {
    await this.page.goto('/animals');
  }

  public async goBack() {
    await this.page.locator('[data-test-id="back-button"]').click();
  }

  public get loadingIndicator(): Locator {
    return this.page.locator('mat-spinner');
  }

  private get animalLists(): Locator {
    return this.page.locator('mfa-animals-list');
  }

  public get animalGallery(): Locator {
    return this.animalLists.locator('mfa-animal-gallery');
  }

  public async animalAnimalCardsInGalleryAt(index: number): Promise<Locator> {
    const galleries = await this.animalGallery.all();

    return galleries[index].locator('ui-animal-card');
  }
}
