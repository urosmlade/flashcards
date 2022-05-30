import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Flashcard } from 'src/app/flashcards/flashcard.model';
import { FlashcardsService } from 'src/app/flashcards/service/flashcards.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly flashcards$: Observable<Flashcard[]>;

  constructor(
    private readonly flashcardService: FlashcardsService,
    private readonly authService: AuthService
  ) {
    this.flashcards$ = this.flashcardService.latestFlashcards();
  }

  ngOnInit(): void {}
}
