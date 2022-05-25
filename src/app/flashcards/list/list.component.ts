import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { FlashcardsService } from 'src/app/services/flashcards.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  readonly flashcards$: Observable<any>;
  constructor(
    private readonly flashcardService: FlashcardsService,
    private readonly modal: NgbModal
  ) {
    this.flashcards$ = this.flashcardService.getFlashcard();
  }
  ngOnInit(): void {}
}
