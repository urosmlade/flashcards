import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth/service/auth.service';
import { GroupsService } from '@groups/service/groups.service';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

@Component({
  selector: 'app-groups-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  readonly groups$: Observable<string[]>;

  readonly formHidden$: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly groupsService: GroupsService,
    private readonly router: Router
  ) {
    this.groups$ = this.authService.uid$.pipe(
      switchMap(id => this.groupsService.allByUser(id)),
      map(groups => groups.map(group => group.title))
    );

    this.formHidden$ = this.formHiddenSubject$.asObservable();
  }

  navigateToGroup(group: string): void {
    this.router.navigate(['groups', group]);
  }

  showAddGroupForm(): void {
    this.formHiddenSubject$.next(false);
  }

  hideAddGroupForm(): void {
    this.formHiddenSubject$.next(true);
  }

  groupAdded(): void {
    this.hideAddGroupForm();
  }

  addingCanceled(): void {
    this.hideAddGroupForm();
  }

  private readonly formHiddenSubject$ = new BehaviorSubject<boolean>(true);
}
