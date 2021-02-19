import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementAsistenListComponent } from './management-asisten-list.component';

describe('ManagementAsistenListComponent', () => {
  let component: ManagementAsistenListComponent;
  let fixture: ComponentFixture<ManagementAsistenListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementAsistenListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementAsistenListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
