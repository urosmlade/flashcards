import { Group } from '@flashcards/group.model';

export class Flashcard {
  constructor(
    readonly question: string,
    readonly answer: string,
    readonly category: string,
    readonly authorId: string,
    readonly isPrivate: boolean,
    readonly group: Group,
    readonly authorName: string,
    readonly createdAt: Date,
    readonly id?: string
  ) {}
}
