import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Flashcard } from '@flashcards/flashcard.model';
import { FlashcardsService } from '@flashcards/service/flashcards.service';
import { Observable, shareReplay } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly flashcards$: Observable<Flashcard[]>;

  constructor(private readonly flashcardsService: FlashcardsService) {
    this.flashcards$ = this.flashcardsService
      .latestFlashcards()
      .pipe(shareReplay(1));
  }
}
