import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Deck } from '@flashcards/deck.model';
import { Flashcard } from '@flashcards/flashcard.model';
import { FlashcardsService } from '@flashcards/service/flashcards.service';
import { of, take } from 'rxjs';
import { HomeComponent } from 'src/app/flashcards/home/home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeComponent],
      providers: [
        AngularFirestore,
        {
          provide: FlashcardsService,
          useValue: {
            latestFlashcards: () => flashcardsObj
          }
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('flashcards$', () => {
    it('should have flashcards', () => {
      component.flashcards$
        .pipe(take(1))
        .subscribe(f => expect(f).toEqual([flashcard]));
    });
  });

  const flashcard = new Flashcard(
    'question 1',
    'answer 1',
    'category',
    '1',
    false,
    new Deck('deck1', 'Deck', '1'),
    'John Doe',
    new Date(2022, 10, 5, 0, 0, 0, 0),
    '100'
  );

  const flashcardsObj = of([flashcard]);
});
