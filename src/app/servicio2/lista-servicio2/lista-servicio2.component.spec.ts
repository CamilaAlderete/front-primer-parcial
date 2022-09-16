import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaServicio2Component } from './lista-servicio2.component';

describe('ListaServicio2Component', () => {
  let component: ListaServicio2Component;
  let fixture: ComponentFixture<ListaServicio2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaServicio2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaServicio2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
