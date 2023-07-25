import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MessageService } from 'primeng/api';
import { Anexo } from 'src/app/core/anexo.model';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { RespostaRecurso } from 'src/app/core/resposta-recurso.model';
import { AtendimentoLaiService } from '../atendimento-lai.service';

@Component({
  selector: 'app-resposta-recurso',
  templateUrl: './resposta-recurso.component.html',
  styleUrls: ['./resposta-recurso.component.css']
})
export class RespostaRecursoComponent implements OnInit {

  modeloDocumentos!: any;
  modeloDocumento!: any;
  parametro!: any;
  nomeSetor!: string;
  modelo = "";
  respostaRecurso = new RespostaRecurso();
  campos = false;
  mensagem!: string;
  protocolo!: string;
  codigoAtendimento!: number;
  resultado!: any;
  fileName = '';
  uploadedFiles: any[] = [];
  imagemLogo!: string;

  fileSelected?: File;
  base64: string = "Base64...";
  
  anexo = new Anexo();

  resultadosRecurso = [
    { label: 'Procedente', value: 1 },
    { label: 'Procedente Parcial', value: 2 }, 
    { label: 'Improcedente', value: 3 }
  ];



  constructor(
    private atendimentoLaiService: AtendimentoLaiService,
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
    this.atendimentoLaiService.consultaRecurso(this.parametro)
    .then((data: any) => {
      if (data== null){
        this.nomeSetor = '';
        this.campos = false;
        this.mensagem = 'Recurso não encontrado!';
      } else if (data.respondido==false){
        this.nomeSetor = data.nomeSetorDestino;
        this.protocolo = data.protocolo;
        this.codigoAtendimento = data.codigoAtendimento;
        this.carregarModeloDocumento();
        this.campos = true;
      }else{
        this.nomeSetor = '';
        this.campos = false;
        this.mensagem = 'Resposta do recurso já respondido!';
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


/**
   * Convert File To Base64
   */
 convertFileToBase64(file: File, index: number, anexo: Anexo) {
  let reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    anexo.stringBase64 = reader.result as string;
    anexo.nomeArquivo = file.name;
    this.respostaRecurso.listaAnexoDto[index] = anexo;
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
    this.respostaRecurso.resposta = this.modelo;
    this.respostaRecurso.parametro = this.parametro;
    this.respostaRecurso.resultado = this.resultado;
    this.atendimentoLaiService.enviarRespostaRecurso(this.respostaRecurso)
      .then()
      .then(res => {
        setTimeout(() => {
          this.campos = false;
          this.mensagem = 'Recurso respondido com sucesso!.';
          this.ngxLoader.stop();
          this.messageService.add({ severity: 'success', detail: 'Recurso respondido com sucesso!' });
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
    return this.atendimentoLaiService
      .listarPorTipo("6")
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
    return this.atendimentoLaiService
      .consultarModeloOutros(this.modeloDocumento, this.codigoAtendimento)
      .then((modelo) => {
        this.modelo = modelo;
      })
      .catch((erro) => this.errorHandler.handle(erro));
  }

}
