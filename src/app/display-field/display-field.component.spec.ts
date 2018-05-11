import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFieldComponent } from './display-field.component';
import { StreamSink } from 'sodiumjs';

describe('DisplayFieldComponent', () => {
  let component: DisplayFieldComponent;
  let fixture: ComponentFixture<DisplayFieldComponent>;
  let testDisplayS : StreamSink<number>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayFieldComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayFieldComponent);
    component = fixture.componentInstance;

    testDisplayS = new StreamSink<number>();
    const testDisplayC = testDisplayS.hold(0);
    component.displayC = testDisplayC;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
