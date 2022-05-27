import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { Flashcard } from '../flashcard.model';
import { Group } from '../flashcards/group.model';

@Injectable()
export class FlashcardsService {
  constructor(private readonly db: AngularFirestore) {}

  getFlashcard(): Observable<Flashcard[]> {
    return this.db
      .collection('Flashcards')
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
          flashcards.map((flashcard) =>
            FlashcardsService.toFlashcard(flashcard)
          )
        )
      );
  }

  addFlashcard(flashcard: Flashcard) {
    console.log(flashcard);
    const f = {
      title: flashcard.title,
      answer: flashcard.answer,
      category: flashcard.category,
      author_id: flashcard.authorId,
      private: flashcard.isPrivate,
      group: flashcard.group,
    };
    return new Promise<any>((resolve, reject) => {
      this.db.collection('Flashcards').add(f);
    });
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

  addGroup(title: string, userId: string) {
    const group = {
      title: title,
      author_id: userId,
    };

    return new Promise<any>((resolve, reject) => {
      this.db.collection('Groups').add(group);
    });
  }

  private static toFlashcard(obj: any): Flashcard {
    return new Flashcard(
      obj['title'],
      obj['answer'],
      obj['category'],
      obj['author_id'],
      obj['private'],
      obj['group']
    );
  }

  private static toGroup(obj: any): Group {
    return new Group(obj['title'], obj['author_id']);
  }
}
