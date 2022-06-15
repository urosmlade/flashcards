import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Flashcard } from '@flashcards/flashcard.model';
import { Group } from '@flashcards/group.model';
import { map, Observable } from 'rxjs';

@Injectable()
export class FlashcardsService {
  constructor(private readonly db: AngularFirestore) {}

  latestFlashcards(): Observable<Flashcard[]> {
    return this.db
      .collection('Flashcards', q =>
        q.where('private', '==', false).orderBy('created_at', 'desc').limit(10)
      )
      .valueChanges()
      .pipe(map(FlashcardsService.toFlashcardArray));
  }

  getPublicFlashcardsForSelectedCategory(
    categoryId: string
  ): Observable<Flashcard[]> {
    return this.db
      .collection('Flashcards', q =>
        q.where('category', '==', categoryId).where('private', '==', false)
      )
      .valueChanges()
      .pipe(map(FlashcardsService.toFlashcardArray));
  }

  getPrivateFlashcardsForSelectedCategoryByLoggedInUser(
    categoryId: string,
    userId: string
  ): Observable<Flashcard[]> {
    return this.db
      .collection('Flashcards', q =>
        q
          .where('category', '==', categoryId)
          .where('author_id', '==', userId)
          .where('private', '==', true)
      )
      .valueChanges()
      .pipe(map(FlashcardsService.toFlashcardArray));
  }

  getFlashcardsForSelectedGroup(
    groupId: string,
    userId: string
  ): Observable<Flashcard[]> {
    return this.db
      .collection('Flashcards', q =>
        q.where('author_id', '==', userId).where('group_id', '==', groupId)
      )
      .valueChanges()
      .pipe(map(FlashcardsService.toFlashcardArray));
  }

  getFlashcardsByUser(authorId: string): Observable<Flashcard[]> {
    return this.db
      .collection('Flashcards', q =>
        q.where('author_id', '==', authorId).where('private', '==', false)
      )
      .valueChanges()
      .pipe(map(FlashcardsService.toFlashcardArray));
  }

  getAuthorData(authorId: string) {
    return this.db
      .collection('Users', q => q.where('uid', '==', authorId))
      .get();
  }

  add(flashcard: Flashcard): Promise<any> {
    const id = this.db.createId();

    const f = {
      'question': flashcard.question.trim(),
      'answer': flashcard.answer.trim(),
      'category': flashcard.category,
      'author_id': flashcard.authorId,
      'author_name': flashcard.authorName,
      'private': flashcard.isPrivate,
      'group_id': flashcard.group.id,
      'group_name': flashcard.group.name,
      'id': id,
      'created_at': flashcard.createdAt
    };

    return new Promise<any>((resolve, reject) => {
      this.db.collection('Flashcards').doc(id).set(f);
      resolve('');
    });
  }

  updateFlashcard(flashcard: Flashcard): Promise<void> {
    return this.db.collection('Flashcards').doc(flashcard.id).set({
      'question': flashcard.question.trim(),
      'answer': flashcard.answer.trim(),
      'category': flashcard.category,
      'author_id': flashcard.authorId,
      'author_name': flashcard.authorName,
      'private': flashcard.isPrivate,
      'group_id': flashcard.group.id,
      'group_name': flashcard.group.name,
      'id': flashcard.id,
      'created_at': flashcard.createdAt
    });
  }

  removeFlashcard(id: string): Promise<void> {
    return this.db.collection('Flashcards').doc(id).delete();
  }

  private static toFlashcardArray(flashcards: any[]): Flashcard[] {
    return flashcards.map(flashcard =>
      FlashcardsService.toFlashcard(flashcard)
    );
  }

  private static toGroup(obj: any): Group {
    return new Group(obj['id'], obj['group_name'], obj['author_id']);
  }

  private static toFlashcard(obj: any): Flashcard {
    return new Flashcard(
      obj['question'],
      obj['answer'],
      obj['category'],
      obj['author_id'],
      obj['private'],
      FlashcardsService.toGroup(obj),
      obj['author_name'],
      obj['created_at'],
      obj['id']
    );
  }
}
