import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Flashcard } from '../../flashcard.model';
import { CardDetailsComponent } from '../card-details/card-details.component';

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
