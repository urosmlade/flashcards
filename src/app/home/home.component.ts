import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  // readonly flashcards$: Observable<any>;
  // constructor(
  //   private readonly flashcardService: FlashcardsService,
  //   private readonly modal: NgbModal
  // ) {
  //   this.flashcards$ = this.flashcardService.getFlashcard();
  // }

  ngOnInit(): void {}

  // openAddFlashcardModal() {
  //   this.modal.open(AddComponent);
  // }
}
