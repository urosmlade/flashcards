import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserInfo } from 'firebase/auth';
import { map, Observable, switchMap } from 'rxjs';
import { Flashcard } from 'src/app/flashcard.model';
import { FlashcardsService } from 'src/app/services/flashcards.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  readonly user$: Observable<UserInfo>;
  readonly flashcards$: Observable<Flashcard[]>;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly flashcardsService: FlashcardsService
  ) {
    this.flashcards$ = this.route.params.pipe(
      map((p) => p.id),
      switchMap((id) => this.flashcardsService.getFlashcardsByAnotherUser(id))
    );

    this.user$ = this.route.params.pipe(
      map((p) => p.id),
      switchMap((id) => this.flashcardsService.getAuthorData(id)),
      map((user) => user.docs[0].data() as UserInfo)
    );
  }

  ngOnInit(): void {}
}
