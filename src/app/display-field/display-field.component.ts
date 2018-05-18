import {ChangeDetectionStrategy, Component, Input, AfterViewInit} from '@angular/core';
import {Cell, Operational} from 'sodiumjs';
import {BehaviorSubject, Observable} from 'rxjs';

@Component({
  selector: 'app-display-field',
  templateUrl: './display-field.component.html',
  styleUrls: ['./display-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayFieldComponent {

  private behaviorSubject = new BehaviorSubject(0);
  display = this.behaviorSubject.asObservable();

  set displayC(cell: Cell<number>) {
    Operational.updates(cell).listen( num => {
      this.behaviorSubject.next(num);
    });
  }
}
