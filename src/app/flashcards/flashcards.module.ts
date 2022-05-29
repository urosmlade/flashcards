import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddFlashcardComponent } from './add-flashcard/add-flashcard.component';
import { AddGroupComponent } from './add-group/add-group.component';
import { AddComponent } from './add/add.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardComponent } from './card/card.component';
import { CategoryComponent } from './categories/categories.component';
import { GroupComponent } from './group/group.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: 'flashcards',
    component: HomeComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
  {
    path: 'categories',
    component: CategoryComponent,
  },
  {
    path: 'groups',
    component: GroupComponent,
  },
];

@NgModule({
  declarations: [
    ListComponent,
    CardComponent,
    CardDetailsComponent,
    AddComponent,
    ProfileComponent,
    HomeComponent,
    AddGroupComponent,
    AddFlashcardComponent,
    CategoryComponent,
    GroupComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModalModule,
    NgSelectModule,
    NgbModule,
    RouterModule.forChild(routes),
  ],
})
export class FlashcardsModule {}
