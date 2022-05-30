import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Flashcard } from '../flashcard.model';

@Injectable()
export class FlashcardsService {
  constructor(private readonly db: AngularFirestore) {}

  latestFlashcards(): Observable<Flashcard[]> {
    return this.db
      .collection('Flashcards', (q) =>
        q.where('private', '==', false).orderBy('created_at', 'desc').limit(10)
      )
      .valueChanges()
      .pipe(
        map((flashcards: any[]) =>
          flashcards.map((flaschard) =>
            FlashcardsService.toFlashcard(flaschard)
          )
        )
      );
  }

  getPublicFlashcardsForSelectedCategory(
    categoryId: string
  ): Observable<Flashcard[]> {
    return this.db
      .collection('Flashcards', (q) =>
        q.where('category', '==', categoryId).where('private', '==', false)
      )
      .valueChanges()
      .pipe(
        map((flashcards: any[]) =>
          flashcards.map((flaschard) =>
            FlashcardsService.toFlashcard(flaschard)
          )
        )
      );
  }

  getPrivateFlashcardsForSelectedCategoryByLoggedInUser(
    categoryId: string,
    userId: string
  ): Observable<Flashcard[]> {
    return this.db
      .collection('Flashcards', (q) =>
        q
          .where('category', '==', categoryId)
          .where('author_id', '==', userId)
          .where('private', '==', true)
      )
      .valueChanges()
      .pipe(
        map((flashcards: any[]) =>
          flashcards.map((flaschard) =>
            FlashcardsService.toFlashcard(flaschard)
          )
        )
      );
  }

  getFlashcardsForSelectedGroup(
    groupId: string,
    userId: string
  ): Observable<Flashcard[]> {
    return this.db
      .collection('Flashcards', (q) =>
        q.where('author_id', '==', userId).where('group', '==', groupId)
      )
      .valueChanges()
      .pipe(
        map((flashcards: any[]) =>
          flashcards.map((flashcard) =>
            FlashcardsService.toFlashcard(flashcard)
          )
        )
      );
  }

  getFlashcardsForLoggedInUser(userId: string): Observable<Flashcard[]> {
    return this.db
      .collection('Flashcards', (q) => q.where('author_id', '==', userId))
      .valueChanges()
      .pipe(
        map((flashcards: any[]) =>
          flashcards.map((flaschard) =>
            FlashcardsService.toFlashcard(flaschard)
          )
        )
      );
  }

  getFlashcardsByAnotherUser(authorId: string) {
    return this.db
      .collection('Flashcards', (q) =>
        q.where('author_id', '==', authorId).where('private', '==', false)
      )
      .valueChanges()
      .pipe(
        map((flashcards: any[]) =>
          flashcards.map((flaschard) =>
            FlashcardsService.toFlashcard(flaschard)
          )
        )
      );
  }

  getAuthorData(authorId: string) {
    return this.db
      .collection('users', (q) => q.where('uid', '==', authorId))
      .get();
  }

  addFlashcard(flashcard: Flashcard) {
    const id = this.db.createId();

    const f = {
      question: flashcard.question.trim(),
      answer: flashcard.answer.trim(),
      category: flashcard.category,
      author_id: flashcard.authorId,
      author_name: flashcard.authorName,
      private: flashcard.isPrivate,
      group: flashcard.group,
      id: id,
      created_at: new Date(),
    };

    return new Promise<any>((resolve, reject) => {
      this.db.collection('Flashcards').doc(id).set(f);
      resolve('');
    });
  }

  updateFlashcard(flashcard: Flashcard) {
    return this.db.collection('Flashcards').doc(flashcard.id).set({
      id: flashcard.id,
      answer: flashcard.answer.trim(),
      author_id: flashcard.authorId,
      author_name: flashcard.authorName,
      category: flashcard.category,
      group: flashcard.group,
      private: flashcard.isPrivate,
      question: flashcard.question.trim(),
    });
  }

  removeFlashcard(id: string) {
    return this.db.collection('Flashcards').doc(id).delete();
  }

  private static toFlashcard(obj: any): Flashcard {
    return new Flashcard(
      obj['question'],
      obj['answer'],
      obj['category'],
      obj['author_id'],
      obj['private'],
      obj['group'],
      obj['author_name'],
      obj['id']
    );
  }
}
