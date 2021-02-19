import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LokasiPraktekAddComponent } from './lokasi-praktek-add.component';

describe('LokasiPraktekAddComponent', () => {
  let component: LokasiPraktekAddComponent;
  let fixture: ComponentFixture<LokasiPraktekAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LokasiPraktekAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LokasiPraktekAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
