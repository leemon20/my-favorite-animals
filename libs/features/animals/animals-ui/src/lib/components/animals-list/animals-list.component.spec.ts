import { NO_ERRORS_SCHEMA, signal, Signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnimalModel, AnimalsStateQueries, NavigationService } from '@my-favorite-animals/animals-data';
import { Mock } from 'vitest';
import { AnimalsListComponent } from './animals-list.component';

vi.stubGlobal('$localize', (messageParts: TemplateStringsArray) => messageParts.raw.join('').split(':')[1]);

type MutableMock<T> = {
  [K in keyof T]: T[K] extends Signal<infer R> ? WritableSignal<R> : T[K] extends Mock ? T[K] & Mock<T[K]> : T[K];
};

describe('AnimalsListComponent', () => {
  let fixture: ComponentFixture<AnimalsListComponent>;
  let navigationServiceMock: {
    goBack: Mock<() => void>;
  };
  let animalStateQueriesMock: MutableMock<AnimalsStateQueries>;
  let animal: AnimalModel;

  beforeEach(async () => {
    animal = {
      id: '[ID]',
      name: '[NAME]',
      description: '[DESCRIPTION]',
      gallery: [],
    };

    navigationServiceMock = {
      goBack: vi.fn(),
    } satisfies Partial<NavigationService>;

    animalStateQueriesMock = {
      $favoriteAnimalLoading: signal(false),
      $favoriteAnimalsLoadingError: signal(undefined),
      $favoriteAnimals: signal(undefined),
    } as MutableMock<AnimalsStateQueries>;

    await TestBed.configureTestingModule({
      imports: [AnimalsListComponent],
    })
      .overrideComponent(AnimalsListComponent, {
        set: {
          imports: [],
          providers: [
            { provide: NavigationService, useValue: navigationServiceMock },
            { provide: AnimalsStateQueries, useValue: animalStateQueriesMock },
          ],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalsListComponent);

    fixture.detectChanges();
  });

  describe('Back Button', () => {
    it('should properly configure back button', () => {
      const el = fixture.debugElement.query(By.css('button'));

      expect(el.nativeElement.hasAttribute('matButton')).toBe(true);
      expect(el.nativeElement.textContent).toContain('@@animals-list.back');
    });

    it('should delegate to navigation service upon back button click', () => {
      const el = fixture.debugElement.query(By.css('button'));

      el.nativeElement.click();

      expect(navigationServiceMock.goBack).toHaveBeenCalled();
    });
  });

  describe('UI States', () => {
    const spinnerEl = () => fixture.debugElement.query(By.css('mat-spinner'));
    const errorEl = () => fixture.debugElement.query(By.css('[data-test-id="loading-error"]'));
    const emptyStateEl = () => fixture.debugElement.query(By.css('[data-test-id="empty-state"]'));
    const animalGalleryEls = () => fixture.debugElement.queryAll(By.css('mfa-animal-gallery'));

    it('should properly configure ui in loading state', () => {
      animalStateQueriesMock.$favoriteAnimalLoading.set(true);
      fixture.detectChanges();

      expect(spinnerEl()).toBeTruthy();
      expect(errorEl()).toBeFalsy();
      expect(emptyStateEl()).toBeFalsy();
      expect(animalGalleryEls().length).toBe(0);
    });

    it('should properly configure ui in error state', () => {
      animalStateQueriesMock.$favoriteAnimalsLoadingError.set('[ERROR]');
      fixture.detectChanges();

      expect(errorEl()).toBeTruthy();
      expect(errorEl().nativeElement.textContent).toContain('@@animals-list.loading-error');

      expect(spinnerEl()).toBeFalsy();
      expect(emptyStateEl()).toBeFalsy();
      expect(animalGalleryEls().length).toBe(0);
    });

    it('should properly configure no data state', () => {
      animalStateQueriesMock.$favoriteAnimals.set([]);
      fixture.detectChanges();

      expect(emptyStateEl()).toBeTruthy();
      expect(emptyStateEl().nativeElement.textContent).toContain('@@animals-list.empty');

      expect(spinnerEl()).toBeFalsy();
      expect(errorEl()).toBeFalsy();
      expect(animalGalleryEls().length).toBe(0);
    });

    it('should properly configure data state', () => {
      animalStateQueriesMock.$favoriteAnimals.set([animal]);
      fixture.detectChanges();

      expect(animalGalleryEls().length).toBe(1);
      expect(animalGalleryEls()[0].properties['animal']).toEqual(animal);

      expect(spinnerEl()).toBeFalsy();
      expect(errorEl()).toBeFalsy();
      expect(emptyStateEl()).toBeFalsy();
    });
  });
});
