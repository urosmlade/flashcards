import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap
} from 'rxjs';
import { Flashcard } from 'src/app/flashcard.model';
import { AuthService } from 'src/app/services/auth.service';
import { FlashcardsService } from 'src/app/services/flashcards.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  readonly categories$: Observable<string[]>;

  readonly flashcards$: Observable<Flashcard[]>;

  readonly selectedCategoryId$ = new BehaviorSubject<string>('');

  constructor(
    private readonly flashcardsService: FlashcardsService,
    private readonly authService: AuthService
  ) {
    this.categories$ = this.flashcardsService
      .getCategories()
      .pipe(map((categories) => categories.map((category) => category.title)));

    this.flashcards$ = combineLatest([
      this.selectedCategoryId$,
      this.authService.uid$,
    ]).pipe(
      switchMap(([cid, uid]) => {
        const publicF =
          this.flashcardsService.getPublicFlashcardsForSelectedCategory(cid);
        const privateF =
          this.flashcardsService.getPrivateFlashcardsForSelectedCategoryByLoggedInUser(
            cid,
            uid
          );

        return combineLatest([publicF, privateF]);
      }),
      map(([publicF, privateF]) => [...publicF, ...privateF])
    );
  }

  ngOnInit(): void {}

  updateSelectedCategoryId(id: string) {
    this.selectedCategoryId$.next(id);
  }
}
