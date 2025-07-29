import { CommonModule } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { PLACEHOLDER_IMAGE } from '../../placeholder-image';
import { AnimalCardComponent } from './animal-card.component';

describe('AnimalCardComponent', () => {
  let fixture: ComponentFixture<AnimalCardComponent>;

  const name = '[NAME]';
  const image = '[IMAGE_URL]';
  const description = '[DESCRIPTION]';

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnimalCardComponent],
    })
      .overrideComponent(AnimalCardComponent, {
        set: {
          imports: [CommonModule],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalCardComponent);

    fixture.componentRef.setInput('name', name);
    fixture.componentRef.setInput('image', image);
    fixture.componentRef.setInput('description', description);
    fixture.detectChanges();
  });

  it('should render card', () => {
    const el = fixture.debugElement.query(By.css('mat-card'));
    expect(el).toBeTruthy();

    const imgEl = el.query(By.css('img'));
    expect(imgEl).toBeTruthy();
    expect(imgEl.properties['ngSrc']).toBe(image);
    expect(imgEl.nativeElement.attributes['alt'].value).toBe(name);
    expect(imgEl.nativeElement.attributes['width'].value).toBe('400');
    expect(imgEl.nativeElement.attributes['height'].value).toBe('200');
    expect(imgEl.properties['placeholder']).toBe(PLACEHOLDER_IMAGE);

    const contentEl = el.query(By.css('mat-card-content'));
    expect(contentEl).toBeTruthy();
    expect(contentEl.nativeElement.textContent).toBe(description);
  });
});
