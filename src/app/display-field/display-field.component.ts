import {Component, Input, OnInit} from '@angular/core';
import {Cell, Operational, Transaction} from 'sodiumjs';

@Component({
  selector: 'app-display-field',
  templateUrl: './display-field.component.html',
  styleUrls: ['./display-field.component.css']
})
export class DisplayFieldComponent implements OnInit {

  @Input() displayC : Cell<number>;

  display : number;

  constructor() { }

  ngOnInit() {
    console.log("Init display field");
    Transaction.run(() => {
      Operational
        .value(this.displayC)
        .listen( num => { this.display = num; })
    })

  }

}
