import {Component, Input, OnInit} from '@angular/core';
import {Unit, Stream, StreamSink} from 'sodiumjs';

@Component({
  selector: 'app-digit-button',
  templateUrl: './digit-button.component.html',
  styleUrls: ['./digit-button.component.css']
})
export class DigitButtonComponent implements OnInit {

  private sClickedSink: StreamSink<Unit>;

  public sClicked: Stream<number>;

  @Input() digit : number;

  constructor() { }

  ngOnInit() {
    console.log("Init "+this.digit);
    this.sClickedSink = new StreamSink<Unit>();
    this.sClicked = this.sClickedSink.map( u =>  this.digit );
  }

  onClick() {
    this.sClickedSink.send(Unit.UNIT);
    console.log("CLICK - "+ this.digit);
  }
}
