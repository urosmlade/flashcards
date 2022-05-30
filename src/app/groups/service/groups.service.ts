import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Group } from '@flashcards/group.model';
import { map, Observable } from 'rxjs';

@Injectable()
export class GroupsService {
  constructor(private readonly db: AngularFirestore) {}

  allByUser(userId: string): Observable<Group[]> {
    return this.db
      .collection('Groups', q => q.where('author_id', '==', userId))
      .valueChanges()
      .pipe(
        map((groups: any[]) =>
          groups.map(group => GroupsService.toGroup(group))
        )
      );
  }

  add(title: string, userId: string): Promise<any> {
    const id = this.db.createId();

    const group = {
      title: title.trim(),
      author_id: userId,
      id: id
    };

    return new Promise<any>((resolve, reject) => {
      this.db.collection('Groups').doc(id).set(group);
      resolve(group);
    });
  }

  private static toGroup(obj: any): Group {
    return new Group(obj['id'], obj['title'], obj['author_id']);
  }
}
