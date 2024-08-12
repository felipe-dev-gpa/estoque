import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Tela2Page } from './tela2.page';

describe('Tela2Page', () => {
  let component: Tela2Page;
  let fixture: ComponentFixture<Tela2Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Tela2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
