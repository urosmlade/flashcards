import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Flashcard } from 'src/app/flashcard.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() flashcards$?: Observable<Flashcard[]>;

  constructor() {}
  ngOnInit(): void {
    this.flashcards$?.subscribe(a => console.log(a))
  }
}
