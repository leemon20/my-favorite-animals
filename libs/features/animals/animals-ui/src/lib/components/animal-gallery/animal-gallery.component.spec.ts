import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AnimalModel } from '@my-favorite-animals/animals-data';
import { AnimalGalleryComponent } from './animal-gallery.component';

describe('AnimalGalleryComponent', () => {
  let fixture: ComponentFixture<AnimalGalleryComponent>;
  let animal: AnimalModel;

  beforeEach(async () => {
    animal = {
      id: '[ID]',
      name: '[NAME]',
      description: '[DESCRIPTION]',
      gallery: [],
    };

    await TestBed.configureTestingModule({
      imports: [AnimalGalleryComponent],
    })
      .overrideComponent(AnimalGalleryComponent, {
        set: {
          imports: [],
          providers: [],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalGalleryComponent);

    fixture.componentRef.setInput('animal', animal);
    fixture.detectChanges();
  });

  const noImagesMessageEl = () => fixture.debugElement.query(By.css('[data-test-id="no-images"]'));
  const animalCardEls = () => fixture.debugElement.queryAll(By.css('ui-animal-card'));

  it('should display proper message when no images are available', () => {
    expect(noImagesMessageEl().nativeElement.textContent).toContain('@@animal-gallery.no-images');
    expect(animalCardEls().length).toBe(0);
  });

  it('should display images when available', () => {
    const animalWithImages = { ...animal, gallery: ['[IMAGE_1]'] };

    fixture.componentRef.setInput('animal', animalWithImages);
    fixture.detectChanges();

    expect(noImagesMessageEl()).toBeFalsy();

    expect(animalCardEls().length).toBe(1);
    expect(animalCardEls()[0].properties['name']).toBe(animalWithImages.name);
    expect(animalCardEls()[0].properties['image']).toBe(animalWithImages.gallery[0]);
    expect(animalCardEls()[0].properties['description']).toBe(animalWithImages.description);
  });
});
