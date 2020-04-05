import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlashcardComponent } from '../app/components/flashcard/flashcard.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { DeckListComponent } from './components/deck-list/deck-list.component';

const routes: Routes = [
  {path: '', redirectTo: '/flashcard', pathMatch: 'full'},
  {path: 'decklist', component: DeckListComponent},
  {path: 'decklist/:id', component: FlashcardComponent},
  {path: 'flashcard', component: FlashcardComponent},
  {path: 'login', component: LoginComponent,},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
