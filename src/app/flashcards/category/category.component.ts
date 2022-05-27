import { Component, OnInit } from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  shareReplay,
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

  readonly isCategoryNotEmpty$: Observable<boolean>;

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
      map(([publicF, privateF]) => [...publicF, ...privateF]),
      shareReplay(1)
    );

    this.isCategoryNotEmpty$ = this.flashcards$.pipe(
      map((flashcards) => flashcards.length !== 0)
    );
  }

  ngOnInit(): void {}

  updateSelectedCategoryId(id: string) {
    this.selectedCategoryId$.next(id);
  }
}
