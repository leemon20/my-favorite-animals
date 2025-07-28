import { AnimalModel } from '../models/animal.model';

export interface AnimalsStateModel {
  favoriteAnimals?: AnimalModel[];
  favoriteAnimalsLoading: boolean;
  favoriteAnimalsLoadingError?: string;
  animalOfDay?: AnimalModel;
  animalOfDayLoading: boolean;
  animalOfDayLoadingError?: string;
}

export const initializeAnimalsStateModel: () => AnimalsStateModel = () => ({
  favoriteAnimals: undefined,
  favoriteAnimalsLoading: false,
  favoriteAnimalsLoadingError: undefined,
  animalOfDay: undefined,
  animalOfDayLoading: false,
  animalOfDayLoadingError: undefined,
});
