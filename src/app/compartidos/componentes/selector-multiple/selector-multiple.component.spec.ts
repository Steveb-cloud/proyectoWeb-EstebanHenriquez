import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectorMultipleComponent } from './selector-multiple.component';

describe('SelectorMultipleComponent', () => {
  let component: SelectorMultipleComponent;
  let fixture: ComponentFixture<SelectorMultipleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorMultipleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectorMultipleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
