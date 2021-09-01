import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankingEditComponent } from './banking-edit.component';

describe('BankingEditComponent', () => {
  let component: BankingEditComponent;
  let fixture: ComponentFixture<BankingEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankingEditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankingEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
