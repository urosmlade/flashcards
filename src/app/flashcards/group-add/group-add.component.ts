import { Component, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subject, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FlashcardsService } from 'src/app/services/flashcards.service';

@Component({
  selector: 'app-group-add',
  templateUrl: './group-add.component.html',
  styleUrls: ['./group-add.component.scss'],
})
export class GroupAddComponent implements OnInit {
  @Input() resetForm$?: Observable<boolean>;
  @Input() showCancelButton?: boolean;
  @Output() readonly added$: Observable<boolean>;
  @Output() readonly canceled$: Observable<boolean>;
  readonly groupForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly flashcardsService: FlashcardsService
  ) {
    this.groupForm = new FormGroup({
      title: this.titleControl,
    });

    this.added$ = this.addedSubject$.asObservable();
    this.canceled$ = this.canceledSubject$.asObservable();
  }

  ngOnInit(): void {}

  addNewGroup() {
    this.authService.uid$
      .pipe(
        take(1),
        switchMap((id) =>
          this.flashcardsService.addGroup(this.titleControl.value, id)
        )
      )
      .subscribe(() => {
        this.addedSubject$.next(true);
      });
  }

  cancel() {
    this.titleControl.reset();
    this.canceledSubject$.next(true);
  }

  private readonly addedSubject$ = new Subject<boolean>();
  private readonly canceledSubject$ = new Subject<boolean>();
  private readonly titleControl = new FormControl(undefined, [
    Validators.required,
  ]);
}
