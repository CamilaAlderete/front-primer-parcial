import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupSubcategoriaComponent } from './popup-subcategoria.component';

describe('PopupSubcategoriaComponent', () => {
  let component: PopupSubcategoriaComponent;
  let fixture: ComponentFixture<PopupSubcategoriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupSubcategoriaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupSubcategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
