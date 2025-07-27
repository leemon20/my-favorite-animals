import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';
import { parse } from 'valibot';
import { AnimalModel } from '../models/animal.model';
import { AnimalsModel, AnimalsSchema } from '../models/animals.model';

@Injectable({
  providedIn: 'root',
})
export class AnimalsService {
  private readonly mockData: AnimalsModel = {
    animals: [
      {
        id: '1',
        name: 'Red Panda',
        description:
          'The red panda, also known as the lesser panda, is a small mammal native to the eastern Himalayas and southwestern China. It has reddish-brown fur, a long, shaggy tail, and a waddling gait due to its shorter front legs. It is not closely related to the giant panda.',
        gallery: ['assets/images/red-panda-1.jpg', 'assets/images/red-panda-2.jpg', 'assets/images/red-panda-3.jpg'],
      },
      {
        id: '2',
        name: 'Capybara',
        description:
          "The capybara is the world's largest rodent, native to South America. It's a highly social species and can be found in large groups near bodies of water. They are known for their calm and friendly demeanor, often allowing other animals to sit on them.",
        gallery: ['assets/images/capybara-1.jpg', 'assets/images/capybara-2.jpg', 'assets/images/capybara-3.jpg'],
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
