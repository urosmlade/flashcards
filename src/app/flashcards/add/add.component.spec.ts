import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth/service/auth.service';
import { CategoriesService } from '@categories/service/categories.service';
import { DecksService } from '@decks/service/decks.service';
import { AddComponent } from '@flashcards/add/add.component';
import { FlashcardsService } from '@flashcards/service/flashcards.service';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddComponent],
      imports: [RouterTestingModule.withRoutes([]), ToastrModule.forRoot({})],
      providers: [
        FlashcardsService,
        CategoriesService,
        AuthService,
        DecksService,
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
