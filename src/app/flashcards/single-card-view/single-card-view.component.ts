import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/service/auth.service';
import { EditFlashcardComponent } from '@flashcards/edit-flashcard/edit-flashcard.component';
import { Flashcard } from '@flashcards/flashcard.model';
import { RemoveFlashcardComponent } from '@flashcards/remove-flashcard/remove-flashcard.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, map, Observable, Subscription, take } from 'rxjs';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';

@Component({
  selector: 'app-single-card-view',
  templateUrl: './single-card-view.component.html',
  styleUrls: ['./single-card-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SingleCardViewComponent implements OnInit, OnDestroy {
  @Input() flashcards$?: Observable<Flashcard[]>;

  readonly index$: Observable<number>;
  readonly loggedInUserId$: Observable<string>;

  listNotEmpty$?: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly modal: NgbModal,
    private readonly router: Router
  ) {
    this.index$ = this.indexSubject$.asObservable();
    this.loggedInUserId$ = this.authService.uid$;
  }

  ngOnInit(): void {
    this.subsink.add(
      this.flashcards$
        ?.pipe(map(flashcards => flashcards.length))
        .subscribe(length => {
          this.maxIndexSubject$.next(length);
        })
    );

    this.listNotEmpty$ = this.flashcards$?.pipe(
      map(flashcards => flashcards.length !== 0)
    );
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  nextCard(): void {
    this.subsink.add(
      combineLatest([this.indexSubject$, this.maxIndexSubject$])
        .pipe(take(1))
        .subscribe(([index, maxIndex]) => {
          if (index < maxIndex) {
            this.indexSubject$.next(++index);
          }
        })
    );
  }

  prevCard(): void {
    this.subsink.add(
      this.indexSubject$.pipe(take(1)).subscribe(index => {
        if (index > 1) {
          this.indexSubject$.next(--index);
        }
      })
    );
  }

  openEditFlashcardModal(flashcard: Flashcard): void {
    const modalRef = this.modal.open(EditFlashcardComponent);

    modalRef.componentInstance.flashcard = flashcard;
  }

  openRemoveFlashcardModal(flashcard: Flashcard): void {
    const modalRef = this.modal.open(RemoveFlashcardComponent);

    modalRef.componentInstance.flashcard = flashcard;
  }

  goToAuthorProfile(authorId: string): void {
    this.router.navigate(['user', authorId]);
  }

  goToCategory(categoryId: string): void {
    this.router.navigate(['categories', categoryId]);
  }

  private readonly maxIndexSubject$ = new BehaviorSubject<number>(0);
  private readonly indexSubject$ = new BehaviorSubject<number>(1);

  private readonly subsink = new Subscription();
}
