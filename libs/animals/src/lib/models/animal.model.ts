import { array, InferInput, object, string } from 'valibot';

export const AnimalSchema = object({
  id: string(),
  name: string(),
  description: string(),
  gallery: array(string()),
});

export type AnimalModel = InferInput<typeof AnimalSchema>;
