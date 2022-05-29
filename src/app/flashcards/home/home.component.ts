import { Component, OnInit } from '@angular/core';
import { combineLatest, map, Observable, switchMap } from 'rxjs';
import { Flashcard } from 'src/app/flashcard.model';
import { AuthService } from 'src/app/services/auth.service';
import { FlashcardsService } from 'src/app/services/flashcards.service';

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
    this.flashcards$ = this.authService.uid$.pipe(
      switchMap((id) =>
        combineLatest([
          this.flashcardService.getPublicFlashcards(),
          this.flashcardService.getPrivateFlashcardsForLoggedInUser(id),
        ])
      ),
      map(([publicFlashcards, privateFlashcards]) => [
        ...publicFlashcards,
        ...privateFlashcards,
      ])
    );
  }

  ngOnInit(): void {}
}
