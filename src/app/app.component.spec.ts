import { async, TestBed, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Operational, Transaction } from 'sodiumjs';

describe('AppComponent', () => {
  let lastDisplayValue : number;
  let fixture : ComponentFixture<AppComponent>;
  let app : AppComponent;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations:  [AppComponent ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents()
      .then(() =>{
        fixture = TestBed.createComponent(AppComponent);
        fixture.detectChanges();
        app = fixture.debugElement.componentInstance;
        Transaction.run(() => {
          Operational
            .value(app.displayC)
            .listen(n => {lastDisplayValue = n;})
        })
      });
  }));

  it('should create the app', async(() => {
    expect(app).toBeTruthy();
  }));

  it('should display a 0 at startup', async(() => {
    expect(lastDisplayValue).toBe(0);
  }));
});
