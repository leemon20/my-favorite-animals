import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  private readonly router = inject(Router);

  private previousUrl: string | null = null;
  private readonly animalsRoute = '/animals';
  private readonly defaultFallbackRoute = '/dashboard';

  navigateToFavoriteAnimalsPage(): void {
    this.previousUrl = this.router.url;
    this.router.navigate([this.animalsRoute]);
  }

  goBack(): void {
    this.router.navigateByUrl(this.previousUrl || this.defaultFallbackRoute);
  }
}
