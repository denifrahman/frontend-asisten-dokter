import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTablePasienComponent } from './popup-table-pasien.component';

describe('PopupTablePasienComponent', () => {
  let component: PopupTablePasienComponent;
  let fixture: ComponentFixture<PopupTablePasienComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupTablePasienComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupTablePasienComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
