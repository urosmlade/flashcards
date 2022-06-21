import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth/service/auth.service';
import { CategoriesService } from '@categories/service/categories.service';
import { DecksService } from '@decks/service/decks.service';
import { EditFlashcardComponent } from '@flashcards/edit-flashcard/edit-flashcard.component';
import { FlashcardsService } from '@flashcards/service/flashcards.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

describe('EditFlashcardComponent', () => {
  let component: EditFlashcardComponent;
  let fixture: ComponentFixture<EditFlashcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EditFlashcardComponent],
      imports: [RouterTestingModule.withRoutes([]), ToastrModule.forRoot({})],
      providers: [
        FlashcardsService,
        CategoriesService,
        AuthService,
        NgbActiveModal,
        DecksService,
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase
        }
      ]
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
