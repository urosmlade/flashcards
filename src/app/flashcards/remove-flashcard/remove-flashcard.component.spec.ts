import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RemoveFlashcardComponent } from '@flashcards/remove-flashcard/remove-flashcard.component';

describe('RemoveFlashcardComponent', () => {
  let component: RemoveFlashcardComponent;
  let fixture: ComponentFixture<RemoveFlashcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveFlashcardComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RemoveFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
