import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { parse } from 'valibot';
import { AnimalModel } from '../models/animal.model';
import { AnimalsSchema } from '../models/animals.model';
import { animalOfDay, favoriteAnimals } from './mock.data';

@Injectable({ providedIn: 'root' })
export class AnimalsService {
  getAnimals(): Observable<AnimalModel[]> {
    let result: AnimalModel[] = [];

    try {
      result = parse(AnimalsSchema, favoriteAnimals).animals;
    } catch (error) {
      console.error('Validation error:', error);

      return of([]);
    }

    return of(result).pipe(delay(1000));
  }

  getAnimalOfDay(): Observable<AnimalModel | null> {
    let result: AnimalModel | null = null;

    try {
      const animals = parse(AnimalsSchema, animalOfDay).animals;

      result = animals[Math.floor(Math.random() * animals.length)];
    } catch (error) {
      console.error('Validation error:', error);

      return of(null);
    }

    return of(result).pipe(delay(1000));
  }
}
