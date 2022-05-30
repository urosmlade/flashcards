import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Category } from '@flashcards/category.model';
import { map, Observable } from 'rxjs';

@Injectable()
export class CategoriesService {
  constructor(private readonly db: AngularFirestore) {}

  all(): Observable<Category[]> {
    return this.db
      .collection('Categories')
      .valueChanges()
      .pipe(
        map((categories: any[]) =>
          categories.map(category => CategoriesService.toCategory(category))
        )
      );
  }

  private static toCategory(obj: any): Category {
    return new Category(obj['id'], obj['title']);
  }
}
