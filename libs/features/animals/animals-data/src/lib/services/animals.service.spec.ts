import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AnimalsService } from './animals.service';

describe('AnimalsService', () => {
  let service: AnimalsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.inject(AnimalsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a list of animals', fakeAsync(() => {
    service.getAnimals().subscribe((animals) => {
      expect(animals.length).toBe(2);

      expect(animals[0].name).toBe('Red Panda');
      expect(animals[0].gallery.length).toBe(3);

      expect(animals[1].name).toBe('Racoon');
      expect(animals[1].gallery.length).toBe(3);
    });

    tick(1000);
  }));

  it('should return animals of the day', fakeAsync(() => {
    service.getAnimalOfDay().subscribe((animal) => {
      expect(animal).toBeTruthy();
    });

    tick(1000);
  }));
});
