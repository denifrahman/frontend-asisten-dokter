import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LokasiPraktekEditComponent } from './lokasi-praktek-edit.component';

describe('LokasiPraktekEditComponent', () => {
  let component: LokasiPraktekEditComponent;
  let fixture: ComponentFixture<LokasiPraktekEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LokasiPraktekEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LokasiPraktekEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
