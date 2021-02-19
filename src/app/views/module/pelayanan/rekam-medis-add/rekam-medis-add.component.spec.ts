import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RekamMedisAddComponent } from './rekam-medis-add.component';

describe('RekamMedisAddComponent', () => {
  let component: RekamMedisAddComponent;
  let fixture: ComponentFixture<RekamMedisAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RekamMedisAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RekamMedisAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
