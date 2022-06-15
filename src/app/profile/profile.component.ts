import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@auth/service/auth.service';
import { Flashcard } from '@flashcards/flashcard.model';
import { FlashcardsService } from '@flashcards/service/flashcards.service';
import { UserInfo } from 'firebase/auth';
import { map, Observable, switchMap } from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileComponent {
  readonly flashcards$: Observable<Flashcard[]>;

  readonly user$: Observable<UserInfo>;

  readonly isOwnProfile$: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly flashcardsService: FlashcardsService,
    private readonly route: ActivatedRoute
  ) {
    const routeUserId$ = this.route.params.pipe(map(p => p.userId));

    this.user$ = routeUserId$.pipe(
      switchMap(id => this.flashcardsService.getAuthorData(id)),
      map(user => user.docs[0].data() as UserInfo)
    );

    this.flashcards$ = combineLatest([
      routeUserId$,
      this.authService.uid$
    ]).pipe(
      switchMap(([routeId, userId]) => {
        const id = routeId === userId ? userId : routeId;
        return this.flashcardsService.getFlashcardsByUser(id);
      })
    );

    this.isOwnProfile$ = combineLatest([
      routeUserId$,
      this.authService.uid$
    ]).pipe(map(([uid, id]) => uid === id));
  }

  signOut(): void {
    this.authService.signOut();
  }
}
