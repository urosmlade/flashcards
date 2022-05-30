import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SingleCardViewComponent } from './single-card-view.component';

describe('SingleCardViewComponent', () => {
  let component: SingleCardViewComponent;
  let fixture: ComponentFixture<SingleCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SingleCardViewComponent],
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
