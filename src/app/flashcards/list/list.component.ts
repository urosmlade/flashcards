import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit
} from '@angular/core';
import { Flashcard } from '@flashcards/flashcard.model';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
  @Input() flashcards$?: Observable<Flashcard[]>;

  listNotEmpty$?: Observable<boolean>;

  ngOnInit() {
    this.listNotEmpty$ = this.flashcards$?.pipe(
      map(flashcards => flashcards.length !== 0)
    );
  }
}
