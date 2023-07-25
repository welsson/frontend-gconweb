import { PesquisaSatisfacao } from './../../core/pesquisa-satisfacao.model';
import { ResumoAtendimento } from './../../core/resumo-atendimento.model';
import { Consulta } from './../../core/consulta.model';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { AtendimentoService } from './../atendimento.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { NgForm } from '@angular/forms';





@Component({
  selector: 'app-consulta-manifestacao',
  templateUrl: './consulta-manifestacao.component.html',
  styleUrls: ['./consulta-manifestacao.component.css']
})
export class ConsultaManifestacaoComponent implements OnInit {

  imagemLogo!: string;
  consulta = new Consulta();
  divConsulta!: boolean;
  divResumo!: boolean;
  divPesquisa!: boolean;
  tabPesquisa!: boolean;
  divPesquisaFeita!: boolean;
  resumoAtendimento = new ResumoAtendimento();
  pesquisa = new PesquisaSatisfacao();
  respostasPesquisa!: any[];
  constructor(
    private router: Router,
    private atendimentoService: AtendimentoService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.divConsulta = false;
    this.divResumo = true;
    this.divPesquisa = true;
    this.tabPesquisa = false;
    this.atendimentoService.consultaLogotipo(this.router.url.split("/")[1])
      .then((data: any) => {
        this.imagemLogo = "assets/image/" + data;
      });
    this.consulta.orgao = this.router.url.split("/")[1];

  }


  consultaManifestacao() {
    this.ngxLoader.start();
    this.atendimentoService.consulta(this.consulta)
      .then(response => {
        this.resumoAtendimento = response;
        this.ngxLoader.stop();
      }).then(res => {
        setTimeout(() => {
          this.divConsulta = true;
          this.divResumo = false;
          if (this.resumoAtendimento.manifestacaoConcluida === 'Sim'){
            this.divPesquisa = false;
            if (this.resumoAtendimento.respondeuPesquisa === 1){
              this.divPesquisaFeita = true;
            }else{
              this.divPesquisaFeita = false;
            }
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

  responderPesquisa() {
    this.divPesquisa = false;
    this.tabPesquisa = true;
    this.divPesquisaFeita = false;
  }

  voltarInicio(){
    this.router.navigate([this.router.url.split("/")[1] + '/pesquisa']);
  }

  interpor(){
    
  }

  download(){
    this.ngxLoader.start();
    this.atendimentoService
    .relatorioAtendimento(this.resumoAtendimento.idAtendimento)
    .then((response) => {
      const file = new Blob([response], { type: response.type });
      var url = URL.createObjectURL(file);
      this.ngxLoader.stop();
      window.open(url);
    })
    .catch((erro) => {
      this.ngxLoader.stop();
      this.errorHandler.handle(erro);
    });
  }

  voltarConsulta(){
    this.divConsulta = false;
    this.divResumo = true;
    this.divPesquisa = true;
    this.tabPesquisa = false;
  }


  enviarPesquisa(form: NgForm) {
    this.ngxLoader.start();
    this.pesquisa.idAtendimento = this.resumoAtendimento.idAtendimento;
    this.pesquisa.orgao = this.consulta.orgao;
    this.pesquisa.listaPergunta = this.resumoAtendimento.listaPergunta;
    console.log(this.resumoAtendimento.listaPergunta);
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
