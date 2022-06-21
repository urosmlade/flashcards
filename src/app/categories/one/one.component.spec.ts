import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth/service/auth.service';
import { OneComponent } from '@categories/one/one.component';
import { FlashcardsService } from '@flashcards/service/flashcards.service';
import { of } from 'rxjs';
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
        },
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({
              'id': '1'
            })
          }
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
