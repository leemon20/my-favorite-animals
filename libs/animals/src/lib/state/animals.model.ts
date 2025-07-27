import { AnimalModel } from '../models/animal.model';

export interface AnimalsStateModel {
  animals?: AnimalModel[];
  loading: boolean;
  error?: string;
}

export const initializeAnimalsStateModel: () => AnimalsStateModel = () => ({
  animals: undefined,
  loading: false,
  error: undefined,
});
