import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PesquisaSatisfacao } from 'src/app/core/pesquisa-satisfacao.model';
import { ResumoAtendimento } from 'src/app/core/resumo-atendimento.model';
import { AtendimentoService } from '../atendimento.service';

@Component({
  selector: 'app-pesquisa-satisfacao',
  templateUrl: './pesquisa-satisfacao.component.html',
  styleUrls: ['./pesquisa-satisfacao.component.css']
})
export class PesquisaSatisfacaoComponent implements OnInit {

  imagemLogo!: string;
  pesquisa = new PesquisaSatisfacao();
  respostasPesquisa!: any[];
  resumoAtendimento = new ResumoAtendimento();
  divPesquisaFeita!: boolean;
  parametro!: any;

  constructor(
    private router: Router,
    private atendimentoService: AtendimentoService,
    private messageService: MessageService,
    private activatedRoute: ActivatedRoute,
    private errorHandler: ErrorHandlerService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.atendimentoService.consultaLogotipo('2')
      .then((data: any) => {
        this.imagemLogo = "assets/image/" + data;
      });
    this.activatedRoute.params.subscribe(params => {
      this.parametro = params['parametro'];
    });
    this.ngxLoader.start();
    this.atendimentoService.consultaParametroPesquisaEmail(this.parametro)
      .then(response => {
        this.resumoAtendimento = response;
        console.log(this.resumoAtendimento);
        this.ngxLoader.stop();
      }).then(res => {
        setTimeout(() => {
          if (this.resumoAtendimento.manifestacaoConcluida == 'Sim'){
            this.divPesquisaFeita = false;
          }else{
            this.divPesquisaFeita = true;
          }
          if (this.resumoAtendimento.respondeuPesquisa == 0){
            this.divPesquisaFeita = false;
          }else{
            this.divPesquisaFeita = true;
          }
          }, 1000);
      })
      .catch(erro => {
        this.ngxLoader.stop();
        setTimeout(() => {
          this.errorHandler.handle(erro);
        }, 1000);
      });

  }

  enviarPesquisa(form: NgForm) {
    this.ngxLoader.start();
    this.pesquisa.idAtendimento = this.resumoAtendimento.idAtendimento;
    this.pesquisa.listaPergunta = this.resumoAtendimento.listaPergunta;
    this.pesquisa.orgao = 2;
    this.atendimentoService.salvarPesquisa(this.pesquisa)
      .then(response => {
        this.ngxLoader.stop();
      })
      .then(res => {
        setTimeout(() => {
          this.divPesquisaFeita = true;
          this.messageService.add({severity: 'success', summary: 'Success', detail: 'Pesquisa enviada com sucesso' });
        }, 1000);
      })
      .catch(erro => {
          this.ngxLoader.stop();
          setTimeout(() => {
            this.errorHandler.handle(erro);
          }, 1000);
        });
  }

}
