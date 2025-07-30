import { NO_ERRORS_SCHEMA, signal, WritableSignal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnimalModel, AnimalsStateQueries, LoadAnimalOfDayAction } from '@my-favorite-animals/animals-data';
import { Store } from '@ngxs/store';
import { Mock } from 'vitest';
import { AnimalOfDayWidget } from './animal-of-day.widget';

describe('AnimalOfDayWidget', () => {
  let fixture: ComponentFixture<AnimalOfDayWidget>;
  let storeMock: {
    dispatch: Mock;
  };
  let animalStateQueriesMock: {
    $animalOfDayLoading: WritableSignal<boolean>;
    $animalOfDayLoadingError: WritableSignal<string | undefined>;
    $animalOfDay: WritableSignal<AnimalModel | undefined>;
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

    animalStateQueriesMock = {
      $animalOfDayLoading: signal(false),
      $animalOfDayLoadingError: signal(undefined),
      $animalOfDay: signal(undefined),
    } satisfies Partial<AnimalsStateQueries>;

    await TestBed.configureTestingModule({
      imports: [AnimalOfDayWidget],
    })
      .overrideComponent(AnimalOfDayWidget, {
        set: {
          imports: [],
          providers: [
            { provide: Store, useValue: storeMock },
            { provide: AnimalsStateQueries, useValue: animalStateQueriesMock },
          ],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalOfDayWidget);
  });

  describe('onInit', () => {
    it('should dispatch load animal of day action on init', () => {
      expect(storeMock.dispatch).not.toHaveBeenCalled();

      fixture.detectChanges();

      expect(storeMock.dispatch).toHaveBeenCalledWith(new LoadAnimalOfDayAction());
    });
  });

  describe('After onInit', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should display proper heading', () => {
      const el = fixture.debugElement.query(By.css('h1'));

      expect(el.nativeElement.textContent).toContain('@@animals-of-day-widget.title');
    });

    describe('UI States', () => {
      const spinnerEl = () => fixture.debugElement.query(By.css('mat-spinner'));
      const errorEl = () => fixture.debugElement.query(By.css('[data-test-id="loading-error"]'));
      const emptyStateEl = () => fixture.debugElement.query(By.css('[data-test-id="empty-state"]'));
      const animalGalleryEl = () => fixture.debugElement.query(By.css('ui-animal-card'));

      it('should properly configure ui in loading state', () => {
        animalStateQueriesMock.$animalOfDayLoading.set(true);
        fixture.detectChanges();

        expect(spinnerEl()).toBeTruthy();
        expect(errorEl()).toBeFalsy();
        expect(emptyStateEl()).toBeFalsy();
        expect(animalGalleryEl()).toBeFalsy();
      });

      it('should properly configure ui in error state', () => {
        animalStateQueriesMock.$animalOfDayLoadingError.set('[ERROR]');
        fixture.detectChanges();

        expect(errorEl()).toBeTruthy();
        expect(errorEl().nativeElement.textContent).toContain('@@animals-of-day-widget.loading-error');

        expect(spinnerEl()).toBeFalsy();
        expect(emptyStateEl()).toBeFalsy();
        expect(animalGalleryEl()).toBeFalsy();
      });

      it('should properly configure no data state', () => {
        animalStateQueriesMock.$animalOfDay.set(undefined);
        fixture.detectChanges();

        expect(emptyStateEl()).toBeTruthy();
        expect(emptyStateEl().nativeElement.textContent).toContain('@@animals-of-day-widget.empty');

        expect(spinnerEl()).toBeFalsy();
        expect(errorEl()).toBeFalsy();
        expect(animalGalleryEl()).toBeFalsy();
      });

      it('should properly configure data state', () => {
        animalStateQueriesMock.$animalOfDay.set(animal);
        fixture.detectChanges();

        expect(animalGalleryEl()).toBeTruthy();
        expect(animalGalleryEl().properties['name']).toBe(animal.name);
        expect(animalGalleryEl().properties['image']).toBe(animal.gallery[0]);
        expect(animalGalleryEl().properties['description']).toBe(animal.description);

        expect(spinnerEl()).toBeFalsy();
        expect(errorEl()).toBeFalsy();
        expect(emptyStateEl()).toBeFalsy();
      });
    });
  });
});
