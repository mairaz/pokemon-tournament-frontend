import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectHeaderComponent } from './select-header.component';

describe('SelectHeaderComponent', () => {
  let component: SelectHeaderComponent;
  let fixture: ComponentFixture<SelectHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SelectHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
