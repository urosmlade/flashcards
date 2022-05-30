import { ChangeDetectionStrategy, Component, Input, OnDestroy, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@auth/service/auth.service';
import { GroupsService } from '@groups/service/groups.service';
import { ToastrService } from 'ngx-toastr';
import { Observable, Subject, Subscription, switchMap, take } from 'rxjs';

@Component({
  selector: 'app-group-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddComponent implements OnDestroy {
  @Input() resetForm$?: Observable<boolean>;
  @Input() showCancelButton?: boolean;
  @Output() readonly added$: Observable<boolean>;
  @Output() readonly canceled$: Observable<boolean>;
  readonly groupForm: FormGroup;

  constructor(
    private readonly authService: AuthService,
    private readonly toastrService: ToastrService,
    private readonly groupsService: GroupsService
  ) {
    this.groupForm = new FormGroup({
      title: this.titleControl
    });

    this.added$ = this.addedSubject$.asObservable();
    this.canceled$ = this.canceledSubject$.asObservable();
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  addNewGroup(): void {
    this.subsink.add(
      this.authService.uid$
        .pipe(
          take(1),
          switchMap(id => this.groupsService.add(this.titleControl.value, id))
        )
        .subscribe(() => {
          this.toastrService.success('Group added');
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
