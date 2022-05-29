import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, Observable, switchMap } from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { Flashcard } from 'src/app/flashcard.model';
import { AuthService } from 'src/app/services/auth.service';
import { FlashcardsService } from 'src/app/services/flashcards.service';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss'],
})
export class GroupComponent implements OnInit {
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
