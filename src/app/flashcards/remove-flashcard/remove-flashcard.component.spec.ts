import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { RemoveFlashcardComponent } from '@flashcards/remove-flashcard/remove-flashcard.component';
import { FlashcardsService } from '@flashcards/service/flashcards.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

describe('RemoveFlashcardComponent', () => {
  let component: RemoveFlashcardComponent;
  let fixture: ComponentFixture<RemoveFlashcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RemoveFlashcardComponent],
      imports: [ToastrModule.forRoot({})],
      providers: [
        FlashcardsService,
        NgbActiveModal,
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase
        }
      ]
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
