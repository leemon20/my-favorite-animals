import { NO_ERRORS_SCHEMA, signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnimalModel, AnimalsStateQueries } from '@my-favorite-animals/animals-data';
import { AnimalsListComponent } from './animals-list.component';

describe('AnimalsListComponent', () => {
  let fixture: ComponentFixture<AnimalsListComponent>;

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
      gallery: [],
    };

    animalStateQueriesMock = {
      $favoriteAnimalLoading: signal(false),
      $favoriteAnimalsLoadingError: signal(undefined),
      $favoriteAnimals: signal(undefined),
    } satisfies Partial<AnimalsStateQueries>;

    await TestBed.configureTestingModule({
      imports: [AnimalsListComponent],
    })
      .overrideComponent(AnimalsListComponent, {
        set: {
          imports: [],
          providers: [{ provide: AnimalsStateQueries, useValue: animalStateQueriesMock }],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalsListComponent);

    fixture.detectChanges();
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
