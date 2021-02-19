import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasienEditComponent } from './pasien-edit.component';

describe('PasienEditComponent', () => {
  let component: PasienEditComponent;
  let fixture: ComponentFixture<PasienEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasienEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasienEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
