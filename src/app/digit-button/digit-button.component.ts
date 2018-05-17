import {Component, Input, OnInit, Output} from '@angular/core';
import {StreamSink, Unit, Stream } from 'sodiumjs';

@Component({
  selector: 'app-digit-button',
  templateUrl: './digit-button.component.html',
  styleUrls: ['./digit-button.component.css']
})
export class DigitButtonComponent implements OnInit {

  @Input() digit: number;

  private streamSink : StreamSink<number> = new StreamSink<number>();
  get stream() : Stream<number> {
    return this.streamSink;
  }

  ngOnInit() {}

  onClick() {
    this.streamSink.send(this.digit);
  }
}
