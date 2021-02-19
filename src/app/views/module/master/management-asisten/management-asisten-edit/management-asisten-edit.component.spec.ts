import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAsistenEditComponent } from './management-asisten-edit.component';

describe('ManagementAsistenEditComponent', () => {
  let component: ManagementAsistenEditComponent;
  let fixture: ComponentFixture<ManagementAsistenEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementAsistenEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementAsistenEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
