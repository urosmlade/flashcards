import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Deck } from '@flashcards/deck.model';
import { Flashcard } from '@flashcards/flashcard.model';
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

  getFlashcardsForSelectedDeck(
    deckId: string,
    userId: string
  ): Observable<Flashcard[]> {
    return this.db
      .collection('Flashcards', q =>
        q.where('author_id', '==', userId).where('deck_id', '==', deckId)
      )
      .valueChanges()
      .pipe(map(FlashcardsService.toFlashcardArray));
  }

  getFlashcardsForLoggedInUser(userId: string): Observable<Flashcard[]> {
    return this.db
      .collection('Flashcards', q => q.where('author_id', '==', userId))
      .valueChanges()
      .pipe(map(FlashcardsService.toFlashcardArray));
  }

  getFlashcardsByAnotherUser(authorId: string): Observable<Flashcard[]> {
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
      'deck_id': flashcard.deck.id,
      'deck_name': flashcard.deck.name,
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
      'deck_id': flashcard.deck.id,
      'deck_name': flashcard.deck.name,
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

  private static toDeck(obj: any): Deck {
    return new Deck(obj['deck_id'], obj['deck_name'], obj['author_id']);
  }

  private static toFlashcard(obj: any): Flashcard {
    return new Flashcard(
      obj['question'],
      obj['answer'],
      obj['category'],
      obj['author_id'],
      obj['private'],
      FlashcardsService.toDeck(obj),
      obj['author_name'],
      obj['created_at'],
      obj['id']
    );
  }
}
