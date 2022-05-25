import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { switchMap, take } from 'rxjs';
import { Flashcard } from '../flashcard.model';
import { AuthService } from '../services/auth.service';
import { FlashcardsService } from '../services/flashcards.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  readonly flashcardForm: FormGroup;

  readonly categories: string[];

  constructor(
    private readonly flashcardService: FlashcardsService,
    private readonly authService: AuthService
  ) {
    this.flashcardForm = new FormGroup({
      title: this.titleControl,
      answer: this.answerControl,
      category: this.categoryControl,
    });

    this.categories = [
      'Projektovanje baza podataka',
      'Sistemi baza podataka',
      'Objektno orijentisano programiranje',
      'Agilni pristupi u razvoju softerskih proizvoda',
    ];
  }

  add() {
    this.authService.uid$
      .pipe(
        take(1),
        switchMap((id) => {
          const f = new Flashcard(
            this.titleControl.value,
            this.answerControl.value,
            this.categoryControl.value,
            id
          );

          return this.flashcardService.addFlashcard(f);
        })
      )
      .subscribe();
  }

  private readonly titleControl = new FormControl(undefined);
  private readonly answerControl = new FormControl(undefined);
  private readonly categoryControl = new FormControl(undefined);
}
