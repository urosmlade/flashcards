import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@auth/service/auth.service';
import { SingleCardViewComponent } from '@flashcards/single-card-view/single-card-view.component';
import { environment } from 'src/environments/environment';

describe('SingleCardViewComponent', () => {
  let component: SingleCardViewComponent;
  let fixture: ComponentFixture<SingleCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleCardViewComponent],
      imports: [RouterTestingModule.withRoutes([])],
      providers: [
        AuthService,
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase
        }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
