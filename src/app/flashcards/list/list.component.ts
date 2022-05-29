import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Flashcard } from 'src/app/flashcard.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() flashcards$?: Observable<Flashcard[]>;

  listNotEmpty$?: Observable<boolean>;

  constructor() {}

  ngOnInit(): void {
    this.listNotEmpty$ = this.flashcards$?.pipe(
      map((list) => list && list.length !== 0)
    );
  }
}
