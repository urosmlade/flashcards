import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth/service/auth.service';
import { CategoriesService } from '@categories/service/categories.service';
import { DecksService } from '@decks/service/decks.service';
import { Deck } from '@flashcards/deck.model';
import { Flashcard } from '@flashcards/flashcard.model';
import { FlashcardsService } from '@flashcards/service/flashcards.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-flashcard',
  templateUrl: './edit-flashcard.component.html',
  styleUrls: ['./edit-flashcard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditFlashcardComponent implements OnInit {
  @Input() flashcard?: Flashcard;

  readonly flashcardForm: FormGroup;

  readonly categories$: Observable<string[]>;
  readonly decks$: Observable<Deck[]>;

  constructor(
    private readonly flashcardsService: FlashcardsService,
    private readonly categoriesService: CategoriesService,
    private readonly authService: AuthService,
    private readonly activeModal: NgbActiveModal,
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
  }

  ngOnInit(): void {
    this.flashcardForm.patchValue({
      question: this.flashcard?.question,
      answer: this.flashcard?.answer,
      category: this.flashcard?.category,
      deck: this.flashcard?.deck,
      private: this.flashcard?.isPrivate
    });
  }

  edit(): void {
    if (this.flashcard) {
      const deck = new Deck(
        this.deckControl.value.id,
        this.deckControl.value.name,
        this.deckControl.value.authorId
      );
      const editedFlashcard = new Flashcard(
        this.questionControl.value,
        this.answerControl.value,
        this.categoryControl.value,
        this.flashcard?.authorId,
        this.privateControl.value,
        deck,
        this.flashcard?.authorName,
        this.flashcard.createdAt,
        this.flashcard?.id
      );

      this.flashcardsService.updateFlashcard(editedFlashcard).then(() => {
        this.activeModal.close();
        this.toastrService.success('Flashcard edited');
      });
    }
  }

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
