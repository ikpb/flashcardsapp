import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { Card } from '../models/Card';




const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
  providedIn: 'root'
})
export class CardService {
  CardsUrl: string = 'http://localhost:8080/card';
  singleCardUrl: string = 'http://localhost:8080/card/';
  CardsInDeckUrl: string = 'http://localhost:8080/card/deck/';
  constructor(private http: HttpClient) { }

  getCards() : Observable<Card[]>{
    return this.http.get<Card[]>(this.CardsUrl);

}
saveCard(Card: Card): Observable<Card>{
  return this.http.post<Card>(this.CardsUrl,JSON.stringify(Card),httpOptions);
}
deleteCard(id:string): Observable<Card>{
  let idValue = parseInt(id);
  return this.http.delete<Card>(this.singleCardUrl+idValue,httpOptions);
}
getCard(id:string): Observable<Card>{
  let idValue = parseInt(id);
  return this.http.get<Card>(this.singleCardUrl+idValue,httpOptions);
}
updateCard(Card:Card): Observable<Card>{
  return this.http.put<Card>(this.singleCardUrl,JSON.stringify(Card),httpOptions);
}

getCardsInDeck(deckname:string) : Observable<Card[]>{
  return this.http.get<Card[]>(this.CardsInDeckUrl+deckname);
}
}
