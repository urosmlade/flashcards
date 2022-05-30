import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '@categories/service/categories.service';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-categories-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {
  readonly categories$: Observable<string[]>;

  constructor(
    private readonly categoriesService: CategoriesService,
    private readonly router: Router
  ) {
    this.categories$ = this.categoriesService
      .all()
      .pipe(map(categories => categories.map(category => category.title)));
  }

  navigateToCategory(category: string): void {
    this.router.navigate(['categories', category]);
  }
}
