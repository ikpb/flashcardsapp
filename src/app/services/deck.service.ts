import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Deck } from '../models/Deck';
import { Card } from '../models/Card';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}
@Injectable({
  providedIn: 'root'
})
export class DeckService {
  DecksUrl: string = 'http://localhost:8080/deck';
  singleDeckUrl: string = 'http://localhost:8080/deck/';
  // AwsDecksUrl: string = 'http://ec2-34-238-176-76.compute-1.amazonaws.com:8080/deck';
  // AwssingleDeckUrl: string = 'http://ec2-34-238-176-76.compute-1.amazonaws.com:8080/deck/';
  constructor(private http: HttpClient) { }

getDecks() : Observable<Deck[]>{
    return this.http.get<Deck[]>(this.DecksUrl);
}
saveDeck(deck: Deck): Observable<Deck>{
  return this.http.post<Deck>(this.DecksUrl,JSON.stringify(deck),httpOptions);
}
deleteDeck(deckname:string): Observable<Deck>{
  return this.http.delete<Deck>(this.singleDeckUrl+deckname,httpOptions);
}
getDeck(deckname:string): Observable<Deck>{
  return this.http.get<Deck>(this.singleDeckUrl+deckname,httpOptions);
}
updateDeck(deckname:string, card:Card): Observable<Card>{
  return this.http.put<Card>(`${this.singleDeckUrl}${deckname}/card`,JSON.stringify(card),httpOptions);
}

}
