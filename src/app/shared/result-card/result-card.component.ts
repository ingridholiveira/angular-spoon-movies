import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-result-card',
  templateUrl: './result-card.component.html',
  styleUrls: ['./result-card.component.scss'],
})
export class ResultCardComponent implements OnInit {
  @Input()
  movie: any;
  review: Array<number> = [];

  constructor() {}

  ngOnInit(): void {
    const rating: number = this.movie.imdbRating;
    let i = 1;
    while (rating >= i) {
      this.review.push(i);
      i++;
    }
    console.log(this.review);
  }
}
