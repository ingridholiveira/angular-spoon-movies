import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  movieSelected: any;

  constructor() {}

  ngOnInit(): void {}

  selectValue(newValue: any) {
    this.movieSelected = newValue;
  }
}
