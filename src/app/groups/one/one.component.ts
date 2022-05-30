import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { AuthService } from 'src/app/auth/service/auth.service';
import { Flashcard } from 'src/app/flashcards/flashcard.model';
import { FlashcardsService } from 'src/app/flashcards/service/flashcards.service';

@Component({
  selector: 'app-flashcards-per-group',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss'],
})
export class OneComponent implements OnInit {
  readonly flashcards$: Observable<Flashcard[]>;

  constructor(
    private readonly authService: AuthService,
    private readonly flashcardsService: FlashcardsService,
    private readonly route: ActivatedRoute
  ) {
    const selectedGroupId$ = this.route.params.pipe(map((p) => p.id));
    const userId$ = this.authService.uid$;

    this.flashcards$ = combineLatest([selectedGroupId$, userId$]).pipe(
      switchMap(([gid, uid]) =>
        this.flashcardsService.getFlashcardsForSelectedGroup(gid, uid)
      )
    );
  }

  ngOnInit(): void {}
}
