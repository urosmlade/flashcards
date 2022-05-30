import { Component, Input, OnDestroy } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { Flashcard } from '@flashcards/flashcard.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss']
})
export class CardDetailsComponent implements OnDestroy {
  @Input() flashcard?: Flashcard;

  constructor(
    private readonly router: Router,
    private readonly aciveModal: NgbActiveModal
  ) {
    this.subsink.add(
      this.router.events
        .pipe(filter(event => event instanceof NavigationStart))
        .subscribe(() => this.aciveModal.close())
    );
  }

  ngOnDestroy(): void {
    this.subsink.unsubscribe();
  }

  goToAuthorProfile(authorId: string): void {
    this.router.navigate(['user', authorId]);
  }

  goToCategory(categoryId: string): void {
    this.router.navigate(['categories', categoryId]);
  }

  private readonly subsink = new Subscription();
}
