import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth/service/auth.service';
import { CategoriesService } from '@categories/service/categories.service';
import { DecksService } from '@decks/service/decks.service';
import { Deck } from '@flashcards/deck.model';
import { Flashcard } from '@flashcards/flashcard.model';
import { FlashcardsService } from '@flashcards/service/flashcards.service';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, Subscription, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent implements OnDestroy {
  readonly flashcardForm: FormGroup;

  readonly categories$: Observable<string[]>;
  readonly decks$: Observable<Deck[]>;

  readonly noDecks$: Observable<boolean>;
  readonly decksExist$: Observable<boolean>;

  constructor(
    private readonly flashcardsService: FlashcardsService,
    private readonly categoriesService: CategoriesService,
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly decksService: DecksService
  ) {
    this.flashcardForm = new FormGroup({
      question: this.questionControl,
      answer: this.answerControl,
      category: this.categoryControl,
      deck: this.deckControl,
      private: this.privateControl
    });

    this.categories$ = this.categoriesService
      .all()
      .pipe(map(categories => categories.map(category => category.title)));

    this.decks$ = this.authService.uid$.pipe(
      switchMap(id => this.decksService.allByUser(id))
    );

    this.noDecks$ = this.decks$.pipe(map(decks => decks.length === 0));
    this.decksExist$ = this.decks$.pipe(map(decks => decks.length > 0));
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  add(): void {
    this.subsink.add(
      this.authService.userData$
        .pipe(
          take(1),
          switchMap(({ uid, displayName }) => {
            const flashcard = new Flashcard(
              this.questionControl.value,
              this.answerControl.value,
              this.categoryControl.value,
              uid,
              this.privateControl.value,
              this.deckControl.value,
              displayName ?? '',
              new Date()
            );

            return this.flashcardsService.add(flashcard);
          })
        )
        .subscribe(() => {
          this.toastrService.success('Flashcard added');
          this.questionControl.reset();
          this.answerControl.reset();
        })
    );
  }

  private readonly subsink = new Subscription();

  private readonly questionControl = new FormControl(undefined, [
    Validators.required
  ]);
  private readonly answerControl = new FormControl(undefined, [
    Validators.required
  ]);
  private readonly categoryControl = new FormControl(undefined, [
    Validators.required
  ]);
  private readonly deckControl = new FormControl(undefined, [
    Validators.required
  ]);
  private readonly privateControl = new FormControl(false, [
    Validators.required
  ]);
}
