import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { provideStore, Store } from '@ngxs/store';
import { Observable, of, Subject, throwError } from 'rxjs';
import { Mock, MockInstance } from 'vitest';
import { AnimalModel } from '../models';
import { AnimalsService } from '../services';
import { favoriteAnimals } from '../services/mock.data';
import {
  LoadAnimalOfDayAction,
  LoadAnimalOfDayErrorAction,
  LoadAnimalOfDaySuccessAction,
  LoadFavoriteAnimalsAction,
  LoadFavoriteAnimalsErrorAction,
  LoadFavoriteAnimalsSuccessAction,
} from './animals.actions';
import { initializeAnimalsStateModel } from './animals.model';
import { ANIMALS_STATE_TOKEN, AnimalsState } from './animals.state';

describe('AnimalsState', () => {
  let service: AnimalsState;
  let store: Store;

  let animalsServiceMock: {
    getAnimals: Mock<() => Observable<AnimalModel[]>>;
    getAnimalOfDay: Mock<() => Observable<AnimalModel | null>>;
  };

  beforeEach(() => {
    animalsServiceMock = {
      getAnimals: vi.fn(),
      getAnimalOfDay: vi.fn(),
    } satisfies Partial<AnimalsService>;

    TestBed.configureTestingModule({
      providers: [provideStore([AnimalsState]), { provide: AnimalsService, useValue: animalsServiceMock }],
    });

    service = TestBed.inject(AnimalsState);
    store = TestBed.inject(Store);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('LoadFavoriteAnimalsAction', () => {
    let ctxDispatchSpy: MockInstance<() => Observable<void>>;

    beforeEach(() => {
      const originalAction = service.loadFavoriteAnimals.bind(service);

      service.loadFavoriteAnimals = (ctx) => {
        ctxDispatchSpy = vi.spyOn(ctx, 'dispatch').mockReturnValue(of());

        return originalAction(ctx);
      };
    });

    it('should patch state and use service to load favorite animals', () => {
      animalsServiceMock.getAnimals.mockReturnValue(new Subject());

      store.dispatch(new LoadFavoriteAnimalsAction());

      expect(animalsServiceMock.getAnimals).toHaveBeenCalled();
      expect(ctxDispatchSpy).not.toHaveBeenCalled();

      const state = store.selectSnapshot(ANIMALS_STATE_TOKEN);

      expect(state.favoriteAnimalsLoading).toBe(true);
      expect(state.favoriteAnimals).toBeUndefined();
      expect(state.favoriteAnimalsLoadingError).toBeUndefined();
    });

    it('should skip load favorite animals when already loading', () => {
      animalsServiceMock.getAnimals.mockReturnValue(new Subject());

      const state = {
        ...initializeAnimalsStateModel(),
        favoriteAnimalsLoading: true,
      };

      store.reset({
        [ANIMALS_STATE_TOKEN.getName()]: state,
      });

      store.dispatch(new LoadFavoriteAnimalsAction());

      expect(animalsServiceMock.getAnimals).not.toHaveBeenCalled();
      expect(ctxDispatchSpy).not.toHaveBeenCalled();
      expect(store.selectSnapshot(ANIMALS_STATE_TOKEN)).toEqual(state);
    });

    it('should skip load favorite animals when animals already loaded', () => {
      animalsServiceMock.getAnimals.mockReturnValue(new Subject());

      const state = {
        ...initializeAnimalsStateModel(),
        favoriteAnimals: [],
      };

      store.reset({
        [ANIMALS_STATE_TOKEN.getName()]: state,
      });

      store.dispatch(new LoadFavoriteAnimalsAction());

      expect(animalsServiceMock.getAnimals).not.toHaveBeenCalled();
      expect(ctxDispatchSpy).not.toHaveBeenCalled();
      expect(store.selectSnapshot(ANIMALS_STATE_TOKEN)).toEqual(state);
    });

    it('should dispatch load animals success action upon service success', () => {
      const response = [favoriteAnimals.animals[0]];

      animalsServiceMock.getAnimals.mockReturnValue(of(response));

      store.dispatch(new LoadFavoriteAnimalsAction());

      expect(animalsServiceMock.getAnimals).toHaveBeenCalled();
      expect(ctxDispatchSpy).toHaveBeenCalledWith(new LoadFavoriteAnimalsSuccessAction(response));
    });

    it('should dispatch load animals error action upon service error', () => {
      const response = new HttpErrorResponse({});

      animalsServiceMock.getAnimals.mockReturnValue(throwError(() => response));

      store.dispatch(new LoadFavoriteAnimalsAction());

      expect(animalsServiceMock.getAnimals).toHaveBeenCalled();
      expect(ctxDispatchSpy).toHaveBeenCalledWith(new LoadFavoriteAnimalsErrorAction(response));
    });
  });

  describe('LoadFavoriteAnimalsSuccessAction', () => {
    it('should patch state with favorite animals upon success', () => {
      const payload = [favoriteAnimals.animals[0]];

      store.dispatch(new LoadFavoriteAnimalsSuccessAction(payload));

      const state = store.selectSnapshot(ANIMALS_STATE_TOKEN);

      expect(state.favoriteAnimals).toEqual(payload);
      expect(state.favoriteAnimalsLoading).toBe(false);
      expect(state.favoriteAnimalsLoadingError).toBeUndefined();
    });
  });

  describe('LoadFavoriteAnimalsErrorAction', () => {
    it('should patch state with default error message when response does not contain any', () => {
      const payload = new HttpErrorResponse({});

      store.dispatch(new LoadFavoriteAnimalsErrorAction(payload));

      const state = store.selectSnapshot(ANIMALS_STATE_TOKEN);

      expect(state.favoriteAnimals).toEqual(undefined);
      expect(state.favoriteAnimalsLoading).toBe(false);
      expect(state.favoriteAnimalsLoadingError).toEqual('Failed to load favorite animals');
    });

    it('should patch state with error message contained in response', () => {
      const payload = new HttpErrorResponse({ error: { message: '[ERROR_MESSAGE]' } });

      store.dispatch(new LoadFavoriteAnimalsErrorAction(payload));

      const state = store.selectSnapshot(ANIMALS_STATE_TOKEN);

      expect(state.favoriteAnimals).toEqual(undefined);
      expect(state.favoriteAnimalsLoading).toBe(false);
      expect(state.favoriteAnimalsLoadingError).toEqual('[ERROR_MESSAGE]');
    });
  });

  describe('LoadAnimalOfDayAction', () => {
    let ctxDispatchSpy: MockInstance<() => Observable<void>>;

    beforeEach(() => {
      const originalAction = service.loadAnimalOfDay.bind(service);

      service.loadAnimalOfDay = (ctx) => {
        ctxDispatchSpy = vi.spyOn(ctx, 'dispatch').mockReturnValue(of());

        return originalAction(ctx);
      };
    });

    it('should patch state and use service to load animal of the day', () => {
      animalsServiceMock.getAnimalOfDay.mockReturnValue(new Subject());

      store.dispatch(new LoadAnimalOfDayAction());

      expect(animalsServiceMock.getAnimalOfDay).toHaveBeenCalled();
      expect(ctxDispatchSpy).not.toHaveBeenCalled();

      const state = store.selectSnapshot(ANIMALS_STATE_TOKEN);

      expect(state.animalOfDay).toBeUndefined();
      expect(state.animalOfDayLoading).toBe(true);
      expect(state.animalOfDayLoadingError).toBeUndefined();
    });

    it('should dispatch load animal of day success action upon service success', () => {
      const response = favoriteAnimals.animals[0];

      animalsServiceMock.getAnimalOfDay.mockReturnValue(of(response));

      store.dispatch(new LoadAnimalOfDayAction());

      expect(animalsServiceMock.getAnimalOfDay).toHaveBeenCalled();
      expect(ctxDispatchSpy).toHaveBeenCalledWith(new LoadAnimalOfDaySuccessAction(response));
    });

    it('should dispatch load animal of day error action upon service error', () => {
      const response = new HttpErrorResponse({});

      animalsServiceMock.getAnimalOfDay.mockReturnValue(throwError(() => response));

      store.dispatch(new LoadAnimalOfDayAction());

      expect(animalsServiceMock.getAnimalOfDay).toHaveBeenCalled();
      expect(ctxDispatchSpy).toHaveBeenCalledWith(new LoadAnimalOfDayErrorAction(response));
    });
  });

  describe('LoadAnimalOfDaySuccessAction', () => {
    it('should patch state with animal of the day upon success', () => {
      const payload = favoriteAnimals.animals[0];

      store.dispatch(new LoadAnimalOfDaySuccessAction(payload));

      const state = store.selectSnapshot(ANIMALS_STATE_TOKEN);

      expect(state.animalOfDay).toEqual(payload);
      expect(state.animalOfDayLoading).toBe(false);
      expect(state.animalOfDayLoadingError).toBeUndefined();
    });

    it('should patch state with undefined when no animals was returned', () => {
      const payload = null;

      store.dispatch(new LoadAnimalOfDaySuccessAction(payload));

      const state = store.selectSnapshot(ANIMALS_STATE_TOKEN);

      expect(state.animalOfDay).toBeUndefined();
      expect(state.animalOfDayLoading).toBe(false);
      expect(state.animalOfDayLoadingError).toBeUndefined();
    });
  });

  describe('LoadAnimalOfDayErrorAction', () => {
    it('should patch state with default error message when response does not contain any', () => {
      const payload = new HttpErrorResponse({});

      store.dispatch(new LoadAnimalOfDayErrorAction(payload));

      const state = store.selectSnapshot(ANIMALS_STATE_TOKEN);

      expect(state.animalOfDay).toEqual(undefined);
      expect(state.animalOfDayLoading).toBe(false);
      expect(state.animalOfDayLoadingError).toEqual('Failed to load animal of the day');
    });

    it('should patch state with error message contained in response', () => {
      const payload = new HttpErrorResponse({ error: { message: '[ERROR_MESSAGE]' } });

      store.dispatch(new LoadAnimalOfDayErrorAction(payload));

      const state = store.selectSnapshot(ANIMALS_STATE_TOKEN);

      expect(state.animalOfDay).toEqual(undefined);
      expect(state.animalOfDayLoading).toBe(false);
      expect(state.animalOfDayLoadingError).toEqual('[ERROR_MESSAGE]');
    });
  });
});
