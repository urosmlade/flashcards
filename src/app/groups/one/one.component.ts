import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth/service/auth.service';
import { Flashcard } from '@flashcards/flashcard.model';
import { FlashcardsService } from '@flashcards/service/flashcards.service';
import { map, Observable, switchMap } from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';

@Component({
  selector: 'app-flashcards-per-group',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OneComponent {
  readonly flashcards$: Observable<Flashcard[]>;

  constructor(
    private readonly authService: AuthService,
    private readonly flashcardsService: FlashcardsService,
    private readonly route: ActivatedRoute
  ) {
    const selectedGroupId$ = this.route.params.pipe(map(p => p.id));
    const userId$ = this.authService.uid$;

    this.flashcards$ = combineLatest([selectedGroupId$, userId$]).pipe(
      switchMap(([gid, uid]) =>
        this.flashcardsService.getFlashcardsForSelectedGroup(gid, uid)
      )
    );
  }
}
