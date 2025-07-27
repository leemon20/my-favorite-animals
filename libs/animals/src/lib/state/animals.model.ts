import { Animals } from '../animals/animals';

export interface AnimalsStateModel {
  animals?: Animals;
  loading: boolean;
  error?: string;
}

export const initializeAnimalsStateModel: () => AnimalsStateModel = () => ({
  animals: undefined,
  loading: false,
  error: undefined,
});
