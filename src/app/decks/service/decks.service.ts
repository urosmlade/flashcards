import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Deck } from '@flashcards/deck.model';
import { map, Observable } from 'rxjs';

@Injectable()
export class DecksService {
  constructor(private readonly db: AngularFirestore) {}

  allByUser(userId: string): Observable<Deck[]> {
    return this.db
      .collection('Decks', q => q.where('author_id', '==', userId))
      .valueChanges()
      .pipe(
        map((decks: any[]) => decks.map(decks => DecksService.toDeck(decks)))
      );
  }

  add(name: string, userId: string): Promise<any> {
    const id = this.db.createId();

    const deck = {
      name: name.trim(),
      author_id: userId,
      id: id
    };

    return new Promise<any>((resolve, reject) => {
      this.db.collection('Decks').doc(id).set(deck);
      resolve(deck);
    });
  }

  private static toDeck(obj: any): Deck {
    return new Deck(obj['id'], obj['name'], obj['author_id']);
  }
}
