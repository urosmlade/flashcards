import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'firebase/auth';
import { Observable, switchMap } from 'rxjs';
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

  constructor(
    private readonly authService: AuthService,
    private readonly flashcardsService: FlashcardsService
  ) {
    this.flashcards$ = this.authService.uid$.pipe(
      switchMap((id) => this.flashcardsService.getFlashcardsForLoggedInUser(id))
    );

    this.user$ = this.authService.userData$;
  }

  ngOnInit(): void {}

  signOut() {
    this.authService.signOut();
  }
}
