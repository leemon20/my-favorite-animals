import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ErrorPage } from './error.page';

describe('ErrorPage', () => {
  let fixture: ComponentFixture<ErrorPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ErrorPage],
    })
      .overrideComponent(ErrorPage, {
        set: {
          imports: [],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(ErrorPage);
    fixture.detectChanges();
  });

  it('should render card', () => {
    expect(fixture.nativeElement.textContent).toBe('Page not found');
  });
});
