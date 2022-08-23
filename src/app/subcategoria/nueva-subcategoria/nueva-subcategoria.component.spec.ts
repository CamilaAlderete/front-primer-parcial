import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaSubcategoriaComponent } from './nueva-subcategoria.component';

describe('NuevaSubcategoriaComponent', () => {
  let component: NuevaSubcategoriaComponent;
  let fixture: ComponentFixture<NuevaSubcategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NuevaSubcategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NuevaSubcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
