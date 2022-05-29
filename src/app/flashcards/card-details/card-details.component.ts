import { Component, Input, OnInit } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { filter } from 'rxjs';
import { Flashcard } from '../../flashcard.model';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  @Input() flashcard?: Flashcard;

  constructor(
    private readonly router: Router,
    private readonly aciveModal: NgbActiveModal
  ) {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationStart))
      .subscribe(() => this.aciveModal.close());
  }

  ngOnInit(): void {}

  goToAuthorProfile(authorId: string) {
    this.router.navigate(['user', authorId]);
  }
}
