import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarSubcategoriaComponent } from './editar-subcategoria.component';

describe('EditarSubcategoriaComponent', () => {
  let component: EditarSubcategoriaComponent;
  let fixture: ComponentFixture<EditarSubcategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditarSubcategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarSubcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
