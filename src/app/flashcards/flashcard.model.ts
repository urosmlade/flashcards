export class Flashcard {
  constructor(
    readonly question: string,
    readonly answer: string,
    readonly category: string,
    readonly authorId: string,
    readonly isPrivate: boolean,
    readonly groupId: string,
    readonly groupName: string,
    readonly authorName: string,
    readonly createdAt: Date,
    readonly id?: string
  ) {}
}
