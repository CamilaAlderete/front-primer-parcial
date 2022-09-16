import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupPresentacionProductoComponent } from './popup-presentacion-producto.component';

describe('PopupPresentacionProductoComponent', () => {
  let component: PopupPresentacionProductoComponent;
  let fixture: ComponentFixture<PopupPresentacionProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PopupPresentacionProductoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupPresentacionProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
