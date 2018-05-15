import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Operational, Transaction } from 'sodiumjs';

describe('AppComponent', () => {
  let lastDisplayValue: number;
  let fixture: ComponentFixture<AppComponent>;
  let app: AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations:  [AppComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        app = fixture.debugElement.componentInstance;
        Transaction.run(() => {
          Operational
            .value(app.displayC)
            .listen(n => { lastDisplayValue = n; });
        });
      });
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should display a 0 at startup', async(() => {
    expect(lastDisplayValue).toBe(0);
  }));

  it('should display a 123 after clicking the digits 1,2,3', async(() => {
    app.clickDigit(1);
    app.clickDigit(2);
    app.clickDigit(3);
    expect(lastDisplayValue).toBe(123);
  }));

  it('should display a 12 after adding 10 and 2 and continue to add', async(() => {
    app.clickDigit(1);
    app.clickDigit(0);
    app.clickPlus();
    app.clickDigit(2);
    app.clickPlus();
    expect(lastDisplayValue).toBe(12);
  }));

  it('should display a 12 after adding 10 and 2 press compute', async(() => {
    app.clickDigit(1);
    app.clickDigit(0);
    app.clickPlus();
    app.clickDigit(2);
    app.clickCompute();
    expect(lastDisplayValue).toBe(12);
  }));

  it('should display a 15 after adding 10 and 2 and 3 ', async(() => {
    app.clickDigit(1);
    app.clickDigit(0);
    app.clickPlus();
    app.clickDigit(2);
    app.clickPlus();
    app.clickDigit(3);
    app.clickCompute();
    expect(lastDisplayValue).toBe(15);
  }));

  it('should display a 8 after subtracting 2 from 10', async(() => {
    app.clickDigit(1);
    app.clickDigit(0);
    app.clickMinus();
    app.clickDigit(2);
    app.clickCompute();
    expect(lastDisplayValue).toBe(8);
  }));

  it('should display a 12 after 10-2+4', async(() => {
    app.clickDigit(1);
    app.clickDigit(0);
    app.clickMinus();
    app.clickDigit(2);
    app.clickPlus();
    app.clickDigit(4);
    app.clickCompute();
    expect(lastDisplayValue).toBe(12);
  }));
});
