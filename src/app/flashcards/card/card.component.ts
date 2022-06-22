import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { AuthService } from '@auth/service/auth.service';
import { CardDetailsComponent } from '@flashcards/card-details/card-details.component';
import { EditFlashcardComponent } from '@flashcards/edit-flashcard/edit-flashcard.component';
import { Flashcard } from '@flashcards/flashcard.model';
import { RemoveFlashcardComponent } from '@flashcards/remove-flashcard/remove-flashcard.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { combineLatest, map, Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit {
  @Input() flashcard?: Flashcard;

  shouldShowActionButtons$?: Observable<boolean>;

  constructor(
    private readonly modal: NgbModal,
    private readonly authService: AuthService
  ) {}

  ngOnInit(): void {
    const isFlashcardByLoggedInUser$ = this.authService.uid$.pipe(
      map(id => this.flashcard?.authorId === id)
    );

    this.shouldShowActionButtons$ = combineLatest([
      isFlashcardByLoggedInUser$,
      this.hoveredCardId$
    ]).pipe(map(([byAuthor, id]) => byAuthor && id === this.flashcard?.id));
  }

  setHoveredCard(id?: string): void {
    this.hoveredCardId$.next(id);
  }

  openCardDetailsModal(): void {
    const modalRef = this.modal.open(CardDetailsComponent);

    modalRef.componentInstance.flashcard = this.flashcard;
  }

  openEditFlashcardModal(): void {
    const modalRef = this.modal.open(EditFlashcardComponent);

    modalRef.componentInstance.flashcard = this.flashcard;
  }

  openRemoveFlashcardModal(): void {
    const modalRef = this.modal.open(RemoveFlashcardComponent);

    modalRef.componentInstance.flashcard = this.flashcard;
  }

  private readonly hoveredCardId$ = new Subject<string | undefined>();
}
