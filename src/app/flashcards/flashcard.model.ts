import { Deck } from '@flashcards/deck.model';

export class Flashcard {
  constructor(
    readonly question: string,
    readonly answer: string,
    readonly category: string,
    readonly authorId: string,
    readonly isPrivate: boolean,
    readonly deck: Deck,
    readonly authorName: string,
    readonly createdAt: Date,
    readonly id?: string
  ) {}
}
