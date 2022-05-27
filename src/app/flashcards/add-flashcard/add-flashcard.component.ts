import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable, switchMap, take } from 'rxjs';
import { Flashcard } from 'src/app/flashcard.model';
import { AuthService } from 'src/app/services/auth.service';
import { FlashcardsService } from 'src/app/services/flashcards.service';

@Component({
  selector: 'app-add-flashcard',
  templateUrl: './add-flashcard.component.html',
  styleUrls: ['./add-flashcard.component.scss'],
})
export class AddFlashcardComponent implements OnInit {
  readonly flashcardForm: FormGroup;

  readonly categories: string[];
  readonly groups$: Observable<string[]>;

  constructor(
    private readonly flashcardsService: FlashcardsService,
    private readonly authService: AuthService
  ) {
    this.flashcardForm = new FormGroup({
      title: this.titleControl,
      answer: this.answerControl,
      category: this.categoryControl,
      group: this.groupControl,
      private: this.privateControl,
    });

    this.categories = [
      'Projektovanje baza podataka',
      'Sistemi baza podataka',
      'Objektno orijentisano programiranje',
      'Agilni pristupi u razvoju softerskih proizvoda',
    ];

    this.groups$ = this.authService.uid$.pipe(
      switchMap((id) => this.flashcardsService.getGroups(id)),
      map((groups) => groups.map((group) => group.title))
    );
  }

  ngOnInit(): void {}

  add() {
    this.authService.uid$
      .pipe(
        take(1),
        switchMap((id) => {
          const flashcard = new Flashcard(
            this.titleControl.value,
            this.answerControl.value,
            this.categoryControl.value,
            id,
            this.privateControl.value,
            this.groupControl.value
          );

          return this.flashcardsService.addFlashcard(flashcard);
        })
      )
      .subscribe();
  }

  private readonly titleControl = new FormControl(undefined, [
    Validators.required,
  ]);
  private readonly answerControl = new FormControl(undefined, [
    Validators.required,
  ]);
  private readonly categoryControl = new FormControl(undefined, [
    Validators.required,
  ]);
  private readonly groupControl = new FormControl(undefined, [
    Validators.required,
  ]);
  private readonly privateControl = new FormControl(false, [
    Validators.required,
  ]);
}
