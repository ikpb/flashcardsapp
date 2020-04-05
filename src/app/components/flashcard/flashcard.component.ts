import { Component, OnInit } from '@angular/core';
import { faTrash, faPlus,faArrowLeft,faArrowRight,faTimes,faSyncAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { NgForm } from '@angular/forms';
import { Card } from '../../models/Card';
import { CardService } from '../../services/card.service';
import { ActivatedRoute } from '@angular/router';
import { DeckService } from '../../services/deck.service';


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
  faEdit=faEdit;
// ---------------

deckName:String ="";
makeEditCard:String="";
singleCard:Card = {
  question:"Please",
  answer:"Add a Card"
};
addCard:Card = {
  question:"",
  answer:""
};

deckTotal:number;
cardsData:Card[];
showAddCard:Boolean =false;
showAnswer:Boolean=false;
onCurrentIndex:Boolean=true;
editButton:Boolean=false;
addButton:Boolean=false;
  constructor(private route: ActivatedRoute,
    private cardService: CardService,
    private deckService: DeckService
    ) { }
currentCardIndex;
  ngOnInit(): void {
    let currentDeck = this.route.snapshot.paramMap.get('id');
    this.deckName = currentDeck;
    this.cardService.getCardsInDeck(currentDeck).subscribe(cards =>{
      console.log(cards.length)
      if(cards.length!=0){
      this.cardsData=cards;
      this.deckTotal=this.cardsData.length;
      this.displayCard(this.cardsData[0].question,this.cardsData[0].answer,0)
      }else{
        this.cardsData = [{
          question:"Please",
          answer:"Add a Card"
        }]
        this.deckTotal=this.cardsData.length;
        this.currentCardIndex=0
      }

    });

  }

  displayCard(question:String,answer:String, index:Number){
    this.currentCardIndex = index;
    this.singleCard.question = question;
    this.singleCard.answer = answer;
  }
  onSubmit(value, currentDeck){
    
    this.deckService.updateDeck(currentDeck,value.value).subscribe(
      data=>{
        this.cardsData.push(data);
        this.deckTotal=this.cardsData.length;
      });
      this.addCard={
        question:"",
        answer:""
      }
      
  }

  deleteCard(currCardIndex){
    let thisCard =this.cardsData[currCardIndex];
    delete thisCard.deck;
    console.log(thisCard);

    this.cardService.deleteCard(thisCard).subscribe(data=>{
      console.log(data);
    });
    setTimeout(() => {
       this.cardService.deleteCard(thisCard).subscribe(data=>{
      console.log(data);
    });
    }, 2000);
   
    this.cardsData.splice(currCardIndex,1)
    this.deckTotal=this.cardsData.length;
    console.log(currCardIndex);
    console.log(this.deckTotal);
    if(currCardIndex>=this.deckTotal){
      this.leftClick(currCardIndex);
    }else{
      this.rightClick(currCardIndex);
    }
    
  }
  editCard(currCardIndex){
    if(this.showAddCard===false){
      this.makeEditCard="Edit Card"
      this.showAddCard= !this.showAddCard;
       this.addCard=this.singleCard;
       this.editButton = true;
       this.addButton = false;
    }else{
      this.makeEditCard="Edit Card"
      this.addCard=this.singleCard;
      this.editButton = true;
      this.addButton = false;
    }
   

  }
  rightClick(currentIndex){
    let deckTotNumb = this.deckTotal-1;
    if(currentIndex!=deckTotNumb){
          currentIndex = currentIndex+1;
    this.displayCard(this.cardsData[currentIndex].question,this.cardsData[currentIndex].answer,currentIndex)
    }else{
      this.displayCard(this.cardsData[0].question,this.cardsData[0].answer,0)
    }


  }
  leftClick(currentIndex){
    let deckTotNumb = this.deckTotal-1;
    if(currentIndex!=0){
          currentIndex = currentIndex-1;
    this.displayCard(this.cardsData[currentIndex].question,this.cardsData[currentIndex].answer,currentIndex)
    }else{
      this.displayCard(this.cardsData[deckTotNumb].question,this.cardsData[deckTotNumb].answer,deckTotNumb)
    }


  }
  showAns(e){
    this.showAnswer=!this.showAnswer;
    e.preventDefault();
  }
  toggleAddCard(){
    this.makeEditCard="Add Card"
    this.showAddCard=!this.showAddCard;
    this.addButton=this.showAddCard;
    this.editButton=false;
    this.addCard={
      question:"",
      answer:""
    }
  }
}  
// createCards((data,index)=>createCard(data,index));


//  
//  createCard(data, index){
//     const card = document.createElement('div');
//     card.classList.add('card');
//     if(index ===0){
//       card.classList.add('active')
//     }
//     card.innerHTML=`
//     <div class="inner-card">
//     <div class="inner-card-front">
//         <fa-icon [icon]="faSyncAlt" class="inner-icon"></fa-icon>
//         <p>
//             ${data.question}
//         </p>
//     </div>
//     <div class="inner-card-back">
//         <fa-icon [icon]="faSyncAlt" class="inner-icon"></fa-icon>
//         <p>
//         ${data.answer}
//         </p>
//     </div>
// </div>
//     `;
//   }