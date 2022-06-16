import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent as CategoriesListComponent } from '@categories/list/list.component';
import { OneComponent as OneCategoryComponent } from '@categories/one/one.component';
import { CategoriesService } from '@categories/service/categories.service';
import { AddComponent as AddDeckComponent } from '@decks/add/add.component';
import { ListComponent as DecksListComponent } from '@decks/list/list.component';
import { OneComponent as OneDeckComponent } from '@decks/one/one.component';
import { DecksService } from '@decks/service/decks.service';
import { AddComponent as AddFlashcadComponent } from '@flashcards/add/add.component';
import { CardDetailsComponent } from '@flashcards/card-details/card-details.component';
import { CardComponent } from '@flashcards/card/card.component';
import { EditFlashcardComponent } from '@flashcards/edit-flashcard/edit-flashcard.component';
import { HomeComponent } from '@flashcards/home/home.component';
import { ListComponent } from '@flashcards/list/list.component';
import { RemoveFlashcardComponent } from '@flashcards/remove-flashcard/remove-flashcard.component';
import { FlashcardsService } from '@flashcards/service/flashcards.service';
import { SingleCardViewComponent } from '@flashcards/single-card-view/single-card-view.component';
import { ViewComponent } from '@flashcards/view/view.component';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProfileComponent } from '@profile/profile.component';

const routes: Routes = [
  {
    path: 'flashcards',
    component: HomeComponent
  },
  {
    path: 'user/:userId',
    component: ProfileComponent
  },
  {
    path: 'add',
    component: AddFlashcadComponent
  },
  {
    path: 'categories',
    component: CategoriesListComponent
  },
  {
    path: 'categories/:id',
    component: OneCategoryComponent
  },
  {
    path: 'decks',
    component: DecksListComponent
  },
  {
    path: 'decks/:id',
    component: OneDeckComponent
  }
];

@NgModule({
  declarations: [
    ListComponent,
    CardComponent,
    CardDetailsComponent,
    AddFlashcadComponent,
    ProfileComponent,
    HomeComponent,
    CategoriesListComponent,
    OneDeckComponent,
    OneCategoryComponent,
    DecksListComponent,
    EditFlashcardComponent,
    RemoveFlashcardComponent,
    AddDeckComponent,
    SingleCardViewComponent,
    ViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgSelectModule,
    NgbModule,
    RouterModule.forChild(routes)
  ],
  providers: [FlashcardsService, CategoriesService, DecksService]
})
export class FlashcardsModule {}
