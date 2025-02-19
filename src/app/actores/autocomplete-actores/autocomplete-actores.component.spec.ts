import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteActoresComponent } from './autocomplete-actores.component';

describe('AutocompleteActoresComponent', () => {
  let component: AutocompleteActoresComponent;
  let fixture: ComponentFixture<AutocompleteActoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteActoresComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteActoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
