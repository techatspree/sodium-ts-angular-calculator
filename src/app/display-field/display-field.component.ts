import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';
import {Cell, Operational} from 'sodiumjs';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-display-field',
  templateUrl: './display-field.component.html',
  styleUrls: ['./display-field.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayFieldComponent implements OnInit {

  @Input() displayC: Cell<number>;

  private displayS = new BehaviorSubject(0);
  public display = this.displayS.asObservable();

  ngOnInit() {
    console.log('Init display field');
      Operational.updates(this.displayC).listen( num => {
        this.displayS.next(num);
      });
  }

}
