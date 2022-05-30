import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { ListComponent as CategoriesListComponent } from '../categories/list/list.component';
import { OneComponent as OneCategoryComponent } from '../categories/one/one.component';
import { GroupAddComponent } from '../groups/group-add/group-add.component';
import { GroupComponent } from '../groups/group/group.component';
import { GroupsComponent } from '../groups/groups/groups.component';
import { ProfileDetailsComponent } from '../profile/profile-details/profile-details.component';
import { ProfileComponent } from '../profile/profile/profile.component';
import { AddComponent } from './add/add.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardComponent } from './card/card.component';
import { EditFlashcardComponent } from './edit-flashcard/edit-flashcard.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { RemoveFlashcardComponent } from './remove-flashcard/remove-flashcard.component';
import { SingleCardViewComponent } from './single-card-view/single-card-view.component';
import { UserComponent } from './user/user.component';
import { ViewComponent } from './view/view.component';

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
    component: CategoriesListComponent,
  },
  {
    path: 'categories/:id',
    component: OneCategoryComponent,
  },
  {
    path: 'groups',
    component: GroupsComponent,
  },
  {
    path: 'groups/:id',
    component: GroupComponent,
  },
  {
    path: 'user/:id',
    component: UserComponent,
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
    GroupComponent,
    OneCategoryComponent,
    GroupsComponent,
    EditFlashcardComponent,
    RemoveFlashcardComponent,
    UserComponent,
    ProfileDetailsComponent,
    GroupAddComponent,
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
