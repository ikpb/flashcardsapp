import { Component, OnInit } from '@angular/core';
import { faTrash, faPlus,faArrowLeft,faArrowRight,faTimes,faSyncAlt, faEdit, faQuestion } from '@fortawesome/free-solid-svg-icons';
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
  cardid:0,
  question:"Please (Flip Card)",
  answer:"Add a Card"
};
addCard:Card = {
  cardid:0,
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
      this.displayCard(this.cardsData[0].cardid,this.cardsData[0].question,this.cardsData[0].answer,0)
      }else{
        this.cardsData = [{
          question:"Please (Flip Card)",
          answer:"Add a Card"
        }]
        this.deckTotal=this.cardsData.length;
        this.currentCardIndex=0
      }

    });

  }

  displayCard(cardid:Number,question:String,answer:String,index:Number){
    this.currentCardIndex = index;
    this.singleCard.cardid = cardid;
    this.singleCard.question = question;
    this.singleCard.answer = answer;
  }
  onSubmit(value, currentDeck){
    console.log(value);
    let cardid = value.value.cardid;
    let question = value.value.question;
    let answer = value.value.answer;
    console.log(`"cardid":"${cardid}","question":"${question}","answer":"${answer}"`)
    if(value.value.cardid==undefined){
      delete value.value.cardid;
          this.deckService.updateDeck(currentDeck,value.value).subscribe(
      data=>{
        this.cardsData.push(data);
        this.deckTotal=this.cardsData.length;
        console.log("added worked");
      });
      this.addCard={
        question:"",
        answer:""
      }
    }else{
      this.cardService.updateCard(this.deckName,{cardid,question,answer}as Card).subscribe(data=>{
        console.log(data);
        console.log("edit worked");
      });
    }

      
  }

  deleteCard(currCardIndex){
    let thisCard =this.cardsData[currCardIndex];
    delete thisCard.deck;
    console.log(thisCard);
    if(!thisCard.question.includes("Please (Flip Card)")){
              this.cardService.deleteCard(thisCard).subscribe(data=>{
      console.log(data);
    });
    setTimeout(() => {
       this.cardService.deleteCard(thisCard).subscribe(data=>{
      console.log(data);
    });
    }, 2000);
    }else{
  
   alert("no cards to delete")
    }

    if(currCardIndex!=0){
          this.cardsData.splice(currCardIndex,1)
    this.deckTotal=this.cardsData.length;
    console.log(currCardIndex);
    console.log(this.deckTotal);
    if(currCardIndex>=this.deckTotal){
      this.leftClick(currCardIndex);
    }else{
      this.rightClick(currCardIndex);
    }
    }else{
      this.cardsData = [{
        question:"Please (Flip Card)",
        answer:"Add a Card"
      }]
      this.deckTotal=this.cardsData.length;
      this.currentCardIndex=0
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
    this.displayCard(this.cardsData[currentIndex].cardid,this.cardsData[currentIndex].question,this.cardsData[currentIndex].answer,currentIndex)
    }else{
      this.displayCard(this.cardsData[0].cardid,this.cardsData[0].question,this.cardsData[0].answer,0)
    }


  }
  leftClick(currentIndex){
    let deckTotNumb = this.deckTotal-1;
    if(currentIndex!=0){
          currentIndex = currentIndex-1;
    this.displayCard(this.cardsData[currentIndex].cardid,this.cardsData[currentIndex].question,this.cardsData[currentIndex].answer,currentIndex)
    }else{
      this.displayCard(this.cardsData[deckTotNumb].cardid,this.cardsData[deckTotNumb].question,this.cardsData[deckTotNumb].answer,deckTotNumb)
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