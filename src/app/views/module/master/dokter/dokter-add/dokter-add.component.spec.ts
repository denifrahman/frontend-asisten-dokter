import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokterAddComponent } from './dokter-add.component';

describe('DokterAddComponent', () => {
  let component: DokterAddComponent;
  let fixture: ComponentFixture<DokterAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokterAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokterAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
