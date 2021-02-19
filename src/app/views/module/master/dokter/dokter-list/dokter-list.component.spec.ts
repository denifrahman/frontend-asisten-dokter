import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DokterListComponent } from './dokter-list.component';

describe('DokterListComponent', () => {
  let component: DokterListComponent;
  let fixture: ComponentFixture<DokterListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DokterListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DokterListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
