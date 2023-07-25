import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Consulta } from 'src/app/core/consulta.model';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { PesquisaSatisfacao } from 'src/app/core/pesquisa-satisfacao.model';
import { ResumoAtendimento } from 'src/app/core/resumo-atendimento.model';
import { AtendimentoCloudService } from 'src/app/manifestacao/atendimento-cloud.service';

@Component({
  selector: 'app-consulta',
  templateUrl: './consulta.component.html',
  styleUrls: ['./consulta.component.css']
})
export class ConsultaCloudComponent implements OnInit {

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
    private atendimentoService: AtendimentoCloudService,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.divConsulta = false;
    this.divResumo = true;
    this.divPesquisa = true;
    this.tabPesquisa = false;
    this.atendimentoService.consultaLogotipoCloud(this.router.url.split("/")[1])
      .then((data: any) => {
        this.imagemLogo = "assets/image/" + data;
      });
    this.consulta.orgao = this.router.url.split("/")[1];

  }


  consultaManifestacao() {
    this.ngxLoader.start();
    this.atendimentoService.consultaCloud(this.consulta)
      .then(response => {
        this.resumoAtendimento = response;
        this.ngxLoader.stop();
      }).then(() => {
        setTimeout(() => {
          this.divConsulta = true;
          this.divResumo = false;
          if (this.resumoAtendimento.manifestacaoConcluida == 'Sim'){
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
    this.router.navigate([this.router.url.split("/")[1] + '/pesquisacloud']);
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
    this.atendimentoService.salvarPesquisaCloud(this.pesquisa)
      .then(() => {
        this.ngxLoader.stop();
      })
      .then(() => {
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
