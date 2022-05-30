import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth/service/auth.service';
import { Flashcard } from '@flashcards/flashcard.model';
import { FlashcardsService } from '@flashcards/service/flashcards.service';
import { combineLatest, map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-flashcards-per-category',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss']
})
export class OneComponent {
  readonly flashcards$: Observable<Flashcard[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly flashcardsService: FlashcardsService,
    private readonly authService: AuthService
  ) {
    const selectedCategoryId$ = this.route.params.pipe(map(p => p.id));
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
}
