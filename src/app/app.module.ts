import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';

import { ResultCardComponent } from './result-card/result-card.component';
import { CustomModalComponent } from './custom-modal/custom-modal.component';
import { SearchCardComponent } from './search-card/search-card.component';
import { TopbarComponent } from './topbar/topbar.component';
import { FootbarComponent } from './footbar/footbar.component';
import { FavlistComponent } from './favlist/favlist.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,

    ResultCardComponent,
    CustomModalComponent,
    SearchCardComponent,
    TopbarComponent,
    FootbarComponent,
    FavlistComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
