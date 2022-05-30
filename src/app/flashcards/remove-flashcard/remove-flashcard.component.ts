import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Flashcard } from '@flashcards/flashcard.model';
import { FlashcardsService } from '@flashcards/service/flashcards.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-remove-flashcard',
  templateUrl: './remove-flashcard.component.html',
  styleUrls: ['./remove-flashcard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RemoveFlashcardComponent {
  @Input() flashcard?: Flashcard;

  constructor(
    private readonly flashcardsService: FlashcardsService,
    private readonly activeModal: NgbActiveModal,
    private readonly toastrService: ToastrService
  ) {}

  delete(): void {
    if (this.flashcard?.id) {
      this.flashcardsService.removeFlashcard(this.flashcard.id).then(() => {
        this.toastrService.success('Flashcard deleted');
        this.close();
      });
    }
  }

  close(): void {
    this.activeModal.close();
  }
}
