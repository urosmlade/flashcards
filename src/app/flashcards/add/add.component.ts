import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { FlashcardsService } from 'src/app/services/flashcards.service';
import { Group } from '../group.model';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss'],
})
export class AddComponent {
  readonly groups$: Observable<Group[]>;

  readonly addGroup$: Observable<boolean>;
  readonly addFlashcard$: Observable<boolean>;

  constructor(
    private readonly modal: NgbModal,
    private readonly flashcardsService: FlashcardsService,
    private readonly authService: AuthService
  ) {
    this.groups$ = this.authService.uid$.pipe(
      switchMap((id) => this.flashcardsService.getGroups(id))
    );

    this.addGroup$ = this.addGroupSubject$.asObservable();
    this.addFlashcard$ = this.addGroupSubject$.pipe(map((a) => !a));
  }

  showAddGroupForm() {
    this.addGroupSubject$.next(true);
  }

  showAddFlashcardForm() {
    this.addGroupSubject$.next(false);
  }

  private readonly addGroupSubject$ = new BehaviorSubject<boolean>(true);
}
