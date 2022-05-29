import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FlashcardsService } from 'src/app/services/flashcards.service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.scss'],
})
export class GroupsComponent implements OnInit {
  readonly groupForm: FormGroup;
  readonly groups$: Observable<string[]>;

  readonly formHidden$: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly flashcardsService: FlashcardsService,
    private readonly router: Router
  ) {
    this.groupForm = new FormGroup({
      title: this.titleControl,
    });

    this.groups$ = this.authService.uid$.pipe(
      switchMap((id) => this.flashcardsService.getGroups(id)),
      map((groups) => groups.map((group) => group.title))
    );

    this.formHidden$ = this.formHiddenSubject$.asObservable();
  }

  ngOnInit(): void {}

  navigateToGroup(group: string) {
    this.router.navigate(['groups', group]);
  }

  showAddGroupForm() {
    this.formHiddenSubject$.next(false);
  }

  hideAddGroupForm() {
    this.formHiddenSubject$.next(true);
    this.groupForm.reset();
  }

  addNewGroup() {
    this.authService.uid$
      .pipe(
        take(1),
        switchMap((id) =>
          this.flashcardsService.addGroup(this.titleControl.value, id)
        )
      )
      .subscribe(() => {
        this.hideAddGroupForm();
      });
  }

  private readonly titleControl = new FormControl(undefined, [
    Validators.required,
  ]);

  private readonly formHiddenSubject$ = new BehaviorSubject<boolean>(true);
}
