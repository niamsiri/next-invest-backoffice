import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingAddComponent } from './banking-add.component';

describe('BankingAddComponent', () => {
  let component: BankingAddComponent;
  let fixture: ComponentFixture<BankingAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankingAddComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankingAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
