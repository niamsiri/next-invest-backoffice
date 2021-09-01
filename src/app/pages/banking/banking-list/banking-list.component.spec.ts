import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingListComponent } from './banking-list.component';

describe('BankingListComponent', () => {
  let component: BankingListComponent;
  let fixture: ComponentFixture<BankingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
