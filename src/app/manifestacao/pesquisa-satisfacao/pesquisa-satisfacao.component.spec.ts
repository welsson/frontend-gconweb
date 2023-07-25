import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PesquisaSatisfacaoComponent } from './pesquisa-satisfacao.component';

describe('PesquisaSatisfacaoComponent', () => {
  let component: PesquisaSatisfacaoComponent;
  let fixture: ComponentFixture<PesquisaSatisfacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PesquisaSatisfacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PesquisaSatisfacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
