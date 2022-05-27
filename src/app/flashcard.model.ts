export class Flashcard {
  constructor(
    readonly title: string,
    readonly answer: string,
    readonly category: string,
    readonly authorId: string,
    readonly isPrivate: boolean,
    readonly group: string
  ) {}
}
