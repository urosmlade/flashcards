import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
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
  readonly groups$: Observable<string[]>;

  readonly flashcards$: Observable<Flashcard[]>;

  readonly selectedGroupId$ = new BehaviorSubject<string>('');

  readonly isGroupNotEmpty$: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly flashcardsService: FlashcardsService
  ) {
    this.groups$ = this.authService.uid$.pipe(
      switchMap((id) => this.flashcardsService.getGroups(id)),
      map((groups) => groups.map((group) => group.title))
    );

    this.flashcards$ = combineLatest([
      this.selectedGroupId$,
      this.authService.uid$,
    ]).pipe(
      switchMap(([gid, uid]) =>
        this.flashcardsService.getFlashcardsForSelectedGroup(gid, uid)
      )
    );

    this.isGroupNotEmpty$ = this.flashcards$.pipe(
      map((flashcards) => flashcards.length !== 0)
    );
  }

  ngOnInit(): void {}

  updateSelectedGroupId(id: string) {
    this.selectedGroupId$.next(id);
  }
}
