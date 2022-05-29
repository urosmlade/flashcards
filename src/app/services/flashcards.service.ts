import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Flashcard } from '../flashcard.model';
import { Category } from '../flashcards/category.model';
import { Group } from '../flashcards/group.model';

@Injectable()
export class FlashcardsService {
  constructor(private readonly db: AngularFirestore) {}

  getPublicFlashcards(): Observable<Flashcard[]> {
    return this.db
      .collection('Flashcards', (q) => q.where('private', '==', false))
      .valueChanges()
      .pipe(
        map((flashcards: any[]) =>
          flashcards.map((flaschard) =>
            FlashcardsService.toFlashcard(flaschard)
          )
        )
      );
  }

  getPrivateFlashcardsForLoggedInUser(userId: string): Observable<Flashcard[]> {
    return this.db
      .collection('Flashcards', (q) =>
        q.where('author_id', '==', userId).where('private', '==', true)
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
      question: flashcard.question,
      answer: flashcard.answer,
      category: flashcard.category,
      author_id: flashcard.authorId,
      author_name: flashcard.authorName,
      private: flashcard.isPrivate,
      group: flashcard.group,
      id: id,
    };

    return new Promise<any>((resolve, reject) => {
      this.db.collection('Flashcards').doc(id).set(f);
    });
  }

  removeFlashcard(id: string) {
    return this.db.collection('Flashcards').doc(id).delete();
  }

  getGroups(userId: string) {
    return this.db
      .collection('Groups', (q) => q.where('author_id', '==', userId))
      .valueChanges()
      .pipe(
        map((groups: any[]) =>
          groups.map((group) => FlashcardsService.toGroup(group))
        )
      );
  }

  getCategories() {
    return this.db
      .collection('Categories')
      .valueChanges()
      .pipe(
        map((categories: any[]) =>
          categories.map((category) => FlashcardsService.toCategory(category))
        )
      );
  }

  addGroup(title: string, userId: string) {
    const group = {
      title: title,
      author_id: userId,
    };

    return new Promise<any>((resolve, reject) => {
      this.db.collection('Groups').add(group);
      resolve(group);
    });
  }

  updateFlashcard(flashcard: Flashcard) {
    return this.db.collection('Flashcards').doc(flashcard.id).set({
      id: flashcard.id,
      answer: flashcard.answer,
      author_id: flashcard.authorId,
      author_name: flashcard.authorName,
      category: flashcard.category,
      group: flashcard.group,
      private: flashcard.isPrivate,
      question: flashcard.question,
    });
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

  private static toGroup(obj: any): Group {
    return new Group(obj['title'], obj['author_id']);
  }

  private static toCategory(obj: any): Category {
    return new Category(obj['id'], obj['title']);
  }
}
