import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FlashcardsService } from 'src/app/services/flashcards.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  readonly categories$: Observable<string[]>;

  constructor(
    private readonly flashcardsService: FlashcardsService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.categories$ = this.flashcardsService
      .getCategories()
      .pipe(map((categories) => categories.map((category) => category.title)));
  }

  ngOnInit(): void {}

  navigateToCategory(category: string) {
    this.router.navigate(['categories', category]);
  }
}
