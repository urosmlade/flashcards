import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth/service/auth.service';
import { CategoriesService } from '@categories/service/categories.service';
import { Flashcard } from '@flashcards/flashcard.model';
import { FlashcardsService } from '@flashcards/service/flashcards.service';
import { GroupsService } from '@groups/service/groups.service';
import { ToastrService } from 'ngx-toastr';
import {
  map,
  Observable,
  shareReplay,
  Subscription,
  switchMap,
  take
} from 'rxjs';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnDestroy {
  readonly flashcardForm: FormGroup;

  readonly categories$: Observable<string[]>;
  readonly groups$: Observable<string[]>;

  readonly noGroups$: Observable<boolean>;
  readonly groupsExist$: Observable<boolean>;

  constructor(
    private readonly flashcardsService: FlashcardsService,
    private readonly categoriesService: CategoriesService,
    private readonly authService: AuthService,
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
      map(groups => groups.map(group => group.title)),
      shareReplay(1)
    );

    this.noGroups$ = this.groups$.pipe(map(groups => groups.length === 0));
    this.groupsExist$ = this.groups$.pipe(map(groups => groups.length > 0));
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  add(): void {
    this.subsink.add(
      this.authService.userData$
        .pipe(
          take(1),
          switchMap(({ uid, displayName }) => {
            const flashcard = new Flashcard(
              this.questionControl.value,
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
          this.questionControl.reset();
          this.answerControl.reset();
        })
    );
  }

  private readonly subsink = new Subscription();

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
