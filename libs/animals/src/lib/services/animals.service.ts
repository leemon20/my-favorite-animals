import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { parse } from 'valibot';
import { AnimalModel } from '../models/animal.model';
import { AnimalsModel, AnimalsSchema } from '../models/animals.model';

@Injectable({ providedIn: 'root' })
export class AnimalsService {
  private readonly mockData: AnimalsModel = {
    animals: [
      {
        id: '1',
        name: 'Red Panda',
        description:
          'The red panda, also known as the lesser panda, is a small mammal native to the eastern Himalayas and southwestern China. It has reddish-brown fur, a long, shaggy tail, and a waddling gait due to its shorter front legs. It is not closely related to the giant panda.',
        gallery: [
          'assets/images/animals/red-panda/1.jpeg',
          'assets/images/animals/red-panda/2.jpeg',
          'assets/images/animals/red-panda/3.jpeg',
        ],
      },
      {
        id: '2',
        name: 'Racoon',
        description:
          'The raccoon is a medium-sized mammal native to North America. It is easily recognized by its black mask of fur around its eyes and its bushy tail with black rings. Raccoons are known for their intelligence and dexterity, often using their front paws to manipulate objects.',
        gallery: [
          'assets/images/animals/racoon/1.jpeg',
          'assets/images/animals/racoon/2.jpeg',
          'assets/images/animals/racoon/3.jpeg',
        ],
      },
    ],
  };

  getAnimals(): Observable<AnimalModel[]> {
    let result: AnimalModel[] = [];

    try {
      result = parse(AnimalsSchema, this.mockData).animals;
    } catch (error) {
      console.error('Validation error:', error);

      return of([]);
    }

    return of(result).pipe(delay(1000));
  }
}
