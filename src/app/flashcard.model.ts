export class Flashcard {
  constructor(
    readonly question: string,
    readonly answer: string,
    readonly category: string,
    readonly authorId: string,
    readonly isPrivate: boolean,
    readonly group: string,
    readonly authorName?: string,
  ) {}
}
