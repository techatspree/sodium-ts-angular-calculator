import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-digit-button',
  templateUrl: './digit-button.component.html',
  styleUrls: ['./digit-button.component.css']
})
export class DigitButtonComponent implements OnInit {

  @Input() digit : number;

  constructor() { }

  ngOnInit() {
  }

}
