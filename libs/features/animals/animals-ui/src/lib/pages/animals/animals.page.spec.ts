import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { LoadFavoriteAnimalsAction } from '@my-favorite-animals/animals-data';
import { Store } from '@ngxs/store';
import { Mock } from 'vitest';
import { AnimalsPage } from './animals.page';

describe('AnimalsPage', () => {
  let fixture: ComponentFixture<AnimalsPage>;
  let storeMock: {
    dispatch: Mock;
  };

  beforeEach(async () => {
    storeMock = {
      dispatch: vi.fn(),
    } satisfies Partial<Store>;

    await TestBed.configureTestingModule({
      imports: [AnimalsPage],
    })
      .overrideComponent(AnimalsPage, {
        set: {
          imports: [],
          providers: [{ provide: Store, useValue: storeMock }],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(AnimalsPage);
  });

  describe('onInit', () => {
    it('should dispatch load favorite animals action on init', () => {
      expect(storeMock.dispatch).not.toHaveBeenCalled();

      fixture.detectChanges();

      expect(storeMock.dispatch).toHaveBeenCalledWith(new LoadFavoriteAnimalsAction());
    });
  });

  describe('After onInit', () => {
    beforeEach(() => {
      fixture.detectChanges();
    });

    it('should display proper heading', () => {
      const el = fixture.debugElement.query(By.css('h1'));

      expect(el.nativeElement.textContent).toContain('@@animals-page.title');
    });

    it('should render animals list', () => {
      const el = fixture.debugElement.query(By.css('mfa-animals-list'));

      expect(el).toBeTruthy();
    });
  });
});
