import { TestBed } from '@angular/core/testing';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { CategoriesService } from '@categories/service/categories.service';
import { environment } from 'src/environments/environment';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CategoriesService,
        {
          provide: FIREBASE_OPTIONS,
          useValue: environment.firebase
        }
      ]
    });
    service = TestBed.inject(CategoriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
