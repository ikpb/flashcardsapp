import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FlashcardComponent } from './components/flashcard/flashcard.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DeckListComponent } from './components/deck-list/deck-list.component';
import { LogOutButtonComponent } from './components/log-out-button/log-out-button.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DeckService } from './services/deck.service';
import { CardService } from './services/card.service';


@NgModule({
  declarations: [
    AppComponent,
    FlashcardComponent,
    NotFoundComponent,
    LoginComponent,
    DeckListComponent,
    LogOutButtonComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    HttpClientModule,

    
  ],
  providers: [DeckService,CardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
