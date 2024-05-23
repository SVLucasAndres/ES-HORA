import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManualPage } from './manual.page';

describe('ManualPage', () => {
  let component: ManualPage;
  let fixture: ComponentFixture<ManualPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ManualPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
