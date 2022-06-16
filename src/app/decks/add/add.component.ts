import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  Output
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth/service/auth.service';
import { DecksService } from '@decks/service/decks.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, Subscription, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-deck-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent implements OnDestroy {
  @Input() resetForm$?: Observable<boolean>;
  @Input() showCancelButton?: boolean;
  @Output() readonly added$: Observable<boolean>;
  @Output() readonly canceled$: Observable<boolean>;
  readonly deckForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly decksService: DecksService
  ) {
    this.deckForm = new FormGroup({
      title: this.titleControl
    });

    this.added$ = this.addedSubject$.asObservable();
    this.canceled$ = this.canceledSubject$.asObservable();
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  addNewDeck(): void {
    this.subsink.add(
      this.authService.uid$
        .pipe(
          take(1),
          switchMap(id => this.decksService.add(this.titleControl.value, id))
        )
        .subscribe(() => {
          this.toastrService.success('Deck added');
          this.addedSubject$.next(true);
        })
    );
  }

  cancel() {
    this.titleControl.reset();
    this.canceledSubject$.next(true);
  }

  private readonly addedSubject$ = new Subject<boolean>();
  private readonly canceledSubject$ = new Subject<boolean>();

  private readonly subsink = new Subscription();

  private readonly titleControl = new FormControl(undefined, [
    Validators.required
  ]);
}
