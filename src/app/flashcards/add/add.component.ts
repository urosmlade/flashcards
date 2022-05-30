import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { map, Observable, shareReplay, switchMap, take } from 'rxjs';
import { Flashcard } from 'src/app/flashcard.model';
import { AuthService } from 'src/app/services/auth.service';
import { FlashcardsService } from 'src/app/services/flashcards.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  readonly flashcardForm: FormGroup;

  readonly categories$: Observable<string[]>;
  readonly groups$: Observable<string[]>;

  readonly noGroups$: Observable<boolean>;
  readonly groupsExist$: Observable<boolean>;

  constructor(
    private readonly flashcardsService: FlashcardsService,
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService
  ) {
    this.flashcardForm = new FormGroup({
      title: this.titleControl,
      answer: this.answerControl,
      category: this.categoryControl,
      group: this.groupControl,
      private: this.privateControl,
    });

    this.categories$ = this.flashcardsService
      .getCategories()
      .pipe(map((categories) => categories.map((category) => category.title)));

    this.groups$ = this.authService.uid$.pipe(
      switchMap((id) => this.flashcardsService.getGroups(id)),
      map((groups) => groups.map((group) => group.title)),
      shareReplay(1)
    );

    this.noGroups$ = this.groups$.pipe(map((groups) => groups.length === 0));
    this.groupsExist$ = this.groups$.pipe(map((groups) => groups.length > 0));
  }

  ngOnInit(): void {}

  add() {
    this.authService.userData$
      .pipe(
        take(1),
        switchMap(({ uid, displayName }) => {
          const flashcard = new Flashcard(
            this.titleControl.value,
            this.answerControl.value,
            this.categoryControl.value,
            uid,
            this.privateControl.value,
            this.groupControl.value,
            displayName ?? undefined
          );

          return this.flashcardsService.addFlashcard(flashcard);
        })
      )
      .subscribe(() => {
        this.toastrService.success('Flashcard added');
        this.flashcardForm.reset();
      });
  }

  private readonly titleControl = new FormControl(undefined, [
    Validators.required,
  ]);
  private readonly answerControl = new FormControl(undefined, [
    Validators.required,
  ]);
  private readonly categoryControl = new FormControl(undefined, [
    Validators.required,
  ]);
  private readonly groupControl = new FormControl(undefined, [
    Validators.required,
  ]);
  private readonly privateControl = new FormControl(false, [
    Validators.required,
  ]);
}
