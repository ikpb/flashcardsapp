import { Component, OnInit } from '@angular/core';
import { faTrash, faPlus,faArrowLeft,faArrowRight,faTimes,faSyncAlt } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { Card } from '../../models/Card';

@Component({
  selector: 'app-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.css']
})
export class FlashcardComponent implements OnInit {
  faTrash = faTrash;
  faPlus = faPlus;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faTimes=faTimes;
  faSyncAlt=faSyncAlt;
// ---------------

deckName:String ="Flash Cards!"
card:Card = {
  question:"",
  answer:""
};
cards
cardsData:Card[]=[{
  question:'who are you',
  answer:'me'
},{
  question:'who are me',
  answer:'you'
},{
  question:'why are we here',
  answer:'because we must'
}]
showAddCard:Boolean =false;
showAnswer:Boolean=false;
  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(value){
    console.log(value.value)
    let question = value.value.question;
    let answer = value.value.answer;
    console.log(question);
    console.log(answer);
  }
  // createCards((data,index)=>createCard(data,index));


  createCard(data, index){
    const card = document.createElement('div');
    card.classList.add('card');
    if(index ===0){
      card.classList.add('active')
    }
    card.innerHTML=`
    <div class="inner-card">
    <div class="inner-card-front">
        <fa-icon [icon]="faSyncAlt" class="inner-icon"></fa-icon>
        <p>
            ${data.question}
        </p>
    </div>
    <div class="inner-card-back">
        <fa-icon [icon]="faSyncAlt" class="inner-icon"></fa-icon>
        <p>
        ${data.answer}
        </p>
    </div>
</div>
    `;
  }
  deleteCard(){
    
  }
  showAns(e){
    this.showAnswer=!this.showAnswer;
    e.preventDefault();
  }
  toggleAddCard(){
    this.showAddCard=!this.showAddCard;
  }
}
