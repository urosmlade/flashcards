import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Flashcard } from 'src/app/flashcard.model';
import { FlashcardsService } from 'src/app/services/flashcards.service';

@Component({
  selector: 'app-remove-flashcard',
  templateUrl: './remove-flashcard.component.html',
  styleUrls: ['./remove-flashcard.component.scss'],
})
export class RemoveFlashcardComponent implements OnInit {
  @Input() flashcard?: Flashcard;

  constructor(
    private readonly flashcardsService: FlashcardsService,
    private readonly activeModal: NgbActiveModal
  ) {}

  ngOnInit(): void {}

  delete() {
    if (this.flashcard?.id) {
      this.flashcardsService.removeFlashcard(this.flashcard.id).then(() => {
        this.close();
      });
    }
  }

  close() {
    this.activeModal.close();
  }
}
