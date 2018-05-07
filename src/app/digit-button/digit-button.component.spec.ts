import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DigitButtonComponent } from './digit-button.component';

describe('DigitButtonComponent', () => {
  let component: DigitButtonComponent;
  let fixture: ComponentFixture<DigitButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DigitButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DigitButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
