import test, { expect } from '@playwright/test';
import { DashboardPagePom } from '../dashboard/poms/dashboard.page.pom';
import { AnimalsPage } from './poms/animals.page.pom';

test.describe('Animals Page', () => {
  let animalsPage: AnimalsPage;
  let dashboardPage: DashboardPagePom;

  test.beforeEach(async ({ page }) => {
    animalsPage = new AnimalsPage(page);
    dashboardPage = new DashboardPagePom(page);

    await animalsPage.goto();
  });

  test.describe('Navigation', () => {
    test('should navigate back to previous page on back button press', async ({ page }) => {
      await dashboardPage.goto();
      await dashboardPage.favoriteAnimalsWidget.clickShowAllButton();

      await animalsPage.goBack();

      await expect(page).toHaveURL('/dashboard');
    });

    test('should by default navigate to /dashbaord page on back button press', async ({ page }) => {
      await animalsPage.goBack();

      await expect(page).toHaveURL('/dashboard');
    });
  });

  test('should display a list of animals', async () => {
    await expect(animalsPage.loadingIndicator).toBeVisible();

    await expect(animalsPage.animalGallery).toHaveCount(2);

    await expect(await animalsPage.animalAnimalCardsInGalleryAt(0)).toHaveCount(3);
    await expect(await animalsPage.animalAnimalCardsInGalleryAt(1)).toHaveCount(3);
  });
});
