import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Anexo } from 'src/app/core/anexo.model';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { RespostaEncaminhamentoSetor } from 'src/app/core/resposta-encaminhamento-setor.model';
import { AtendimentoService } from '../atendimento.service';

@Component({
  selector: 'app-resposta-encaminhamento-cloud',
  templateUrl: './resposta-encaminhamento-cloud.component.html',
  styleUrls: ['./resposta-encaminhamento-cloud.component.css']
})
export class RespostaEncaminhamentoCloudComponent implements OnInit {

  modeloDocumentos!: any;
  modeloDocumento!: any;
  parametro!: any;
  nomeSetor!: string;
  modelo = "";
  respostaEncaminhamentoSetor = new RespostaEncaminhamentoSetor();
  campos = false;
  mensagem!: string;
  protocolo!: string;
  codigoAtendimento!: number;
  fileName = '';
  uploadedFiles: any[] = [];
  imagemLogo!: string;
  orgao!: number;

  fileSelected?: File;
  base64: string = "Base64...";
  
  anexo = new Anexo();

  constructor(
    private atendimentoService: AtendimentoService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  ngOnInit(): void {
    this.ngxLoader.start();
    this.activatedRoute.params.subscribe(params => {
      this.parametro = params['parametro'];
    });
    this.atendimentoService.consultaEncaminhamento(this.parametro)
    .then((data: any) => {
      if (data== null){
        this.nomeSetor = '';
        this.campos = false;
        this.mensagem = 'Encaminhamento não encontrado!';
      } else if (data.respondido==false){
        this.nomeSetor = data.nomeSetorDestino;
        this.protocolo = data.protocolo;
        this.codigoAtendimento = data.codigoAtendimento;
        this.orgao = data.orgao;
        this.campos = true;
        this.modeloDocumentos = data.listaModelo.modeloDocumentoDtoList.map(
          (o: { descricao: any; id: any }) => ({
            label: o.descricao,
            value: o.id,
          }));
      }else{
        this.nomeSetor = '';
        this.campos = false;
        this.mensagem = 'Resposta já enviada para O SAC!';
      }
      setTimeout(() => {
        this.ngxLoader.stop();
      }, 50);
    })
    .catch(erro => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.errorHandler.handle(erro);
      }, 1000);
  });
  }

  convertFileToBase64(file: File, index: number, anexo: Anexo) {
    let reader = new FileReader(); 
    reader.readAsDataURL(file);
    reader.onload = () => {
      anexo.stringBase64 = reader.result as string;
      anexo.nomeArquivo = file.name;
      this.respostaEncaminhamentoSetor.listaAnexoDto[index] = anexo;
    }
  }
  
  carregaArquivo(event: { target: { files: File[]; }; files: any; }) {
  
    for (let index = 0; index < event.files.length; index++) {
      let anexo = new Anexo();
      const file:File = event.files[index];
      if (file) {
        this.convertFileToBase64(file, index, anexo);
      }
    }
  }

  concluir(){
    this.ngxLoader.start();
    this.activatedRoute.params.subscribe(params => {
      this.parametro = params['parametro'];
    });
    this.respostaEncaminhamentoSetor.resposta = this.modelo;
    this.respostaEncaminhamentoSetor.parametro = this.parametro;
    this.atendimentoService.enviarResposta(this.respostaEncaminhamentoSetor)
      .then()
      .then(res => {
        setTimeout(() => {
          this.campos = false;
          this.mensagem = 'Resposta encaminhada para a Ouvidoria com sucesso!.';
          this.ngxLoader.stop();
          this.messageService.add({ severity: 'success', detail: 'Resposta enviada com sucesso!' });
            }, 200);
      })
      .catch(erro => {
         setTimeout(() => {
          this.ngxLoader.stop();
          this.errorHandler.handle(erro);
            }, 1000);
      });
  }


  carregarModeloDocumento() {
    return this.atendimentoService
      .listarPorTipo("5")
      .then((modeloDocumentos) => {
        this.modeloDocumentos = modeloDocumentos.map(
          (o: { descricao: any; id: any }) => ({
            label: o.descricao,
            value: o.id,
          })
        );
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

  consultaModelo(): any {
    return this.atendimentoService
      .consultarModeloOutros(this.modeloDocumento, this.codigoAtendimento)
      .then((modelo) => {
        console.log(modelo);
        this.modelo = modelo;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

}
