import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { Flashcard } from 'src/app/flashcard.model';
import { AuthService } from 'src/app/services/auth.service';
import { FlashcardsService } from 'src/app/services/flashcards.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  readonly flashcards$: Observable<Flashcard[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly flashcardsService: FlashcardsService,
    private readonly authService: AuthService
  ) {
    const selectedCategoryId$ = this.route.params.pipe(map((p) => p.id));
    const userId$ = this.authService.uid$;

    this.flashcards$ = combineLatest([selectedCategoryId$, userId$]).pipe(
      switchMap(([cid, uid]) => {
        const publicFlashcards =
          this.flashcardsService.getPublicFlashcardsForSelectedCategory(cid);
        const privateFlashcards =
          this.flashcardsService.getPrivateFlashcardsForSelectedCategoryByLoggedInUser(
            cid,
            uid
          );

        return combineLatest([publicFlashcards, privateFlashcards]);
      }),
      map(([publicF, privateF]) => [...publicF, ...privateF])
    );
  }

  ngOnInit(): void {}
}
