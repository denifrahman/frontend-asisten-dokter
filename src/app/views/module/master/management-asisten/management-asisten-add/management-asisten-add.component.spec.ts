import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAsistenAddComponent } from './management-asisten-add.component';

describe('ManagementAsistenAddComponent', () => {
  let component: ManagementAsistenAddComponent;
  let fixture: ComponentFixture<ManagementAsistenAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementAsistenAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementAsistenAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
