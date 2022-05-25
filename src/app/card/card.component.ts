import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardDetailsComponent } from '../card-details/card-details.component';
import { Flashcard } from '../flashcard.model';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
})
export class CardComponent implements OnInit {
  @Input() flashcard?: Flashcard;

  constructor(private readonly modal: NgbModal) {}

  ngOnInit(): void {}

  openCardDetailsModal() {
    const modalRef = this.modal.open(CardDetailsComponent);

    modalRef.componentInstance.flashcard = this.flashcard;
  }
}
