import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { FlashcardsService } from 'src/app/services/flashcards.service';

@Component({
  selector: 'app-categories-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  readonly categories$: Observable<string[]>;

  constructor(
    private readonly flashcardsService: FlashcardsService,
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
