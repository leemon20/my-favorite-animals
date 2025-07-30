import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DashboardPage } from './dashboard.page';

describe('DashboardPage', () => {
  let fixture: ComponentFixture<DashboardPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardPage],
    })
      .overrideComponent(DashboardPage, {
        set: {
          imports: [],
          providers: [],
          schemas: [NO_ERRORS_SCHEMA],
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(DashboardPage);

    fixture.detectChanges();
  });

  it('should render favorite animals widget', () => {
    const el = fixture.debugElement.query(By.css('mfa-favorite-animals-widget'));

    expect(el).toBeTruthy();
  });

  it('should render animal of day widget', () => {
    const el = fixture.debugElement.query(By.css('mfa-animal-of-day-widget'));

    expect(el).toBeTruthy();
  });
});
