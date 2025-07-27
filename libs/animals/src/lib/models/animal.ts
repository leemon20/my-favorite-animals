import { array, InferInput, object, string } from 'valibot';

const AnimalSchema = object({
  id: string(),
  name: string(),
  description: string(),
  gallery: array(string()),
});

export type Animal = InferInput<typeof AnimalSchema>;

const AnimalsSchema = object({
  animals: array(AnimalSchema),
});

export type Animals = InferInput<typeof AnimalsSchema>;
