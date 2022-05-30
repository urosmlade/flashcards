import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Flashcard } from '@flashcards/flashcard.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent {
  @Input() flashcards$?: Observable<Flashcard[]>;
}
