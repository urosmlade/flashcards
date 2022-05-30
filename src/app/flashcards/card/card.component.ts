import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map, Observable, Subject } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { EditFlashcardComponent } from '../edit-flashcard/edit-flashcard.component';
import { Flashcard } from '../flashcard.model';
import { RemoveFlashcardComponent } from '../remove-flashcard/remove-flashcard.component';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() flashcard?: Flashcard;

  shouldShowActions$?: Observable<{ author: boolean; id: string | undefined }>;
  readonly hoveredCardId$ = new Subject<string | undefined>();

  constructor(
    private readonly modal: NgbModal,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const flashcardAuthor$ = this.authService.uid$.pipe(
      map((id) => {
        if (this.flashcard?.authorId) {
          return this.flashcard.authorId === id;
        } else {
          return false;
        }
      })
    );

    this.shouldShowActions$ = combineLatest([
      flashcardAuthor$,
      this.hoveredCardId$,
    ]).pipe(
      map(([author, id]) => ({
        author: author,
        id: id,
      }))
    );
  }

  setHoveredCard(id?: string) {
    this.hoveredCardId$.next(id);
  }

  openCardDetailsModal() {
    const modalRef = this.modal.open(CardDetailsComponent);

    modalRef.componentInstance.flashcard = this.flashcard;
  }

  openEditFlashcardModal() {
    const modalRef = this.modal.open(EditFlashcardComponent);

    modalRef.componentInstance.flashcard = this.flashcard;
  }

  openRemoveFlashcardModal() {
    const modalRef = this.modal.open(RemoveFlashcardComponent);

    modalRef.componentInstance.flashcard = this.flashcard;
  }
}
