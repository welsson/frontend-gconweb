import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { MenuItem, MessageService } from 'primeng/api';
import { Anexo } from 'src/app/core/anexo.model';
import { Atendimento } from 'src/app/core/atendimento.model';
import { ErrorHandlerService } from 'src/app/core/error-handler.service';
import { Address } from 'src/app/manifestacao/cadastro/cadastro.component';

import Swal from 'sweetalert2'
import { cpf } from 'cpf-cnpj-validator';
import { NgForm } from '@angular/forms';
import { AtendimentoCloudService } from 'src/app/manifestacao/atendimento-cloud.service';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastrocCloudComponent implements OnInit {

  constructor(
    private router: Router,
    private http: HttpClient,
    private atendimentoService: AtendimentoCloudService,
    private activatedRoute: ActivatedRoute,
    private messageService: MessageService,
    private errorHandler: ErrorHandlerService,
    private ngxLoader: NgxUiLoaderService
  ) { }

  atendimento = new Atendimento();
  fileName = '';
  cep!: Address;
  cpfInvalido = false;
  uploadedFiles: any[] = [];
  imagemLogo!: string;

  fileSelected?: File;
  base64: string = "Base64...";
  campos = false;
  anexo = new Anexo();

  tipoManifestacao!: string;

  items!: MenuItem[];
  submitted: boolean = false;
  index = 0;
  abaDisabled0 = false;
  abaDisabled1 = true;
  abaDisabled2 = true;
  abaDisabled3 = true;
  tipoDocumentos!: any;
  tipoUsuarios!: any;
  numeroAnexo = 0;
  disabled = false;

  ufs = [
      { label: 'Acre', value: 'AC'},
      { label: 'Alagoas', value: 'AL'},
      { label: 'Amazonas', value: 'AM'},
      { label: 'Amapá', value: 'AP'},
      { label: 'Bahia', value: 'BA'},
      { label: 'Ceará', value: 'CE'},
      { label: 'Distrito Federal', value: 'DF'},
      { label: 'Espírito Santo', value: 'ES'},
      { label: 'Goias', value: 'GO'},
      { label: 'Maranhão', value: 'MA'},
      { label: 'Minas Gerais', value: 'MG'},
      { label: 'Mato Grosso do Sul', value: 'MS'},
      { label: 'Mato Grosso', value: 'MT'},
      { label: 'Pará', value: 'PA'},
      { label: 'Paraíba', value: 'PB'},
      { label: 'Pernambuco', value: 'PE'},
      { label: 'Piaui', value: 'PI'},
      { label: 'Paraná', value: 'PR'},
      { label: 'Rio de Janeiro', value: 'RJ'},
      { label: 'Rio Grande do Norte', value: 'RN'},
      { label: 'Rondônia', value: 'RO'},
      { label: 'Rio Grande do Sul', value: 'RS'},
      { label: 'Santa Catarina', value: 'SC'},
      { label: 'Sergipe', value: 'SE'},
      { label: 'São Paulo', value: 'SP'},
      { label: 'Tocantins', value: 'TO'},
      { label: 'Roraima', value: 'RR'}
    ];

  ngOnInit() {
    this.atendimentoService.consultaLogotipoCloud(this.router.url.split("/")[1])
    .then((data: any) => {
      this.imagemLogo = "assets/image/" + data;
      this.atendimento.logotipo = this.imagemLogo;
      this.activatedRoute.params.subscribe(params => {
        this.atendimento.natureza = params['id'];
        this.tipoManifestacao = this.tipoManif(params['id']);
      });
      this.atendimento.captcha = (Math.round(Math.random()*11240));
      this.atendimento.orgao = parseInt(this.router.url.split("/")[1]);
      this.atendimento.identificado = '1';
      this.carregarTiposManifestante();
    })
    .catch(erro => {
      this.ngxLoader.stop();
      setTimeout(() => {
        this.errorHandler.handle(erro);
      }, 1000);
  });
  }

  tipoManif(tipo: any) {
    if (tipo == '2')
       return 'Faça seu Elogio'
    else if (tipo == '3')
      return 'Faça sua Sugestão'
    else if (tipo == '11')
      return 'Faça sua Reclamação'
    else if (tipo == '5')
      return 'Faça sua Denúncia'
    else
      return '';
  }

  anonimo(){
    this.campos = true;
  }

  identificado(){
    this.campos = false;
  }


   nextPage() {
    
      if (this.atendimento.captcha == this.atendimento.captchaInformado){
        this.index = 1;
        this.abaDisabled0 = true;
        this.abaDisabled1 = false;
        this.abaDisabled2 = true;
        this.abaDisabled3 = true;
      }else{
        Swal.fire('Valor do capcha informado diferente!')
      }
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
        this.atendimento.listaAnexoDto[index] = anexo;
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

  nextPageAnexo(){
      this.index = 2;
      this.abaDisabled0 = true;
      this.abaDisabled1 = true;
      this.abaDisabled2 = false;
      this.abaDisabled3 = true;
  }

  previewAnexo(){
    this.index = 0;
    this.abaDisabled0 = false;
    this.abaDisabled1 = true;
    this.abaDisabled2 = true;
    this.abaDisabled3 = true;
  }

  concluir(form: NgForm){
    this.ngxLoader.start();
    console.log(this.atendimento);
    this.atendimentoService.adicionarCloud(this.atendimento)
      .then(response => {
        this.atendimento = response.atendimentoDto;
        this.ngxLoader.stop();
        })
      .then(res => {
        setTimeout(() => {
          this.index = 3;
          this.abaDisabled0 = true;
          this.abaDisabled1 = true;
          this.abaDisabled2 = true;
          this.abaDisabled3 = false;
          this.messageService.add({ severity: 'success', detail: 'Manifestação enviada com sucesso!' });
            }, 1000);
      })
      .catch(erro => {
        this.ngxLoader.stop();
        setTimeout(() => {
          this.errorHandler.handle(erro);
            }, 1000);
      });


  }

  previewRevisao(){
    this.index = 1;
    this.abaDisabled0 = true;
    this.abaDisabled1 = false;
    this.abaDisabled2 = true;
    this.abaDisabled3 = true;
  }

  previewConclusao(){
    this.index = 2;
    this.abaDisabled0 = true;
    this.abaDisabled1 = true;
    this.abaDisabled2 = false;
    this.abaDisabled3 = true;
  }

  voltarInicio(){
    this.router.navigate([this.router.url.split("/")[1] + '/pesquisacloud']);
  }


  validaCpf(){
    if (this.atendimento.tipoDocumento == 1) {
      if (!cpf.isValid(this.atendimento.numeroDocumento)) {
        this.cpfInvalido = true;
        //Swal.fire('CPF Inválido', 'Informe um cpf válido!', 'warning');
      }else{
        this.cpfInvalido = false;
      }
    }else{
      this.cpfInvalido = false;
    }
  }

  buscar(){

    if (this.atendimento.cep != null){
      if (this.atendimento.cep.length == 8){
      return this.http
          .get(`https://viacep.com.br/ws/${this.atendimento.cep}/json/`)
          .toPromise()
        .then(res => <any>res)
            .then(data => {
            this.atendimento.cep = data.cep;
            this.atendimento.endereco = data.logradouro;
            this.atendimento.complemento = data.complemento;
            this.atendimento.bairro = data.bairro;
            this.atendimento.municipio = data.localidade;
            this.atendimento.uf = data.uf;
            return data.logradouro;
        });
        }
    }

    return this.atendimento.cep = '';

  }

  carregarTiposManifestante() {
    this.atendimentoService.listarTiposManifestanteCloud(this.atendimento.orgao)
      .then(tipoUsuarios => {
        this.tipoUsuarios = tipoUsuarios.
          map((o: { descricao: any; id: any; }) => ({ label: o.descricao, value: o.id }));
      })
      .catch(erro => this.errorHandler.handle(erro));
  }



}
