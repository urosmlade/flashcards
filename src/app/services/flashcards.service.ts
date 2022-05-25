import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Flashcard } from '../flashcard.model';

@Injectable()
export class FlashcardsService {
  constructor(private readonly db: AngularFirestore) {}

  getFlashcard() {
    return this.db.collection('Flashcards').valueChanges();
    // return this.db
    //   .collection('Flashcards', (ref) => ref.where('title', '==', 'cool title'))
    //   .valueChanges();
  }

  addFlashcard(flashcard: Flashcard) {
    console.log(flashcard);
    const f = {
      title: flashcard.title,
      answer: flashcard.answer,
      category: flashcard.category,
      id: flashcard.id,
    };
    return new Promise<any>((resolve, reject) => {
      this.db.collection('Flashcards').add(f);
    });
  }
}
