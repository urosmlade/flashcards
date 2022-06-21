import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth/service/auth.service';
import { OneComponent } from '@decks/one/one.component';
import { FlashcardsService } from '@flashcards/service/flashcards.service';
import { environment } from 'src/environments/environment';

describe('OneComponent', () => {
  let component: OneComponent;
  let fixture: ComponentFixture<OneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OneComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        FlashcardsService,
        AuthService,
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
