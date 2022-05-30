import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Flashcard } from '@flashcards/flashcard.model';
import { FlashcardsService } from '@flashcards/service/flashcards.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly flashcards$: Observable<Flashcard[]>;

  constructor(private readonly flashcardService: FlashcardsService) {
    this.flashcards$ = this.flashcardService.latestFlashcards();
  }
}
