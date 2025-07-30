import { NO_ERRORS_SCHEMA, signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import {
  AnimalModel,
  AnimalsStateQueries,
  LoadFavoriteAnimalsAction,
  NavigationService,
} from '@my-favorite-animals/animals-data';
import { Store } from '@ngxs/store';
import { Mock } from 'vitest';
import { FavoriteAnimalsWidget } from './favorite-animals.widget';

describe('FavoriteAnimalsWidget', () => {
  let fixture: ComponentFixture<FavoriteAnimalsWidget>;
  let storeMock: {
    dispatch: Mock;
  };
  let navigationServiceMock: {
    navigateToFavoriteAnimalsPage: Mock<() => void>;
  };
  let animalStateQueriesMock: {
    $favoriteAnimalLoading: WritableSignal<boolean>;
    $favoriteAnimalsLoadingError: WritableSignal<string | undefined>;
    $favoriteAnimals: WritableSignal<AnimalModel[] | undefined>;
  };
  let animal: AnimalModel;

  beforeEach(async () => {
    animal = {
      id: '[ID]',
      name: '[NAME]',
      description: '[DESCRIPTION]',
      gallery: ['[IMAGE]'],
    };

    storeMock = {
      dispatch: vi.fn(),
    } satisfies Partial<Store>;

    navigationServiceMock = {
      navigateToFavoriteAnimalsPage: vi.fn(),
    } satisfies Partial<NavigationService>;

    animalStateQueriesMock = {
      $favoriteAnimalLoading: signal(false),
      $favoriteAnimalsLoadingError: signal(undefined),
      $favoriteAnimals: signal(undefined),
    } satisfies Partial<AnimalsStateQueries>;

    await TestBed.configureTestingModule({
      imports: [FavoriteAnimalsWidget],
    })
      .overrideComponent(FavoriteAnimalsWidget, {
        set: {
          imports: [],
          providers: [
            { provide: Store, useValue: storeMock },
            { provide: NavigationService, useValue: navigationServiceMock },
            { provide: AnimalsStateQueries, useValue: animalStateQueriesMock },
          ],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(FavoriteAnimalsWidget);
  });

  describe('onInit', () => {
    it('should dispatch load favorite animals action on init', () => {
      expect(storeMock.dispatch).not.toHaveBeenCalled();

      fixture.detectChanges();

      expect(storeMock.dispatch).toHaveBeenCalledWith(new LoadFavoriteAnimalsAction());
    });
  });

  describe('After onInit', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should display proper heading', () => {
      const el = fixture.debugElement.query(By.css('h1'));

      expect(el.nativeElement.textContent).toContain('@@favorite-animals-widget.title');
    });

    describe('UI States', () => {
      const spinnerEl = () => fixture.debugElement.query(By.css('mat-spinner'));
      const errorEl = () => fixture.debugElement.query(By.css('[data-test-id="loading-error"]'));
      const emptyStateEl = () => fixture.debugElement.query(By.css('[data-test-id="empty-state"]'));
      const animalCardEls = () => fixture.debugElement.queryAll(By.css('ui-animal-card'));

      it('should properly configure ui in loading state', () => {
        animalStateQueriesMock.$favoriteAnimalLoading.set(true);
        fixture.detectChanges();

        expect(spinnerEl()).toBeTruthy();
        expect(errorEl()).toBeFalsy();
        expect(emptyStateEl()).toBeFalsy();
        expect(animalCardEls().length).toBe(0);
      });

      it('should properly configure ui in error state', () => {
        animalStateQueriesMock.$favoriteAnimalsLoadingError.set('[ERROR]');
        fixture.detectChanges();

        expect(errorEl()).toBeTruthy();
        expect(errorEl().nativeElement.textContent).toContain('@@favorite-animals-widget.loading-error');

        expect(spinnerEl()).toBeFalsy();
        expect(emptyStateEl()).toBeFalsy();
        expect(animalCardEls().length).toBe(0);
      });

      it('should properly configure undefined data state', () => {
        expect(animalStateQueriesMock.$favoriteAnimals()).toBeUndefined();

        expect(emptyStateEl()).toBeTruthy();
        expect(emptyStateEl().nativeElement.textContent).toContain('@@favorite-animals-widget.empty');

        expect(spinnerEl()).toBeFalsy();
        expect(errorEl()).toBeFalsy();
        expect(animalCardEls().length).toBe(0);
      });

      it('should properly configure empty data state', () => {
        expect(animalStateQueriesMock.$favoriteAnimals()).toBeUndefined();

        expect(emptyStateEl()).toBeTruthy();
        expect(emptyStateEl().nativeElement.textContent).toContain('@@favorite-animals-widget.empty');

        expect(spinnerEl()).toBeFalsy();
        expect(errorEl()).toBeFalsy();
        expect(animalCardEls().length).toBe(0);
      });

      it('should properly configure data state', () => {
        animalStateQueriesMock.$favoriteAnimals.set([animal]);
        fixture.detectChanges();

        expect(animalCardEls()).toBeTruthy();
        expect(animalCardEls()[0].properties['name']).toBe(animal.name);
        expect(animalCardEls()[0].properties['image']).toBe(animal.gallery[0]);
        expect(animalCardEls()[0].properties['description']).toBe(animal.description);

        expect(spinnerEl()).toBeFalsy();
        expect(errorEl()).toBeFalsy();
        expect(emptyStateEl()).toBeFalsy();
      });
    });

    describe('Back Button', () => {
      it('should properly configure back button', () => {
        const el = fixture.debugElement.query(By.css('button'));

        expect(el.nativeElement.attributes['matButton'].value).toBe('elevated');
        expect(el.nativeElement.textContent).toContain('@@favorite-animals-widget.show-all');
      });

      it('should delegate to navigation service upon back button click', () => {
        const el = fixture.debugElement.query(By.css('button'));

        el.nativeElement.click();

        expect(navigationServiceMock.navigateToFavoriteAnimalsPage).toHaveBeenCalled();
      });
    });
  });
});
