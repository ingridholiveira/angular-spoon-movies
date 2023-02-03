import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import {
  debounceTime,
  tap,
  switchMap,
  finalize,
  distinctUntilChanged,
  filter,
} from 'rxjs/operators';

const API_KEY = 'a3005072';

@Component({
  selector: 'app-search-card',
  templateUrl: './search-card.component.html',
  styleUrls: ['./search-card.component.scss'],
})
export class SearchCardComponent implements OnInit {
  searchMoviesCtrl = new FormControl();
  filteredMovies: any;
  isLoading = false;
  errorMsg!: string;
  minLengthTerm = 3;
  selectedMovie: any = '';
  @Output() onSelectValue = new EventEmitter<any>();

  constructor(private http: HttpClient) {}

  onSelected() {
    this.http
      .get(
        'http://www.omdbapi.com/?apikey=' +
          API_KEY +
          '&i=' +
          this.selectedMovie.imdbID
      )
      .subscribe((data: any) => {
        if (data == undefined || data['Error']) {
          this.errorMsg = data['Error'];
          this.selectedMovie = '';
        } else {
          this.errorMsg = '';
          this.selectedMovie = data;
        }
        this.onSelectValue.emit(this.selectedMovie);
      });
  }

  displayWith(value: any) {
    return value?.Title;
  }

  clearSelection() {
    this.selectedMovie = '';
    this.filteredMovies = [];
  }

  searchTitleSelection() {
    this.filteredMovies = [];
    this.http
      .get(
        'http://www.omdbapi.com/?apikey=' +
          API_KEY +
          '&t=' +
          this.searchMoviesCtrl.value
      )
      .subscribe((data: any) => {
        if (data == undefined || data['Error']) {
          this.errorMsg = data['Error'];
          this.selectedMovie = '';
        } else {
          this.errorMsg = '';
          this.selectedMovie = data;
        }
        this.onSelectValue.emit(this.selectedMovie);
      });
  }

  ngOnInit() {
    this.searchMoviesCtrl.valueChanges
      .pipe(
        filter((res) => {
          return res !== null && res.length >= this.minLengthTerm;
        }),
        distinctUntilChanged(),
        debounceTime(1000),
        tap(() => {
          this.errorMsg = '';
          this.filteredMovies = [];
          this.isLoading = true;
        }),
        switchMap((value) =>
          this.http
            .get('http://www.omdbapi.com/?apikey=' + API_KEY + '&s=' + value)
            .pipe(
              finalize(() => {
                this.isLoading = false;
              })
            )
        )
      )
      .subscribe((data: any) => {
        if (data['Search'] == undefined) {
          this.errorMsg = data['Error'];
          this.filteredMovies = [];
        } else {
          this.errorMsg = '';
          this.filteredMovies = data['Search'];
        }
      });
  }
}
