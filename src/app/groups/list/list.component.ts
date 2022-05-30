import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/app/auth/service/auth.service';
import { GroupsService } from '../service/groups.service';

@Component({
  selector: 'app-groups-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  readonly groups$: Observable<string[]>;

  readonly formHidden$: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly groupsService: GroupsService,
    private readonly router: Router
  ) {
    this.groups$ = this.authService.uid$.pipe(
      switchMap((id) => this.groupsService.allByUser(id)),
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
  }

  groupAdded() {
    this.hideAddGroupForm();
  }

  addingCanceled() {
    this.hideAddGroupForm();
  }

  private readonly formHiddenSubject$ = new BehaviorSubject<boolean>(true);
}
