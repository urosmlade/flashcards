import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { CategoriesComponent } from '../categories/categories/categories.component';
import { CategoryComponent } from '../categories/category/category.component';
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
    component: CategoriesComponent,
  },
  {
    path: 'categories/:id',
    component: CategoryComponent,
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
    CategoriesComponent,
    GroupComponent,
    CategoryComponent,
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
