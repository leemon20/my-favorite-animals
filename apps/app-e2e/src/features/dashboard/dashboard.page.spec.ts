import test, { expect } from '@playwright/test';
import { DashboardPagePom } from './poms/dashboard.page.pom';

test.describe('Dashboard Page', () => {
  let dashboardPage: DashboardPagePom;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPagePom(page);

    await dashboardPage.goto();
  });

  test('should display the favorite animals and animal of the day widgets', async () => {
    await expect(dashboardPage.favoriteAnimalsWidget.loadingIndicator).toBeVisible();
    await expect(dashboardPage.animalOfDayWidget.loadingIndicator).toBeVisible();

    await expect(dashboardPage.favoriteAnimalsWidget.animalCards.first()).toBeVisible();
    expect(await dashboardPage.favoriteAnimalsWidget.animalCardsCount).toBe(2);

    await expect(dashboardPage.animalOfDayWidget.animalCard).toBeAttached();
  });

  test('should navigate to the animals page when the "Show All" button is clicked', async ({ page }) => {
    await dashboardPage.favoriteAnimalsWidget.clickShowAllButton();
    await expect(page).toHaveURL('/animals');
  });
});
