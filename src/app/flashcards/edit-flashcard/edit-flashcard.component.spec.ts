import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditFlashcardComponent } from '@flashcards/edit-flashcard/edit-flashcard.component';

describe('EditFlashcardComponent', () => {
  let component: EditFlashcardComponent;
  let fixture: ComponentFixture<EditFlashcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFlashcardComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditFlashcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
