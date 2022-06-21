import { TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { DecksService } from '@decks/service/decks.service';
import { environment } from 'src/environments/environment';

describe('DecksService', () => {
  let service: DecksService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DecksService,
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase
        }
      ]
    });
    service = TestBed.inject(DecksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
