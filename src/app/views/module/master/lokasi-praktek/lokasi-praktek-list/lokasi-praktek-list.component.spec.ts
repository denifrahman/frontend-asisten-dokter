import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LokasiPraktekListComponent } from './lokasi-praktek-list.component';

describe('LokasiPraktekListComponent', () => {
  let component: LokasiPraktekListComponent;
  let fixture: ComponentFixture<LokasiPraktekListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LokasiPraktekListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LokasiPraktekListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
