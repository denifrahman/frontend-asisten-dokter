import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormRawatJalanComponent } from './form-rawat-jalan.component';

describe('FormRawatJalanComponent', () => {
  let component: FormRawatJalanComponent;
  let fixture: ComponentFixture<FormRawatJalanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormRawatJalanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormRawatJalanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
