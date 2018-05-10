import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-display-field',
  templateUrl: './display-field.component.html',
  styleUrls: ['./display-field.component.css']
})
export class DisplayFieldComponent implements OnInit {

  display : number;

  constructor() { }

  ngOnInit() {
    this.display = 4711;
  }

}
