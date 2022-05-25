export class Flashcard {
  constructor(
    readonly title: string,
    readonly answer: string,
    readonly category: string,
    readonly id?: string
  ) {}
}
