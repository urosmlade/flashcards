import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListComponent as CategoriesListComponent } from '../categories/list/list.component';
import { OneComponent as OneCategoryComponent } from '../categories/one/one.component';
import { AddComponent as AddGroupComponent } from '../groups/add/add.component';
import { ListComponent as GroupsListComponent } from '../groups/list/list.component';
import { OneComponent as OneGroupComponent } from '../groups/one/one.component';
import { ProfileComponent } from '../profile/profile.component';
import { AddComponent } from './add/add.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardComponent } from './card/card.component';
import { EditFlashcardComponent } from './edit-flashcard/edit-flashcard.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { RemoveFlashcardComponent } from './remove-flashcard/remove-flashcard.component';
import { SingleCardViewComponent } from './single-card-view/single-card-view.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  {
    path: 'flashcards',
    component: HomeComponent,
  },
  {
    path: 'user/:userId',
    component: ProfileComponent,
  },
  {
    path: 'add',
    component: AddComponent,
  },
  {
    path: 'categories',
    component: CategoriesListComponent,
  },
  {
    path: 'categories/:id',
    component: OneCategoryComponent,
  },
  {
    path: 'groups',
    component: GroupsListComponent,
  },
  {
    path: 'groups/:id',
    component: OneGroupComponent,
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
    CategoriesListComponent,
    OneGroupComponent,
    OneCategoryComponent,
    GroupsListComponent,
    EditFlashcardComponent,
    RemoveFlashcardComponent,
    AddGroupComponent,
    SingleCardViewComponent,
    ViewComponent,
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
