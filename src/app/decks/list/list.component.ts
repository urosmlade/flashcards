import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/service/auth.service';
import { DecksService } from '@decks/service/decks.service';
import { Deck } from '@flashcards/deck.model';
import { BehaviorSubject, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-decks-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  readonly decks$: Observable<Deck[]>;

  readonly formHidden$: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly decksService: DecksService,
    private readonly router: Router
  ) {
    this.decks$ = this.authService.uid$.pipe(
      switchMap(id => this.decksService.allByUser(id))
    );

    this.formHidden$ = this.formHiddenSubject$.asObservable();
  }

  navigateToDeck(deckId: string): void {
    this.router.navigate(['decks', deckId]);
  }

  showAddDeckForm(): void {
    this.formHiddenSubject$.next(false);
  }

  hideAddDeckForm(): void {
    this.formHiddenSubject$.next(true);
  }

  private readonly formHiddenSubject$ = new BehaviorSubject<boolean>(true);
}
