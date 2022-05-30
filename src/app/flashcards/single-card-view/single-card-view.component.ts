import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, map, Observable, take } from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { Flashcard } from 'src/app/flashcard.model';
import { AuthService } from 'src/app/services/auth.service';
import { EditFlashcardComponent } from '../edit-flashcard/edit-flashcard.component';
import { RemoveFlashcardComponent } from '../remove-flashcard/remove-flashcard.component';

@Component({
  selector: 'app-single-card-view',
  templateUrl: './single-card-view.component.html',
  styleUrls: ['./single-card-view.component.scss'],
})
export class SingleCardViewComponent implements OnInit {
  @Input() flashcards$?: Observable<Flashcard[]>;

  readonly index$: Observable<number>;

  loggedInUserId$: Observable<string>;

  constructor(
    private readonly authService: AuthService,
    private readonly modal: NgbModal,
    private readonly router: Router
  ) {
    this.index$ = this.indexSubject$.asObservable();
    this.loggedInUserId$ = this.authService.uid$;
  }

  ngOnInit(): void {
    this.flashcards$
      ?.pipe(map((flashcards) => flashcards.length))
      .subscribe((length) => {
        this.maxIndexSubject$.next(length);
      });
  }

  nextCard() {
    combineLatest([this.indexSubject$, this.maxIndexSubject$])
      .pipe(take(1))
      .subscribe(([index, maxIndex]) => {
        if (index < maxIndex) {
          this.indexSubject$.next(++index);
        }
      });
  }

  prevCard() {
    this.indexSubject$.pipe(take(1)).subscribe((index) => {
      if (index > 1) {
        this.indexSubject$.next(--index);
      }
    });
  }

  openEditFlashcardModal(flashcard: Flashcard) {
    const modalRef = this.modal.open(EditFlashcardComponent);

    modalRef.componentInstance.flashcard = flashcard;
  }

  openRemoveFlashcardModal(flashcard: Flashcard) {
    const modalRef = this.modal.open(RemoveFlashcardComponent);

    modalRef.componentInstance.flashcard = flashcard;
  }

  goToAuthorProfile(authorId: string) {
    this.router.navigate(['user', authorId]);
  }

  goToCategory(categoryId: string) {
    this.router.navigate(['categories', categoryId]);
  }

  private readonly maxIndexSubject$ = new BehaviorSubject<number>(0);

  private readonly indexSubject$ = new BehaviorSubject<number>(1);
}
