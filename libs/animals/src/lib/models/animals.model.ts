import { array, InferInput, object } from 'valibot';
import { AnimalSchema } from './animal.model';

export const AnimalsSchema = object({
  animals: array(AnimalSchema),
});

export type AnimalsModel = InferInput<typeof AnimalsSchema>;
