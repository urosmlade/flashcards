import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from 'firebase/auth';
import { map, Observable, switchMap } from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { Flashcard } from 'src/app/flashcard.model';
import { AuthService } from 'src/app/services/auth.service';
import { FlashcardsService } from 'src/app/services/flashcards.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  readonly flashcards$: Observable<Flashcard[]>;

  readonly user$: Observable<UserInfo>;

  readonly isOwnProfile$: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly flashcardsService: FlashcardsService,
    private readonly route: ActivatedRoute
  ) {
    const userId$ = this.route.params.pipe(map((p) => p.userId));

    this.user$ = userId$.pipe(
      switchMap((id) => this.flashcardsService.getAuthorData(id)),
      map((user) => user.docs[0].data() as UserInfo)
    );

    this.flashcards$ = userId$.pipe(
      switchMap((id) => this.flashcardsService.getFlashcardsByAnotherUser(id))
    );

    this.isOwnProfile$ = combineLatest([userId$, this.authService.uid$]).pipe(
      map(([uid, id]) => {
        if (!id) {
          return true;
        }

        if (uid === id) {
          return true;
        }

        return false;
      })
    );
  }

  ngOnInit(): void {}

  signOut() {
    this.authService.signOut();
  }
}
