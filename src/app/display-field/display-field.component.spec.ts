import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DisplayFieldComponent} from './display-field.component';
import {Operational, StreamSink, Transaction} from 'sodiumjs';

describe('DisplayFieldComponent', () => {
  let component: DisplayFieldComponent;
  let fixture: ComponentFixture<DisplayFieldComponent>;
  let testDisplayS: StreamSink<number>;
  let lastDisplayValue: number;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayFieldComponent]
    }).compileComponents()
      .then(() => {
        fixture = TestBed.createComponent(DisplayFieldComponent);
        component = fixture.componentInstance;

        Transaction.run(() => {
          testDisplayS = new StreamSink<number>();
          const testDisplayC = testDisplayS.hold(0);
          component.displayC = testDisplayC;
          Operational.value(testDisplayC).listen(n => {
            lastDisplayValue = n;
          });
        });

        fixture.detectChanges();
      });
  }));

  it('should create', async(() => {
    expect(component).toBeTruthy();
  }));

  it('should show changes of display cell in the text field', async(() => {
    const newDisplay = 4711;
    testDisplayS.send(newDisplay);

    expect(lastDisplayValue).toBe(newDisplay);
    fixture.detectChanges();

    const displayField = fixture.debugElement.nativeElement.querySelector('#displayFieldId');
    expect(displayField.value).toBe('' + newDisplay);
  }));

});
