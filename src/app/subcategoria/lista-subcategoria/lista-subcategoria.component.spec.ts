import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaSubcategoriaComponent } from './lista-subcategoria.component';

describe('ListaSubcategoriaComponent', () => {
  let component: ListaSubcategoriaComponent;
  let fixture: ComponentFixture<ListaSubcategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaSubcategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaSubcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
