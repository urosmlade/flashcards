import { Component, Input, OnInit } from '@angular/core';
import { Flashcard } from '../../flashcard.model';

@Component({
  selector: 'app-card-details',
  templateUrl: './card-details.component.html',
  styleUrls: ['./card-details.component.scss'],
})
export class CardDetailsComponent implements OnInit {
  @Input() flashcard?: Flashcard;

  constructor() {}

  ngOnInit(): void {}
}
