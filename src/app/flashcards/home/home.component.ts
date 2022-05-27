import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Flashcard } from 'src/app/flashcard.model';
import { FlashcardsService } from 'src/app/services/flashcards.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly flashcards$: Observable<Flashcard[]>;

  constructor(private readonly flashcardService: FlashcardsService) {
    this.flashcards$ = this.flashcardService.getFlashcard();

    this.flashcards$.subscribe((a) => console.log(a));
  }

  ngOnInit(): void {}
}
