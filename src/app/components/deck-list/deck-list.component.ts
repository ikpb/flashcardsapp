import { Component, OnInit, PipeTransform } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Deck } from '../../models/Deck';
import { DeckService } from '../../services/deck.service';

import { Router } from '@angular/router';






@Component({
  selector: 'app-deck-list',
  templateUrl: './deck-list.component.html',
  styleUrls: ['./deck-list.component.css'],
  providers: [DecimalPipe]
})
export class DeckListComponent implements OnInit {
decks: Deck[];
  constructor(
    private pipe: DecimalPipe,
    private deckService: DeckService,
    private router: Router
    ) {
    this.decks$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text, pipe))
    );
  }

  ngOnInit(): void {
    this.deckService.getDecks().subscribe(deck=>{
      this.decks = deck;

      console.log(this.decks);

      // setTimeout(() => {
      //   this.decks$.subscribe(num => this.decks=num)
      // }, 2000);
      
    });

  }
  decks$: Observable<Deck[]>;
  filter = new FormControl('');

  search(text: string, pipe: PipeTransform): Deck[] {
    return this.decks.filter(decks => {
      const term = text.toLowerCase();
      return decks.deckname.toLowerCase().includes(term);
    });
  }
  openDeck(deck:Deck){
    console.log(deck);
    this.router.navigate(['/decklist',deck.deckname]);
  }

}
