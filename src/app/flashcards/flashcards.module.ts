import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgbModalModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { AddComponent } from './add/add.component';
import { CardDetailsComponent } from './card-details/card-details.component';
import { CardComponent } from './card/card.component';
import { CategoriesComponent } from './categories/categories.component';
import { CategoryComponent } from './category/category.component';
import { GroupComponent } from './group/group.component';
import { GroupsComponent } from './groups/groups.component';
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
    GroupsComponent
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
