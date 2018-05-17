import {Component, Input, OnInit, Output} from '@angular/core';
import {StreamSink, Unit, Stream } from 'sodiumjs';

@Component({
  selector: 'app-digit-button',
  templateUrl: './digit-button.component.html',
  styleUrls: ['./digit-button.component.css']
})
export class DigitButtonComponent implements OnInit {

  @Input() digit: number;
  @Input() clickF: (dig: number) => void;

  private streamSink : StreamSink<Unit> = new StreamSink<Unit>();
  stream : Stream<Unit> = this.streamSink;

  public clickOutput = "CLICK";

  constructor() {
  }

  ngOnInit() {
  }

  onClick() {
    this.clickF(this.digit);
    this.streamSink.send(Unit.UNIT);
  }
}
