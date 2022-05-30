import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Flashcard } from 'src/app/flashcards/flashcard.model';
import { FlashcardsService } from 'src/app/flashcards/service/flashcards.service';

@Component({
  selector: 'app-remove-flashcard',
  templateUrl: './remove-flashcard.component.html',
  styleUrls: ['./remove-flashcard.component.scss'],
})
export class RemoveFlashcardComponent implements OnInit {
  @Input() flashcard?: Flashcard;

  constructor(
    private readonly flashcardsService: FlashcardsService,
    private readonly activeModal: NgbActiveModal,
    private readonly toastrService: ToastrService
  ) {}

  ngOnInit(): void {}

  delete() {
    if (this.flashcard?.id) {
      this.flashcardsService.removeFlashcard(this.flashcard.id).then(() => {
        this.toastrService.success('Flashcard deleted');
        this.close();
      });
    }
  }

  close() {
    this.activeModal.close();
  }
}
