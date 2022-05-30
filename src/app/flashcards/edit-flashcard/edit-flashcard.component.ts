import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth/service/auth.service';
import { CategoriesService } from '@categories/service/categories.service';
import { Flashcard } from '@flashcards/flashcard.model';
import { FlashcardsService } from '@flashcards/service/flashcards.service';
import { GroupsService } from '@groups/service/groups.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-edit-flashcard',
  templateUrl: './edit-flashcard.component.html',
  styleUrls: ['./edit-flashcard.component.scss']
})
export class EditFlashcardComponent implements OnInit {
  @Input() flashcard?: Flashcard;

  readonly flashcardForm: FormGroup;

  readonly categories$: Observable<string[]>;
  readonly groups$: Observable<string[]>;

  constructor(
    private readonly flashcardsService: FlashcardsService,
    private readonly categoriesService: CategoriesService,
    private readonly authService: AuthService,
    private readonly activeModal: NgbActiveModal,
    private readonly toastrService: ToastrService,
    private readonly groupsService: GroupsService
  ) {
    this.flashcardForm = new FormGroup({
      question: this.questionControl,
      answer: this.answerControl,
      category: this.categoryControl,
      group: this.groupControl,
      private: this.privateControl
    });

    this.categories$ = this.categoriesService
      .all()
      .pipe(map(categories => categories.map(category => category.title)));

    this.groups$ = this.authService.uid$.pipe(
      switchMap(id => this.groupsService.allByUser(id)),
      map(groups => groups.map(group => group.title))
    );
  }

  ngOnInit(): void {
    this.flashcardForm.patchValue({
      question: this.flashcard?.question,
      answer: this.flashcard?.answer,
      category: this.flashcard?.category,
      group: this.flashcard?.group,
      private: this.flashcard?.isPrivate
    });
  }

  edit(): void {
    if (this.flashcard) {
      const editedFlashcard = new Flashcard(
        this.questionControl.value,
        this.answerControl.value,
        this.categoryControl.value,
        this.flashcard?.authorId,
        this.privateControl.value,
        this.groupControl.value,
        this.flashcard?.authorName,
        this.flashcard?.id
      );

      this.flashcardsService.updateFlashcard(editedFlashcard).then(() => {
        this.activeModal.close();
        this.toastrService.success('Flashcard edited');
      });
    }
  }

  private readonly questionControl = new FormControl(undefined, [
    Validators.required
  ]);
  private readonly answerControl = new FormControl(undefined, [
    Validators.required
  ]);
  private readonly categoryControl = new FormControl(undefined, [
    Validators.required
  ]);
  private readonly groupControl = new FormControl(undefined, [
    Validators.required
  ]);
  private readonly privateControl = new FormControl(false, [
    Validators.required
  ]);
}
