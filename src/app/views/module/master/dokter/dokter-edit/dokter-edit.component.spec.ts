import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokterEditComponent } from './dokter-edit.component';

describe('DokterEditComponent', () => {
  let component: DokterEditComponent;
  let fixture: ComponentFixture<DokterEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokterEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokterEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
