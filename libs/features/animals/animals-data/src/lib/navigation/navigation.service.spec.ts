import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Mock } from 'vitest';
import { NavigationService } from './navigation.service';

describe('NavigationService', () => {
  let service: NavigationService;

  let routerMock: {
    url: string | undefined;
    navigate: Mock;
    navigateByUrl: Mock;
  };

  beforeEach(() => {
    routerMock = {
      url: undefined,
      navigate: vi.fn(),
      navigateByUrl: vi.fn(),
    } satisfies Partial<Router>;

    TestBed.configureTestingModule({ providers: [{ provide: Router, useValue: routerMock }] });

    service = TestBed.inject(NavigationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should navigate to favorite animals page', () => {
    service.navigateToFavoriteAnimalsPage();

    expect(routerMock.navigate).toHaveBeenCalledWith(['/animals']);
  });

  it('should navigate to dashboard when no prior call to navigateToFavoriteAnimalsPage happened', () => {
    service.goBack();

    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/dashboard');
  });

  it('should navigate to back to the url that was present when navigateToFavoriteAnimalsPage was called', () => {
    routerMock.url = '/foo';

    service.navigateToFavoriteAnimalsPage();
    service.goBack();

    expect(routerMock.navigateByUrl).toHaveBeenCalledWith('/foo');
  });
});
