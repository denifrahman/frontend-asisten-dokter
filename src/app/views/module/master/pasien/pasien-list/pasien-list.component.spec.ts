import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasienListComponent } from './pasien-list.component';

describe('PasienListComponent', () => {
  let component: PasienListComponent;
  let fixture: ComponentFixture<PasienListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasienListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasienListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
