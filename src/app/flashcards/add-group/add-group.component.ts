import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FlashcardsService } from 'src/app/services/flashcards.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.scss'],
})
export class AddGroupComponent implements OnInit {
  readonly groupForm: FormGroup;

  constructor(
    private readonly flashcardsService: FlashcardsService,
    private readonly authService: AuthService
  ) {
    this.groupForm = new FormGroup({
      title: this.titleControl,
    });
  }

  ngOnInit(): void {}

  add() {
    this.authService.uid$
      .pipe(
        take(1),
        switchMap((id) =>
          this.flashcardsService.addGroup(this.titleControl.value, id)
        )
      )
      .subscribe();
  }

  private readonly titleControl = new FormControl(undefined, [
    Validators.required,
  ]);
}
