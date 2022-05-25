import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { AddComponent } from '../add/add.component';
import { AuthService } from '../services/auth.service';
import { FlashcardsService } from '../services/flashcards.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  readonly flashcards$: Observable<any>;
  constructor(
    public authService: AuthService,
    private flashcardService: FlashcardsService,
    private readonly modal: NgbModal
  ) {
    this.flashcards$ = this.flashcardService.getFlashcard();
  }

  ngOnInit(): void {}

  openAddFlashcardModal() {
    const modalRef = this.modal.open(AddComponent);
  }
}
