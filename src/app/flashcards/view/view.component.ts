import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Flashcard } from 'src/app/flashcards/flashcard.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss'],
})
export class ViewComponent implements OnInit {
  @Input() flashcards$?: Observable<Flashcard[]>;

  readonly listView$: Observable<boolean>;
  readonly singleView$: Observable<boolean>;

  listNotEmpty$?: Observable<boolean>;

  constructor() {
    this.listView$ = this.listViewSubject$.asObservable();
    this.singleView$ = this.listView$.pipe(map((lv) => !lv));

    const viewType = localStorage.getItem('viewType');

    if (viewType === 'single') {
      this.listViewSubject$.next(false);
    } else {
      this.listViewSubject$.next(true);
    }
  }

  ngOnInit(): void {
    this.listNotEmpty$ = this.flashcards$?.pipe(
      map((list) => list && list.length !== 0)
    );
  }

  switchToListView() {
    this.listViewSubject$.next(true);
    localStorage.setItem('viewType', 'list');
  }

  switchToSingleView() {
    this.listViewSubject$.next(false);
    localStorage.setItem('viewType', 'single');
  }

  private readonly listViewSubject$ = new BehaviorSubject<boolean>(true);
}
