import { signal, Signal, WritableSignal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { favoriteAnimals } from '../services/mock.data';
import { AnimalsStateModel, initializeAnimalsStateModel } from './animals.model';
import { AnimalsStateQueries } from './animals.queries';

describe('AnimalstateQueries', () => {
  let service: AnimalsStateQueries;
  let $state: WritableSignal<AnimalsStateModel>;

  beforeEach(() => {
    $state = signal(initializeAnimalsStateModel());

    const storeMock = {
      selectSignal: <T>(): Signal<T> => $state as unknown as Signal<T>,
    } satisfies Partial<Store>;

    TestBed.configureTestingModule({ providers: [{ provide: Store, useValue: storeMock }] });

    service = TestBed.inject(AnimalsStateQueries);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should select favoriteAnimalLoading', () => {
    expect(service.$favoriteAnimalLoading()).toBe(false);

    $state.set({ ...$state(), favoriteAnimalsLoading: true });

    expect(service.$favoriteAnimalLoading()).toBe(true);
  });

  it('should select favoriteAnimalsLoadingError', () => {
    expect(service.$favoriteAnimalsLoadingError()).toBeUndefined();

    $state.set({ ...$state(), favoriteAnimalsLoadingError: '[ERROR]' });

    expect(service.$favoriteAnimalsLoadingError()).toBe('[ERROR]');
  });

  it('should select favoriteAnimals', () => {
    expect(service.$favoriteAnimals()).toBeUndefined();

    const animals = [favoriteAnimals.animals[0]];

    $state.set({ ...$state(), favoriteAnimals: animals });

    expect(service.$favoriteAnimals()).toEqual(animals);
  });

  it('should select animalOfDayLoading', () => {
    expect(service.$animalOfDayLoading()).toBe(false);

    $state.set({ ...$state(), animalOfDayLoading: true });

    expect(service.$animalOfDayLoading()).toBe(true);
  });

  it('should select animalOfDayLoadingError', () => {
    expect(service.$animalOfDayLoadingError()).toBeUndefined();

    $state.set({ ...$state(), animalOfDayLoadingError: '[ERROR]' });

    expect(service.$animalOfDayLoadingError()).toBe('[ERROR]');
  });

  it('should select animalOfDay', () => {
    expect(service.$animalOfDay()).toBeUndefined();

    const animal = favoriteAnimals.animals[0];

    $state.set({ ...$state(), animalOfDay: animal });

    expect(service.$animalOfDay()).toEqual(animal);
  });
});
